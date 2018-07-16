import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import UserInfo from "./UserInfo";

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
        <div>
          <h2>
            Most popular articles{" "}
            {this.props.match
              ? `in ${this.props.match.params.topic_slug}`
              : "across all topics"}
          </h2>
          <ul>
            {this.state.articles.map(article => {
              return (
                <li key={`${article._id}`}>
                  <Link to={`/articles/${article._id}`}>
                    <h3>{article.title}</h3>
                    <h5>
                      Created by <UserInfo createdBy={article.created_by} />
                    </h5>
                    <p>{article.votes}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    else return <h1>LOADING...</h1>;
  }
}

export default Articles;
