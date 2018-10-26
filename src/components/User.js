import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class User extends Component {
  render() {
    if (this.props.userLoggedIn) {
      return (
        <div className="navbar-item is-danger is-outlined">
          <div className="navbar-item has-text-weight-semibold has-text-danger">
            Logged in as {this.props.userLoggedIn}
          </div>
          <div
            className="button is-white"
            onClick={e => this.props.logOutUser()}
          >
            Log out
          </div>
        </div>
      );
    } else
      return (
        <div className="buttons">
          <div className="button is-white">
            <NavLink exact to="/login">
              <span className="has-text-black">Log in</span>
            </NavLink>
          </div>
        </div>
      );
  }
}

export default User;
