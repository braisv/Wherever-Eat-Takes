import React, {useState, useEffect} from 'react';
import RestaurantsService from "../../utils/RestaurantsService";
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid';
import "./Home.scss"

const Home = () => {
    const restaurants = new RestaurantsService();
    const [places, setPlaces] = useState([])
    
    console.log("PLACES: ", places)

    useEffect(() => {
        restaurants.getAll().then((place) => setPlaces(place)).catch(e => console.log(e))
    }, [])

    return (
        <div class="container">
            <RestaurantGrid restaurants={places} />
        {/* {places.map(place => (
            <div className="text-img"><h3>{place.name}</h3></div>
        ))} */}
      </div>
    )
}

export default Home
