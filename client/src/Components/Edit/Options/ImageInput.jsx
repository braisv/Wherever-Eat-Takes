import React from 'react'

const ImageInput = ({ state, setState }) => {
    return (
        <div>
            <label>Image: </label><input type="text" onChange={(e) => setState({...state, image: e.target.value})} value={state.image} />
        </div>
    )
}

export default ImageInput
