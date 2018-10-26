import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "./User";

class Navbar extends Component {
  state = {
    isActive: false
  };
  render() {
    return (
      <nav className="navbar is-fixed-top is-spaced is-black">
        <div className="navbar-brand">
          <div className="button is-danger is-large">
            <Link to="/">
              <span className="has-text-white has-text-weight-bold">
                {" "}
                NC_News
              </span>
            </Link>
          </div>
          <div
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu-index"
            onClick={
              this.state.isActive
                ? e => this.handleBurgerClickOff()
                : e => this.handleBurgerClickOn()
            }
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>
        <div
          className={
            this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
          }
          id="navbar-menu-index"
        >
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link has-text-weight-semibold has-text-white">
              Do stuff
            </div>
            <div className="navbar-dropdown">
              <div className="navbar-item">
                <Link to="/topics">
                  <span className="has-text-weight-semibold has-text-black">
                    Explore topics
                  </span>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/createArticle">
                  <span className="has-text-weight-semibold has-text-black">
                    Write a new article
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <User
              userLoggedIn={this.props.userLoggedIn}
              logOutUser={this.props.logOutUser}
            />
          </div>
        </div>
      </nav>
    );
  }
  handleBurgerClickOn = () => {
    this.setState({ isActive: true });
  };
  handleBurgerClickOff = () => {
    this.setState({ isActive: false });
  };
}
export default Navbar;
