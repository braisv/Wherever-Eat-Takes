import React from "react";
import RestaurantPhoto from "../RestaurantPhoto/RestaurantPhoto";
import { connect } from "react-redux";
import "./RestaurantGrid.scss";

const RestaurantGrid = ({ restaurants }) => {
  
  if (!restaurants[0])
  return (
    <div className="spinner">
      <div class="lds-hourglass"></div>
    </div>
  );
  return (
    <div className="container">
      <div className="restaurant-grid">
        {restaurants.map((place, i) => (
          <RestaurantPhoto key={i} place={place} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  restaurants: state.products.restaurants
});

export default connect(mapStateToProps)(RestaurantGrid);
