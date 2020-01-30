import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../../utils/AuthService";
import { Link } from "react-router-dom";
import "./Login.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.validateUsername(username);
    this.validatePassword(password);

    this.service
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: "",
        });
        this.props.getUser(response.user);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          username: username,
          password: password,
          invalidUsername: "Username already exists"
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateUsername = username => {
    // eslint-disable-next-line
    let usernameFormat = /^\w{3,12}$/;

    if (username.match(usernameFormat)) {
      return;
    }

    this.setState({
      ...this.state,
      invalidUsername: "Invalid username"
    });
  };

  validatePassword = password => {
    let passFormat = /^(?=.*[0-9])(?=.*[a-zA-Z])\w{8,16}$/;

    if (password.match(passFormat)) {
      return;
    }

    this.setState({
      ...this.state,
      invalidPassword:
        "The password must contain from 8 to 16 characters and at least 1 digit and character"
    });
  };

  render() {
    return (
      <div className="user-container">
        <div className="user-options">
          <div className="flex">
          <div className="user-option selected">
            <Link className="link" to="/signup">
              New here
            </Link>
          </div>
          <div className="user-option">
            <Link className="link" to="/login">
              Already user
            </Link>
            </div>
          </div>
        </div>

        <div className="user-login flex-column">
        <h3>Sign up using your username</h3>

        <form className="signup-form" onSubmit={this.handleFormSubmit}>
          <div className="flex-column">
            <fieldset>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="userN..."
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>

            <p>
              {this.state.invalidUsername
                ? `${this.state.invalidUsername}`
                : ""}
            </p>

            <fieldset>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>

            <p>
              {this.state.invalidPassword
                ? `${this.state.invalidPassword}`
                : ""}
            </p>
          </div>

          <input className="submit-signup" type="submit" value="Sign up" />
        </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
