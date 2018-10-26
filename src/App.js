import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import ExploreTopics from "./components/ExploreTopics";
import CreateArticle from "./components/CreateArticle";
import Error from "./components/Error";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    userLoggedIn: ""
  };
  render() {
    return (
      <div className="App">
        <Navbar
          userLoggedIn={this.state.userLoggedIn}
          logOutUser={this.logOutUser}
        />
        <div className="navbarBuffer" />
        <div className="bodyContainer">
          <Route
            exact
            path="/"
            render={() => <Articles userLoggedIn={this.state.userLoggedIn} />}
          />
          <Route
            path="/login"
            render={() => (
              <LogIn
                changeUserLoggedIn={this.changeUserLoggedIn}
                userLoggedIn={this.state.userLoggedIn}
              />
            )}
          />
          <Route path="/topics/:topic_slug" component={Articles} />
          <Route path="/articles/:article_id" component={Article} />
          <Route
            exact
            path="/topics"
            render={() => (
              <ExploreTopics
                selectedTopic={this.state.selectedTopic}
                changeSelectedTopic={this.changeSelectedTopic}
                userLoggedIn={this.state.userLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/createArticle"
            render={() => <CreateArticle user={this.state.userLoggedIn} />}
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
    if (newUser !== this.state.userLoggedIn)
      this.setState({ userLoggedIn: newUser });
  };

  logOutUser = () => {
    this.setState({ userLoggedIn: "" });
  };
}

export default App;
