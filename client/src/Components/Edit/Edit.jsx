import React, { useState } from "react";
import { connect } from "react-redux";

const Edit = ({ restaurants }) => {
    const [search, setSearch] = useState("");
    let filteredRestaurants;
  
    filteredRestaurants = restaurants.filter(el =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container">
              <input
        type="text"
        name="searchbar"
        placeholder="Search restaurants"
        className="searchbar"
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredRestaurants.map((place, i) => (
          <li key={i}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  restaurants: state.products.restaurants,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Edit);
