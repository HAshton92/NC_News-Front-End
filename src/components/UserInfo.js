import React, { Component } from "react";
import * as api from "../api";

class UserInfo extends Component {
  state = {
    user: {}
  };

  componentDidMount = () => {
    api
      .getUserById(this.props.createdBy)
      .then(({ user }) => this.setState({ user }))
      .catch(err => {
        this.setState({ user: undefined });
      });
  };

  render() {
    if (this.state.user === undefined)
      return (
        <div className="userInfoContainer">
          <p>Unknown user</p>
        </div>
      );
    else
      return (
        <div className="userInfoContainer">
          <p>{this.state.user.name}</p>
          {/* <img src={this.state.user.avatar_url} /> */
          this.props.contentType === "comment" &&
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
