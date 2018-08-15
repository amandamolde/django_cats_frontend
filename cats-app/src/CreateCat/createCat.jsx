import React, { Component } from 'react';

class CreateCat extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
        }
    }
    updateCat = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value});
    }

    render() {
        console.log(this.props, ' this is props');
        
        return (
            <form onSubmit={this.props.addCat.bind(this, this.state)}>
                <label>
                    Cat Name:
                    <input type="text" name="name" onChange={this.updateCat}/>
                </label>
                <input type="submit"/>
            </form>
        )
    }
}

export default CreateCat;