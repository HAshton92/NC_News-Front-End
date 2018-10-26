import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import Loading from "./Loading";

class ExploreTopics extends Component {
  state = {
    topics: []
  };

  componentDidMount = () => {
    api.getTopics().then(({ topics }) => this.setState({ topics }));
  };

  render() {
    return (
      <section className="section">
        <div className="has-text-black">
          <span className="is-size-4 has-text-weight-bold">Topics</span>
          <br />
          <br />
          {this.state.topics.length ? (
            this.state.topics.map(topic => {
              return (
                <div key={topic.slug}>
                  <button className="button is-large">
                    <Link to={`/topics/${topic.slug}`}>
                      <span className="has-text-danger has-text-weight-semibold">{`< ${
                        topic.title
                      } >`}</span>
                    </Link>
                  </button>
                  <br />
                  <br />
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </section>
    );
  }
}

export default ExploreTopics;
