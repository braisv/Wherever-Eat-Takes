import React from 'react';


const NameInput = ({ state, setState }) => {

    return (
        <div>
            <label>Name: </label><input type="text" onChange={(e) => setState({...state, name: e.target.value})} value={state.name} />
        </div>
    )
}

export default NameInput
