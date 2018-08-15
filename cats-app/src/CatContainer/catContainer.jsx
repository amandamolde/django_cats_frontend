import React, { Component } from 'react';
import CreateCat from '../CreateCat/createCat';
import EditCat from '../EditCat/editCat';
import CatList from '../CatList/catList';

class CatContainer extends Component {
    constructor() {
        super(),
        this.state = {
            cats: [],
            showEdit: false,
            editCatId: null,
            catToEdit: {
                'name': '',
            }
        }
    };
    componentDidMount(){
        this.getCats().then((cats) => {
            this.setState({
                cats: cats.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
    getCats = async () => {

        const cats = await fetch('http://127.0.0.1:8000/cats/');
        const parsedCats = cats.json();

        return parsedCats
    }
    addCat = async (cat, e) => {
        e.preventDefault();

        try {
            const createCat = await fetch('http://127.0.0.1:8000/cats', {
                method: 'POST',
                body: JSON.stringify(cat),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsedResponse = await createCat.json();

            this.setState({cats: [...this.state.cats, parsedResponse.data]})
        } catch (err) {
            console.log(err);
        }
    }
    deleteCat = async (id, e) => {
        e.preventDefault();
        console.log('deleteCat function is being called, this is the id: ', id);

        try {
            const deleteCat = await fetch('http://127.0.0.1:8000/cats' + id, {
                method: 'DELETE'
            });

            const parsedResponse = await deleteCat.json();

            if(parsedResponse.status === 200) {
                this.setState({cats: this.state.cats.filter((cat, i) => cat.id !== id)});
            } else {
                console.log('there was an error in delete cat');
            }
        } catch(err) {
            console.log(err);
        }
    }
    showModal = (id) => {
        const catToEdit = this.state.cats.find((cat) => cat._id === id);

        this.setState({
            showEdit: true,
            editCatId: id,
            catToEdit: catToEdit,
        });
    }
    closeAndEdit = async (e) => {
        e.preventDefault();

        try {
            const editCat = await fetch('http://127.0.0.1:8000/' + this.state.editCatId, {
                'method': 'PUT',
                body: JSON.stringify(this.state.catToEdit),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const parsedResponse = await editCat.json();

            const editedCatArray = this.state.cats.map((cat) => {

                if(cat._id === this.state.editCatId) {
                    cat.name = parsedResponse.data.name;
                }
                return cat
            });

            this.setState({
                cats: editedCatArray,
                showEdit: false,
            });
        } catch(err) {
            console.log(err)
        }
    }
    handleFormChange = (e) => {
        
        this.setState({
            catToEdit: {
                ...this.state.catToEdit,
                [e.target.name]: e.target.value,
            }
        });
    }
    render() {
        return (
            <div>
                <CatList cats={this.state.cats} deleteCat={this.deleteCat} showModal={this.showModal} />
                <CreateCat addCat={this.addCat} />

                {this.state.showEdit ? <EditCat closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} catToEdit={this.state.catToEdit}/> : null}
            </div>
        )
    }
}

export default CatContainer;