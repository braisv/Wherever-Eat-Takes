import React, { useState, useEffect } from "react";
import RestaurantPhoto from "../RestaurantPhoto/RestaurantPhoto";
import "./Search.scss"

const Search = ({ restaurants }) => {
  const [search, setSearch] = useState("");
  let filteredRestaurants;

  filteredRestaurants = restaurants.restaurants.filter(el =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        name="searchbar"
        placeholder="Search restaurants"
        className="searchbar"
        onChange={e => setSearch(e.target.value)}
      />
      <div className="container">
        <div className="restaurant-grid">
          {filteredRestaurants.map((place, i) => (
            <RestaurantPhoto key={i} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
