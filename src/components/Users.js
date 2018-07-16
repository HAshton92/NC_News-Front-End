import React, { Component } from "react";

class User extends Component {
  render() {
    if (this.props.userLoggedIn) {
      return (
        <div className="loggedInProfileData">
          <h3>Logged in as {this.props.userLoggedIn}</h3>
        </div>
      );
    } else
      return (
        <div className="notLoggedInContainer">
          Placeholder for LogIn/SignUp
          {/* <LogIn />
          <SignUp /> */}
        </div>
      );
  }
}

export default User;
