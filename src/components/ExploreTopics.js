import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

class ExploreTopics extends Component {
  state = {
    topics: []
  };

  componentDidMount = () => {
    api.getTopics().then(({ topics }) => this.setState({ topics }));
  };

  render() {
    return (
      <div className="topicsContainer">
        <h2>Topics</h2>
        {this.state.topics
          ? this.state.topics.map(topic => {
              return (
                <div key={topic.slug}>
                  <h3>
                    {" "}
                    <Link to={`/topics/${topic.slug}`}>{topic.title}</Link>
                  </h3>
                </div>
              );
            })
          : "LOADING..."}
      </div>
    );
  }
}

export default ExploreTopics;
