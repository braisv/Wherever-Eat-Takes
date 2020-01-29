import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import AuthService from "./utils/AuthService";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import RestaurantDetails from "./Components/RestaurantDetails/RestaurantDetails";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.fetchUser();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.service
      .logout()
      .then(() => {
        this.setState({ loggedInUser: null });
      })
      .catch(err => console.log(err));
  };

  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  }

  render() {
    return (
      <div className="App app-container">
        <NavBar title="Wherever Eat Takes" user={this.state.loggedInUser} />
        <div className="content">
          <Switch>
          <Route
              exact
              path="/"
              render={() => <Home getUser={this.getUser} />}
            />
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getUser} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login getUser={this.getUser} />}
            />
            <Route
              exact
              path="/restaurant/:restaurantId"
              render={() => <RestaurantDetails getUser={this.getUser} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
