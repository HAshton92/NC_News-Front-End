import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import UserInfo from "./UserInfo";
import Loading from "./Loading";

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount = () => {
    this.props.match
      ? api
          .getArticlesByTopic(this.props.match.params.topic_slug)
          .then(({ articles }) => this.setState({ articles }))
      : api.getArticles().then(({ articles }) => this.setState({ articles }));
  };

  render() {
    if (this.state.articles.length)
      return (
        <section className="section">
          <div className="has-text-black is-size-4 has-text-weight-bold">
            Most popular articles{" "}
            {this.props.match
              ? `in ${this.props.match.params.topic_slug}`
              : "across all topics"}
          </div>
          <br />
          <ul>
            {this.state.articles.map(article => {
              return (
                <li key={`${article._id}`}>
                  <div className="notification">
                    <div className="columns has-text-black">
                      <div className="column">
                        {" "}
                        <h5>
                          Created by <UserInfo createdBy={article.created_by} />
                        </h5>
                      </div>
                      <div className="column is-two-thirds">
                        <Link to={`/articles/${article._id}`}>
                          <span className="is-italic has-text-weight-semibold is-size-4">
                            {article.title}
                          </span>
                        </Link>
                      </div>
                      <div className="column">
                        <span className="has-text-weight-bold has-text-danger is-size-2">{`< ${
                          article.votes
                        } >`}</span>
                      </div>
                    </div>
                  </div>
                  <br />
                </li>
              );
            })}
          </ul>
        </section>
      );
    else return <Loading />;
  }
}

export default Articles;
