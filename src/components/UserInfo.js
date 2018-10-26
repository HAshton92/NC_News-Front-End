import React, { Component } from "react";
import "../App.css";
import * as api from "../api";

class UserInfo extends Component {
  state = {
    user: {}
  };

  componentDidMount = () => {
    api
      .getUserById(this.props.createdBy)
      .then(({ user }) => this.setState({ user }))
      .catch(() => {
        this.setState({ user: { name: undefined } });
      });
  };

  render() {
    if (this.state.user.name === undefined)
      return (
        <div className="userInfoContainer">
          <p>Unknown user</p>
        </div>
      );
    else
      return (
        <div className="tile is-vertical">
          <br />
          <div className="avatar">
            <img
              className="image is-64x64"
              src={this.state.user.avatar_url}
              alt="user avatar"
            />
          </div>
          <br />
          <strong>{this.state.user.username}</strong>
          {this.props.contentType === "comment" &&
          this.state.user.username === "tickle122" ? (
            <button
              type="button"
              className="commentDeleteButton"
              onClick={e =>
                this.props.handleDeleteComment(this.props.commentID)
              }
            >
              Delete this comment
            </button>
          ) : (
            ""
          )}
        </div>
      );
  }
}

export default UserInfo;
