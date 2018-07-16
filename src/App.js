import React, { Component } from "react";
import "./App.css";
import User from "./components/Users";
import { Route, NavLink } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import ExploreTopics from "./components/ExploreTopics";
import Error from "./components/Error";

class App extends Component {
  state = {
    userLoggedIn: "tickle122"
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="columns">
            <div className="column is-one-third">
              <img
                src="https://images.ecosia.org/dPjGdcHbqyXX6NkutufTl_5Eu18=/0x390/smart/https%3A%2F%2Fcourse_report_production.s3.amazonaws.com%2Frich%2Frich_files%2Frich_files%2F3760%2Fs300%2Fnorth-coders-logo.png"
                className="App-logo"
                alt="logo"
              />
            </div>
            <div clasName="column is-one-third">
              {" "}
              <h1 className="App-title">
                <NavLink exact to="/">
                  NC_News
                </NavLink>
              </h1>
            </div>
            <div clasName="column is-one-third">
              {" "}
              <User userLoggedIn={this.state.userLoggedIn} />
            </div>
          </div>
          <br />
          <Nav />
        </header>
        <div className="bodyContainer">
          <Route exact path="/" render={() => <Articles />} />
          <Route path="/topics/:topic_slug" component={Articles} />
          <Route path="/articles/:article_id" component={Article} />
          <Route
            exact
            path="/topics"
            render={() => (
              <ExploreTopics
                selectedTopic={this.state.selectedTopic}
                changeSelectedTopic={this.changeSelectedTopic}
              />
            )}
          />
          <Route
            path="/404"
            render={() => <Error message={"Page not found!"} />}
          />
        </div>
      </div>
    );
  }
  changeUserLoggedIn = newUser => {
    this.setState({ userLoggedIn: newUser });
  };
}

function Nav() {
  return (
    <div className="navBar">
      <NavLink exact to="/topics">
        Explore topics
      </NavLink>
      {` | `}
      <NavLink exact to="/createArticle">
        Write a new article
      </NavLink>{" "}
    </div>
  );
}

export default App;
