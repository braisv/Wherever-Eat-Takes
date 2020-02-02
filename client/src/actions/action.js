import AuthService from "../utils/AuthService";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REMOVE_RESTAURANT,
  LOGOUT
} from "./actionType";

export function fetchDataRequest() {
  return {
    type: FETCH_DATA_REQUEST
  };
}

export function fetchDataSuccess(restaurant) {
  return {
    type: FETCH_DATA_SUCCESS,
    restaurant
  };
}

export function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    payload: { error }
  };
}

export function removeSuccess(restaurant) {
  return {
    type: REMOVE_RESTAURANT,
    restaurant
  };
}

export function fetchUserRequest(user) {
  return { 
    type: LOGIN_REQUEST,
    user
  };
}

export function fetchUserSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function fetchUserFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function fetchUserLogout() {
  let service = new AuthService();
  service.logout();
  return { type: LOGOUT
  };
}
