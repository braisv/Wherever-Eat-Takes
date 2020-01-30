import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserLogout
} from "./action";
import AuthService from "../utils/AuthService";

export function login(username, password) {
  let service = new AuthService();

  return dispatch => {
    dispatch(fetchUserRequest({ username }));

    service.login(username, password).then(
      user => {
        dispatch(fetchUserSuccess(user));
      },
      error => {
        dispatch(fetchUserFailure(error));
      }
    );
  };
}

export function logout() {
    fetchUserLogout()
}
