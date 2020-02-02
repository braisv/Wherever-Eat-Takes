import RestaurantsService from "../utils/RestaurantsService";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSuccess } from "./action";

let service = new RestaurantsService();

export function fetchRestaurants() {
  return dispatch => {
    dispatch(fetchDataRequest());

    service.getAll().then(
      restaurants => {
        dispatch(fetchDataSuccess(restaurants));
      },
      error => {
        dispatch(fetchDataError(error));
      }
    );
  };
}

export function searchRestaurants(query) {
  return dispatch => {
    dispatch(fetchDataRequest({ query }));

    service.search(query).then(
      restaurants => {
        dispatch(fetchDataSuccess(restaurants));
      },
      error => {
        dispatch(fetchDataError(error));
      }
    );
  };
}

export function getRestaurant(id) {
  return dispatch => {
    dispatch(fetchDataRequest({ id }));

    service.getOne(id).then(
      restaurant => {
        dispatch(fetchDataSuccess(restaurant));
      },
      error => {
        dispatch(fetchDataError(error));
      }
    );
  };
}

export function newRestaurant(
  name,
  neighborhood,
  photograph,
  location,
  image,
  cuisine_type,
  timetable,
  reviews
) {
  return dispatch => {
    dispatch(fetchDataRequest({ name }));

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
      .then(
        restaurant => {
          dispatch(fetchDataSuccess(restaurant));
        },
        error => {
          dispatch(fetchDataError(error));
        }
      );
  };
}

export function removeRestaurant(id) {
  return dispatch => {
    dispatch(fetchDataRequest({ id }));

    service.removeRestaurant(id).then(
      restaurant => {
        dispatch(removeSuccess(restaurant));
        service.getAll().then(
          restaurants => {
            dispatch(fetchDataSuccess(restaurants));
          },
          error => {
            dispatch(fetchDataError(error));
          }
        );
      },
      error => {
        dispatch(fetchDataError(error));
      }
    );
  };
}

export function editRestaurant(
  id,
  name,
  neighborhood,
  photograph,
  location,
  image,
  cuisine_type,
  timetable,
  reviews
) {
  return dispatch => {
    dispatch(fetchDataRequest({ name }));

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
      .then(
        restaurant => {
          dispatch(fetchDataSuccess(restaurant));
        },
        error => {
          dispatch(fetchDataError(error));
        }
      );
  };
}
