import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import AuthService from "./utils/AuthService";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import RestaurantDetails from "./Components/RestaurantDetails/RestaurantDetails";
import { fetchRestaurants } from "./actions/fetchData";
import { connect } from "react-redux";
import RestaurantGrid from "./Components/RestaurantGrid/RestaurantGrid";
import Search from "./Components/Search/Search";
import FavouriteRestaurants from "./Components/Favourites/Favourites";
import Edit from "./Components/Edit/Edit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.fetchUser();
  }

  componentDidMount() {
    this.props.dispatch(fetchRestaurants());
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
        <NavBar
          title="Wherever Eat Takes"
          user={this.state.loggedInUser}
          logout={() => this.logout()}
        />
        <div className="content">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <RestaurantGrid
                  restaurants={this.props}
                  getUser={this.getUser}
                />
              )}
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
              render={() => (
                <RestaurantDetails user={this.state.loggedInUser} />
              )}
            />
            <Route
              exact
              path="/search"
              render={() => (
                <Search restaurants={this.props} getUser={this.getUser} />
              )}
            />
            <Route
              exact
              path="/favourites"
              render={() => (
                <FavouriteRestaurants
                  restaurants={this.props}
                  user={this.state.loggedInUser}
                />
              )}
            />
            <Route exact path="/edit" render={() => <Edit />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.products.user,
  restaurants: state.products.restaurants,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(App);
