import React, { Component } from "react";
import * as api from "../api";
import Loading from "./Loading";

class LogIn extends Component {
  state = {
    users: [],
    loaded: false
  };

  componentDidMount = () => {
    api.getUsers().then(users => this.setState({ users, loaded: true }));
  };

  render() {
    if (this.state.loaded)
      return (
        <section className="section">
          <h2>Available users</h2>
          <ul>
            {this.state.users.map(user => {
              return (
                <li key={`${user.username}`}>
                  <div className="box">
                    <article className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img src={user.avatar_url} alt="user avatar" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <small>Username: </small>{" "}
                          <strong>{user.username}</strong>
                          <br />
                          <small>Name: </small> <strong>{user.name}</strong>
                          <div className="media-content">
                            <button
                              type="button"
                              className="button is-large is-outlined"
                              onClick={e =>
                                this.props.changeUserLoggedIn(user.username)
                              }
                            >
                              {this.props.userLoggedIn === user.username
                                ? "Logged in"
                                : "Log in"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      );
    else return <Loading />;
  }
}

export default LogIn;
