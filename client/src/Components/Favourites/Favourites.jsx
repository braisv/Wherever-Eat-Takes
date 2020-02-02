import React, { useState, useEffect } from "react";
import RestaurantPhoto from "../RestaurantPhoto/RestaurantPhoto";
import "./Favourites.scss";

const FavouriteRestaurants = ({ restaurants, user }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    let list = [];

    if (user) {
      restaurants.restaurants.filter(el => {
        return user.likes.includes(el.id) ? list.push(el) : []
      });
    }
        setFavourites(list)
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  let render;

  if (!user) {
    render = (
      <div className="container">
        <div className="no-user flex">Log In to see favourite restaurants.</div>
      </div>
    );
  }

  if (user && favourites.length > 0) {
    render = (
      <div className="container">
        <div className="restaurant-grid">
          {favourites.map((place, i) => (
            <RestaurantPhoto key={i} place={place} />
          ))}
        </div>
      </div>
    );
  } else if (user && favourites.length <= 0) {
    render = (
      <div className="container">
        <div className="no-user flex">No favourite restaurants yet.</div>
      </div>
    );
  }

  return <div>{render}</div>;
};

export default FavouriteRestaurants;
