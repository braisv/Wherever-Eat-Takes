import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
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
        userLocal.likes.includes(data.id)
          ? setFavourite(true)
          : setFavourite(false)
      })
      .catch(e => console.log(e));

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (restaurant.reviews) {
    timetable = restaurant.timetable;
    reviews = restaurant.reviews;
  }

  if (reviews.length > 0) {
    printReviews = reviews.map(el =>
      Object.keys(el).map(key => {
        if (key !== "_id") {
          return <div className={key + "-review"}>{el[key]}</div>;
        } else { return null }
      })
    );
  }

  if (timetable) {
  daily = (
    <ul>
      {Object.keys(timetable).map( (key, i) => (
        <li key={i}>
          <span>{key + ": "}</span>
          {timetable[key]}
        </li>
      ))}
    </ul>
  );
      }

  const toggleButton = () => {
    
    if (!user) return history.push("/login");
    if (userLocal.likes.includes(restaurant.id)) {
      likes
        .removeUserLike(params)
        .then(data => {
          user = data;
          setUser(data);
          setFavourite(false);
        })
        .catch(e => console.log(e));
    } else {
      likes
        .updateUserLike(params)
        .then(data => {
          user = data;
          setUser(data)
          setFavourite(true);
        })
        .catch(e => console.log(e));
    }
  };

  if (!restaurant.image) return <div className="content spinner"><div className="lds-hourglass"></div></div>
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
