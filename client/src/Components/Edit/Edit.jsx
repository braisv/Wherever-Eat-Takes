import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { removeRestaurant } from "../../actions/fetchData";
import NewRestaurant from "./NewRestaurant";
import "./Edit.scss";

const Edit = ({ restaurants, removeRestaurant }) => {
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [add, setAdd] = useState(true);

  let filteredRestaurants;

  filteredRestaurants = restaurants.filter(el =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="edit-container flex-column">
      <div className="section-1 flex-column">
        <input
          type="text"
          name="searchbar"
          placeholder="Search restaurants"
          className="searchbar"
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex edit-options">
          <span onClick={() => setAdd(!add)}>Add</span>
          <span onClick={() => setRemove(!remove)}>Remove</span>
          <span onClick={() => setEdit(!edit)}>Edit</span>
        </div>
      </div>
        {add ? <NewRestaurant /> : ""}
      <div className="section-2 flex">
        <ul className="restaurant-grid">
          {filteredRestaurants.map((place, i) => (
            <li key={i}>
              <div className="flex button-edit">
                {place.name}{" "}
                <div>
                  {edit ? <FontAwesomeIcon icon={faPen} size="2x" /> : ""}
                  {remove ? <FontAwesomeIcon
                    icon={faTrash}
                    size="2x"
                    onClick={() => removeRestaurant(place.id)}
                  /> : ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  restaurants: state.products.restaurants,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = { removeRestaurant };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
