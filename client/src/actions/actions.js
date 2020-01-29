import axios from "axios";

const baseURL = `${process.env.SERVER}/restaurants`;





  export const fetchRestaurants = () => async (dispatch) => {
    try {
      const response = await axios(
        `${baseURL}/restaurants`
      );
      const restaurants = await response.json();
      dispatch(fetchDataSuccess(restaurants.results));
    } catch (error) {
      dispatch(fetchDataFailed(error));
    }
  };







  let initialState = {
    loading: false,
    places: [],
    error: null
  };
  
