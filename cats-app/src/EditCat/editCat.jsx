import React from 'react';

const EditCat = (props) => {
    return (
        <div>
            <h4>Edit Cat</h4>
            <form action="">
                <label>
                    Edit Cat:
                    <input type="text" name="name" onChange={props.handleFormChange} value={props.catToEdit.name}/>
                </label>
                <input type="submit"/>
            </form>
        </div>
    )
}