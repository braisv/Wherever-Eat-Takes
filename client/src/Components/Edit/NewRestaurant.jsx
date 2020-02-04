import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Options/Form.scss";
import RestaurantsService from "../../utils/RestaurantsService";
import NameInput from "./Options/NameInput";
import ImageInput from "./Options/ImageInput";
import CuisineInput from "./Options/Cuisine_typeInput";
import Timetable from "./Options/Timetable";
import ReviewsInput from "./Options/ReviewsInput";

const NewRestaurant = ({ addedRestaurant }) => {
  const params = useParams().restaurantId;
  const history = useHistory();
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
      sunday: ""
    },
    reviews: []
  });

  const service = new RestaurantsService();

  useEffect(() => {
    service
      .getOne(params)
      .then(data => {
        setMegaState(data);
      })
      .catch(e => console.log(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRestaurant = (
    name,
    neighborhood,
    photograph,
    location,
    image,
    cuisine_type,
    timetable,
    reviews
  ) => {
    service
      .newRestaurant(
        name,
        neighborhood,
        photograph,
        location,
        image,
        cuisine_type,
        timetable,
        reviews
      )
      .then(() => addedRestaurant());
  };

  const modifyRestaurant = (
    id,
    name,
    neighborhood,
    photograph,
    location,
    image,
    cuisine_type,
    timetable,
    reviews
  ) => {
    service
      .editRestaurant(
        id,
        name,
        neighborhood,
        photograph,
        location,
        image,
        cuisine_type,
        timetable,
        reviews
      )
      .then(() => history.push(`/restaurant/${params}`));
  };

  return (
    <div className="restaurant-form flex-column">
      <h1>RESTAURANT DATA:</h1>
      <NameInput state={megaState} setState={setMegaState} />
      <ImageInput state={megaState} setState={setMegaState} />
      <CuisineInput state={megaState} setState={setMegaState} />
      <Timetable state={megaState} setState={setMegaState} />
      <ReviewsInput state={megaState} setState={setMegaState} />
      <button
        onClick={
          megaState.id
            ? () =>
                modifyRestaurant(
                  megaState.id,
                  megaState.name,
                  megaState.neighborhood,
                  megaState.photograph,
                  megaState.location,
                  megaState.image,
                  megaState.cuisine_type,
                  megaState.timetable,
                  megaState.reviews
                )
            : () =>
                addRestaurant(
                  megaState.name,
                  megaState.neighborhood,
                  megaState.photograph,
                  megaState.location,
                  megaState.image,
                  megaState.cuisine_type,
                  megaState.timetable,
                  megaState.reviews
                )
        }
      >
        SUBMIT RESTAURANT
      </button>
    </div>
  );
};

export default NewRestaurant;
