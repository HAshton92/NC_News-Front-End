import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as api from "../api";
import Loading from "./Loading";

class CreateArticle extends Component {
  state = {
    articleBody: "",
    articleTitle: "",
    articleTopic: "default",
    topics: [],
    articleSubmitted: false
  };

  componentDidMount = () => {
    api.getTopics().then(({ topics }) => this.setState({ topics }));
  };

  render() {
    return (
      <section className="section">
        <div className="container has-text-black">
          {this.state.articleSubmitted ? (
            <NavLink exact to={`/topics/${this.state.articleTopic}`}>
              Your article has been submitted, click here to view all articles
              in {`${this.state.articleTopic}`}
            </NavLink>
          ) : this.state.topics.length ? (
            <div className="cotainer">
              <span className="has-text-weight-bold is-size-3">
                Write a new article
              </span>
              <br />
              <div className="field">
                <label className="label has-text-left">Title:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={this.state.articleTitle}
                    onChange={e => this.handleTitleInput(e)}
                    placeholder="Enter your article's title here..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-left">Topic:</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={this.state.articleTopic}
                      onChange={this.handleTopicSelect}
                    >
                      <option value="default" disabled>
                        Select a topic
                      </option>
                      {this.state.topics.map(topic => {
                        return (
                          <option key={topic.slug} value={topic.slug}>
                            {topic.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-left">Text:</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    value={this.state.articleBody}
                    onChange={e => this.handleArticleInput(e)}
                    placeholder="Enter your article here..."
                  />
                </div>
              </div>
              {this.state.articleBody &&
              this.state.articleTitle &&
              this.state.articleTopic !== "default" ? (
                <button
                  className="button is-large is-outlined"
                  onClick={this.handleArticleSubmit}
                >
                  Submit
                </button>
              ) : (
                <p>Please fill out each section</p>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    );
  }

  handleArticleInput = event => {
    this.setState({ articleBody: event.target.value });
  };

  handleTitleInput = event => {
    this.setState({ articleTitle: event.target.value });
  };

  handleTopicSelect = event => {
    this.setState({ articleTopic: event.target.value });
  };

  handleArticleSubmit = event => {
    event.preventDefault();
    const newArticle = {
      title: this.state.articleTitle,
      body: this.state.articleBody,
      created_by: this.props.user
    };
    api.createArticle(this.state.articleTopic, newArticle);
    this.setState({ articleSubmitted: true });
  };
}

export default CreateArticle;
