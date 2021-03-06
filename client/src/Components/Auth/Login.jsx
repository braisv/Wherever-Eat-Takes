import React, { Component } from "react";
import AuthService from "../../utils/AuthService";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { login } from "../../actions/fetchUser";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response);
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="user-container">
        <div className="user-options">
          <div className="flex">
          <div className="user-option">
            <Link className="link" to="/signup">
              New here
            </Link>
          </div>
          <div className="user-option selected">
            <Link className="link" to="/login">
              Already user
            </Link>
            </div>
          </div>
        </div>

        <div className="user-login flex-column">
          <h3>Sign In with username</h3>

          <form className="signup-form" onSubmit={this.handleFormSubmit}>
            <div className="flex-column">
              <fieldset className="flex-column">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={e => this.handleChange(e)}
                />
              </fieldset>

              <fieldset className="flex-column">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </fieldset>
            </div>
            <input className="submit-signup" type="submit" value="Log in" />
          </form>

          <p>{this.state.error ? "Wrong username or password" : ""}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
});

export default connect(mapStateToProps)(withRouter(Login));
