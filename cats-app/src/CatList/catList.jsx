import React from 'react';

const CatList = (props) => {

    const catList = props.cats.map((cat, i) => {
        return (
            <li key={cat.id}>
                <h3>{cat.name}</h3>
                <button onClick={props.deleteCat.bind(null, cat._id)}>Delete</button>
                <button onClick={props.showModal.bind(null, cat._id)}>Edit</button>
            </li>
        )
    });

    return (
        <ul>
            {catList}
        </ul>
    )
}

export default CatList;