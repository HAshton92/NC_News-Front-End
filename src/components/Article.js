import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as api from "../api";
import UserInfo from "./UserInfo";
import Comments from "./Comments";
import Loading from "./Loading";
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
  };

  render() {
    if (this.state.error) return <Redirect to="../404" />;
    else if (this.state.article._id)
      return (
        <section className="section">
          <div className="container has-text-black">
            <div className="notification">
              <span className="has-text-weight-bold is-size-3">
                {this.state.article.title}
              </span>
              <br />
              <br />
              <div className="columns">
                <div className="column">
                  {this.state.article.created_by ? (
                    <h5>
                      An article by...
                      <UserInfo createdBy={this.state.article.created_by} />
                    </h5>
                  ) : (
                    <Loading />
                  )}
                </div>
                <div className="column is-two-thirds">
                  <span className="is-italic is-size-6">
                    {this.state.article.body}
                  </span>
                </div>
                <div className="column">
                  <ArticleVoteButton
                    userHasVotedUp={this.state.userHasVotedUp}
                    userHasVotedDown={this.state.userHasVotedDown}
                    votes={this.state.article.votes}
                    handleUpVote={this.handleUpVote}
                    handleDownVote={this.handleDownVote}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container has-text-black">
            {this.state.article._id ? (
              <Comments article_id={this.state.article._id} />
            ) : (
              <Loading />
            )}
          </div>
        </section>
      );
    else return <Loading />;
  }
  handleUpVote = () => {
    if (this.state.userHasVotedUp === false) {
      api.voteOnArticle(this.state.article._id, "up");
      const updatedArticle = {
        belongs_to: this.state.article.belongs_to,
        body: this.state.article.body,
        created_by: this.state.article.created_by,
        title: this.state.article.title,
        votes: this.state.article.votes + 1,
        __v: this.state.article.__v,
        _id: this.state.article._id
      };
      this.setState({ article: updatedArticle, userHasVotedUp: true });
    }
  };

  handleDownVote = () => {
    if (this.state.userHasVotedDown === false) {
      api.voteOnArticle(this.state.article._id, "down");
      const updatedArticle = {
        belongs_to: this.state.article.belongs_to,
        body: this.state.article.body,
        created_by: this.state.article.created_by,
        title: this.state.article.title,
        votes: this.state.article.votes - 1,
        __v: this.state.article.__v,
        _id: this.state.article._id
      };
      this.setState({ article: updatedArticle, userHasVotedDown: true });
    }
  };
}

export default Article;
