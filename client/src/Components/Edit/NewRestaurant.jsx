import React, {useState} from 'react';
import "./Options/Form.scss";
import NameInput from './Options/NameInput';
import ImageInput from './Options/ImageInput';
import CuisineInput from './Options/Cuisine_typeInput';

const NewRestaurant = () => {
const [megaState, setMegaState] = useState({
    name: "",
    neighborhood: "",
    photograph: "",
    location: {
        adress: "",
        coordinates: []
    },
    image: "",
    cuisine_type: "",
    timetable: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
    },
    reviews: [{
        name: "",
        date: "",
        rating: 0,
        comments: ""
    }]
})



    return (
        <div className="restaurant-form flex-column">
            <h1>RESTAURANT DATA:</h1>
            <NameInput state={megaState} setState={setMegaState} />
            <ImageInput state={megaState} setState={setMegaState} />
            <CuisineInput state={megaState} setState={setMegaState} />
        </div>
    )
}

export default NewRestaurant
