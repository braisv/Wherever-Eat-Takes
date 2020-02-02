import React, {useState} from 'react'

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
        <div>
            
        </div>
    )
}

export default NewRestaurant
