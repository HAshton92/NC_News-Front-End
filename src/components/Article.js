import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as api from "../api";
import UserInfo from "./UserInfo";
import Comments from "./Comments";
import ArticleVoteButton from "./ArticleVoteButton";

class Article extends Component {
  state = {
    article: {},
    userHasVotedUp: false,
    userHasVotedDown: false,
    error: false
  };

  componentDidMount = () => {
    api
      .getArticleById(this.props.match.params.article_id)
      .then(({ article }) => this.setState({ article }))
      .catch(() => this.setState({ error: true }));
    api
      .getCommentsForArticle(this.props.match.params.article_id)
      .then(({ comments }) => this.setState({ comments }));
  };

  render() {
    if (this.state.error) return <Redirect to="../404" />;
    else if (this.state.article._id)
      return (
        <div className="articlePageParent">
          <div className="articleContainer">
            <h1>{this.state.article.title}</h1>

            {this.state.article.created_by ? (
              <h5>
                An article by...
                <UserInfo createdBy={this.state.article.created_by} />
              </h5>
            ) : (
              "Loading..."
            )}

            <p>{this.state.article.body}</p>

            <ArticleVoteButton
              userHasVotedUp={this.state.userHasVotedUp}
              userHasVotedDown={this.state.userHasVotedDown}
              votes={this.state.article.votes}
              handleUpVote={this.handleUpVote}
              handleDownVote={this.handleDownVote}
            />
          </div>
          <div className="commentsContainer">
            <h3>Comments</h3>
            <br />
            {this.state.article._id ? (
              <Comments article_id={this.state.article._id} />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      );
    else return <h1>LOADING...</h1>;
  }
  handleUpVote = () => {
    api.voteOnArticle(this.state.article._id, "up").then(({ article }) => {
      this.setState({ article, userHasVotedUp: true });
    });
  };

  handleDownVote = () => {
    api.voteOnArticle(this.state.article._id, "down").then(({ article }) => {
      this.setState({ article, userHasVotedDown: true });
    });
  };
}

export default Article;
