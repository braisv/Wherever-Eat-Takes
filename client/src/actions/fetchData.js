import RestaurantsService from "../utils/RestaurantsService";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSuccess, newSuccess } from "./action";

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
  console.log("PETICION ACTION")
  return dispatch => {
    console.log("DISPATCH PASO 1 ACTION")
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
          console.log("SUCCESS ACTION")
          dispatch(newSuccess(restaurant));
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
          console.log("ACTION ERROR")
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
