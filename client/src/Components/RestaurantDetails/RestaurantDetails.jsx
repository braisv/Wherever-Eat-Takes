import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleUp,
  faChevronCircleDown,
  faCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import RestaurantsService from "../../utils/RestaurantsService";
import LikesService from "../../utils/LikesService";
import "./RestaurantDetails.scss";

const RestaurantDetails = ({ user }) => {
  const params = useParams().restaurantId;
  const restaurants = new RestaurantsService();
  const likes = new LikesService();
  const [userLocal, setUser] = useState(user);
  const [restaurant, setRestaurant] = useState({});
  const [hidden, setHidden] = useState(true);
  const [comments, setComments] = useState(false);
  const [favourite, setFavourite] = useState(false);

  let timetable = {};
  let reviews = [];
  let printReviews;
  let daily;

  useEffect(() => {
    restaurants
      .getOne(params)
      .then(data => {
        setRestaurant(data);
        console.log("USER LIKES: ", userLocal.likes)
        console.log("ID RESTAURANT: ", data.id)
        userLocal.likes.includes(data.id)
          ? setFavourite(true)
          : setFavourite(false)
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
          return <div className={key + "-review"}>{el[key]}</div>;
      })
    );
  }

  daily = (
    <ul>
      {Object.keys(timetable).map(key => (
        <li>
          <span>{key + ": "}</span>
          {timetable[key]}
        </li>
      ))}
    </ul>
  );

  const toggleButton = () => {
    if (userLocal.likes.includes(restaurant.id)) {
      likes
        .removeUserLike(params)
        .then(data => {
          user = data;
          setUser(data);
          setFavourite(false);
          console.log("USER: ", user)
          console.log("DATA: ", data)
        })
        .catch(e => console.log(e));
    } else {
      likes
        .updateUserLike(params)
        .then(data => {
          user = data;
          setUser(data)
          setFavourite(true);
          console.log("USER: ", user)
          console.log("DATA: ", data)
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <div className="container-details">
      <div className="restaurant-name">{restaurant.name}</div>
      <div className="image-restaurant">
        <img src={`${restaurant.image}`} alt={`${restaurant.name}`} />
      </div>
      <div className="cuisine restaurant-name">
        Cuisine Type: {restaurant.cuisine_type}
      </div>
      <div
        className="timetable restaurant-name"
        onClick={() => setHidden(!hidden)}
      >
        Timetable{" "}
        {hidden ? (
          <FontAwesomeIcon icon={faChevronCircleUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronCircleDown} />
        )}
        {hidden ? "" : daily}
      </div>
      <div
        className="reviews restaurant-name"
        onClick={() => setComments(!comments)}
      >
        Reviews{" "}
        {!comments ? (
          <FontAwesomeIcon icon={faChevronCircleUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronCircleDown} />
        )}
      </div>
      {comments ? <div className="review-comments">{printReviews}</div> : ""}
      <div
        className={favourite ? "favourite" : "restaurant-like unfavourite"}
        onClick={() => toggleButton()}
      >
        {favourite
          ? "Marked as Favourite "
          : "Do you know it? Mark it as favourite "}{" "}
        {favourite ? (
          <FontAwesomeIcon icon={faCheckCircle} />
        ) : (
          <FontAwesomeIcon icon={faCircle} />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
