import React from 'react'

const CuisineInput = ({ state, setState }) => {
    return (
        <div>
            <label>Cuisine: </label><input type="text" onChange={(e) => setState({...state, cuisine_type: e.target.value})} value={state.cuisine_type} />
        </div>
    )
}

export default CuisineInput
