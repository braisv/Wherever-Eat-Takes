import React, {useState, useEffect} from 'react';
import RestaurantsService from "../../utils/RestaurantsService";

const Home = () => {
    const restaurants = new RestaurantsService;
    const [places, setPlaces] = useState([])
    //const logPlaces = restaurants.getAll().then((place) => setPlaces(place)).catch(e => console.log(e))
    
    console.log("PLACES: ", places)

    // useEffect(() => {
    //     
    // }, [places])

    return (
        <div class="container flex">
        {places.map(place => (
            <div className="text-img"><h3>{place.name}</h3></div>
        ))}
      </div>
    )
}

export default Home
