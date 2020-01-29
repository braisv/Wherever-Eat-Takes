import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantsService from "../../utils/RestaurantsService";

const RestaurantDetails = () => {
  const params = useParams().restaurantId;
  const restaurants = new RestaurantsService();
  const [restaurant, setRestaurant] = useState({});
  let timetable = {};
  let reviews = [];
  let printReviews;

  useEffect(() => {
    restaurants
      .getOne(params)
      .then(data => {
        setRestaurant(data);
      })
      .catch(e => console.log(e));
  }, []);

  if (restaurant.timetable) {
    timetable = restaurant.timetable;
    reviews = restaurant.reviews;
  }

  if (reviews.length > 0) {
    printReviews = reviews.map(el =>
      Object.keys(el).map(key => {
        if (key != "_id")
          return <div className={key + "-review"}>{key + ": " + el[key]}</div>;
      })
    );
  }

  return (
    <div className="container-details">
      <div className="restaurant-name">{restaurant.name}</div>
      <div className="image">
        <img src={`${restaurant.image}`} alt={`${restaurant.name}`} />
      </div>
      <div className="cuisine-restaurant">
        Cuisine Type: {restaurant.cuisine_type}
      </div>
      <div className="timetable-restaurant">
        {" "}
        Timetable:
        <ul>
          {Object.keys(timetable).map(key => (
            <li>{key + ": " + timetable[key]}</li>
          ))}
        </ul>
      </div>
      <div className="reviews-restaurant">
        Reviews:
        {printReviews}
      </div>
    </div>
  );
};

export default RestaurantDetails;
