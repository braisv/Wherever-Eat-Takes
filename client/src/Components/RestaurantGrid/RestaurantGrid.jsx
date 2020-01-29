import React from "react";
import RestaurantPhoto from "../RestaurantPhoto/RestaurantPhoto";
import "./RestaurantGrid.scss"

const RestaurantGrid = ({ restaurants }) => {
  return (
    <div className="restaurant-grid">
      {restaurants.map((place, i) => (
        <RestaurantPhoto key={i} place={place} />
      ))}
    </div>
  );
};

export default RestaurantGrid;
