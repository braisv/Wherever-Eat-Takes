import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { removeRestaurant, fetchRestaurants } from "../../actions/fetchData";
import NewRestaurant from "./NewRestaurant";
import "./Edit.scss";

const Edit = ({ restaurants, removeRestaurant, fetchRestaurants }) => {
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [add, setAdd] = useState(false);
  const history = useHistory();

  const addedRestaurant = () => {
    setAdd(false)
    fetchRestaurants()
  }

  const editPlace = (id) => {
    history.push(`/edit/${id}`)
  }

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
        {add ? <NewRestaurant addedRestaurant={addedRestaurant} /> : ""}
      <div className="section-2 flex">
        <ul className="restaurant-grid">
          {filteredRestaurants.map((place, i) => (
            <li key={i}>
              <div className="flex button-edit">
              <Link to={`/restaurant/${place.id}`} restaurant={place}>
                {place.name}{" "}
              </Link>
                <div>
                  {edit ? <FontAwesomeIcon icon={faPen} onClick={() => editPlace(place.id)} size="2x" /> : ""}
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

const mapDispatchToProps = { removeRestaurant, fetchRestaurants };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
