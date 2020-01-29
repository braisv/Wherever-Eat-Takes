import React from 'react';
import { Link } from "react-router-dom";
import "./RestaurantPhoto.scss"

const RestaurantPhoto = ({ place }) => {
    return (
        <div className="grid-photo-wrap flex" >
        <Link to={`/restaurant/${place.id}`} restaurant={place}>
            <img src={place.image} alt={place.name} className="grid-photo" />
        </Link>
    </div>
    )
}

export default RestaurantPhoto
