import React, { useState } from "react";
import { connect } from "react-redux";
import "./Options/Form.scss";
import { fetchRestaurants } from "../../actions/fetchData";
import RestaurantsService from "../../utils/RestaurantsService";
import NameInput from "./Options/NameInput";
import ImageInput from "./Options/ImageInput";
import CuisineInput from "./Options/Cuisine_typeInput";
import Timetable from "./Options/Timetable";
import ReviewsInput from "./Options/ReviewsInput";

const NewRestaurant = ({ restaurants, addedRestaurant }) => {
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
    reviews: [
      {
        name: "",
        date: "",
        rating: 0,
        comments: ""
      }
    ]
  });

  const service = new RestaurantsService();

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
        service.newRestaurant(
            name,
            neighborhood,
            photograph,
            location,
            image,
            cuisine_type,
            timetable,
            reviews
        )
       addedRestaurant()
    }

  console.log("NEW RESTAURANT: ", megaState);
  console.log("NEW STATE: ", restaurants)

  return (
    <div className="restaurant-form flex-column">
      <h1>RESTAURANT DATA:</h1>
      <NameInput state={megaState} setState={setMegaState} />
      <ImageInput state={megaState} setState={setMegaState} />
      <CuisineInput state={megaState} setState={setMegaState} />
      <Timetable state={megaState} setState={setMegaState} />
      <ReviewsInput state={megaState} setState={setMegaState} />
      <button
        onClick={() =>
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

const mapStateToProps = state => ({
  restaurants: state.products.restaurants,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = { fetchRestaurants };

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurant);
