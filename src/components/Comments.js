import React, { Component } from "react";
import * as api from "../api";
import UserInfo from "./UserInfo";
import CommentVoteButton from "./CommentVoteButton";
import AddComment from "./AddComment";
import Error from "./Error";
import Loading from "./Loading";

class Comments extends Component {
  state = {
    comments: [],
    votedUpOn: [],
    votedDownOn: [],
    commentFormOpen: false,
    articleHasNoComments: false
  };

  componentDidMount = () => {
    api
      .getCommentsForArticle(this.props.article_id)
      .then(({ comments }) => this.setState({ comments }))
      .catch(err => {
        if (err.response.status === 404)
          return this.setState({ articleHasNoComments: true });
      });
  };

  render() {
    return (
      <div className="section">
        <span className="has-text-weight-semibold is-size-5">Comments</span>
        <br />
        <br />
        <button
          className="button is-large"
          onClick={e => this.handleAddCommentButtonClick()}
        >
          Add comment
        </button>
        <br />
        <br />
        <div>
          {this.state.commentFormOpen ? (
            <AddComment handleCommentSubmit={this.handleCommentSubmit} />
          ) : (
            ""
          )}
        </div>
        <ul>
          {this.state.articleHasNoComments ? (
            <h4>There are no comments for this article yet</h4>
          ) : this.state.comments.length ? (
            this.state.comments.map(comment => {
              return (
                <li key={comment._id}>
                  <div className="notification">
                    <div className="columns">
                      <div className="column">
                        <h5>
                          <UserInfo
                            createdBy={comment.created_by}
                            contentType="comment"
                            handleDeleteComment={this.handleDeleteComment}
                            commentID={comment._id}
                          />
                        </h5>
                      </div>
                      <div className="column is-two-thirds">
                        <span className="is-italic is-size-6">
                          {comment.body}
                        </span>
                      </div>
                      <div className="column">
                        <CommentVoteButton
                          handleUpVote={this.handleUpVote}
                          handleDownVote={this.handleDownVote}
                          votedUpOn={this.state.votedUpOn}
                          votedDownOn={this.state.votedDownOn}
                          votes={comment.votes}
                          commentID={comment._id}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                </li>
              );
            })
          ) : (
            <Loading />
          )}
        </ul>
      </div>
    );
  }
  handleAddCommentButtonClick = () => {
    this.setState({ commentFormOpen: true });
  };

  handleCommentSubmit = userInput => {
    const newComm = {
      comment: userInput,
      created_by: "tickle122"
    };
    api
      .addComment(this.props.article_id, newComm)
      .then(({ comment }) =>
        this.setState({
          comments: [...this.state.comments, comment],
          commentFormOpen: false,
          articleHasNoComments: false
        })
      )
      .catch(err => <Error message={err.message} />);
  };

  handleUpVote = commentID => {
    api.voteOnComment(commentID, "up");
    const updatedComments = this.state.comments.map(comm => {
      if (comm._id === commentID) {
        comm.votes = comm.votes += 1;
      }
      return comm;
    });
    this.setState({
      votedUpOn: [...this.state.votedUpOn, commentID],
      comments: updatedComments
    });
  };

  handleDownVote = commentID => {
    api.voteOnComment(commentID, "down");
    const updatedComments = this.state.comments.map(comm => {
      if (comm._id === commentID) {
        comm.votes = comm.votes -= 1;
      }
      return comm;
    });
    this.setState({
      votedDownOn: [...this.state.votedDownOn, commentID],
      comments: updatedComments
    });
  };

  handleDeleteComment = commentID => {
    api.deleteComment(commentID);
    const updatedComments = this.state.comments.filter(
      comment => comment._id !== commentID
    );
    this.setState({ comments: updatedComments });
  };
}

export default Comments;
