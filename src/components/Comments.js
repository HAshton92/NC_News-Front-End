import React, { Component } from "react";
import * as api from "../api";
import UserInfo from "./UserInfo";
import CommentVoteButton from "./CommentVoteButton";
import AddComment from "./AddComment";
import Error from "./Error";

class Comments extends Component {
  state = {
    comments: [],
    votedUpOn: [],
    votedDownOn: [],
    commentFormOpen: false
  };

  componentDidMount = () => {
    api
      .getCommentsForArticle(this.props.article_id)
      .then(({ comments }) => this.setState({ comments }));
  };

  render() {
    return (
      <div className="articleCommentsContainer">
        <button
          className="addCommentButton"
          onClick={e => this.handleAddCommentButtonClick()}
        >
          Add comment
        </button>
        <div>
          {this.state.commentFormOpen ? (
            <AddComment handleCommentSubmit={this.handleCommentSubmit} />
          ) : (
            "______"
          )}
        </div>
        <ul>
          {this.state.comments.map(comment => {
            return (
              <li key={comment._id}>
                <h5>
                  {this.state.comments.length ? (
                    <UserInfo
                      createdBy={comment.created_by}
                      contentType="comment"
                      handleDeleteComment={this.handleDeleteComment}
                      commentID={comment._id}
                    />
                  ) : (
                    "Loading..."
                  )}
                </h5>
                <p>{comment.body}</p>
                <CommentVoteButton
                  votedUpOn={this.state.votedUpOn}
                  votedDownOn={this.state.votedDownOn}
                  handleCommentVote={this.handleCommentVote}
                  votes={comment.votes}
                  commentID={comment._id}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  handleAddCommentButtonClick = () => {
    this.setState({ commentFormOpen: true });
  };

  // ******************
  // NOTE TO SELF: USER DATA HARDCODED, REVISE ONCE USER FUNCTIONALITY IS ADDED
  // ****************
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
          commentFormOpen: false
        })
      )
      .catch(err => <Error message={err.message} />);
  };

  handleCommentVote = (commentID, vote) => {
    api.voteOnComment(commentID, vote);
    let v;
    vote === "up" ? (v = 1) : (v = -1);
    const updatedComments = this.state.comments.map(comm => {
      if (comm._id === commentID) {
        console.log("!!!!");
        comm.votes = comm.votes += v;
      }
      return comm;
    });
    v === 1
      ? this.setState({
          votedUpOn: [...this.state.votedUpOn, commentID],
          comments: updatedComments
        })
      : this.setState({
          votedDownOn: [...this.state.votedDownOn, commentID],
          comments: updatedComments
        });
  };

  handleDeleteComment = commentID => {
    api.deleteComment(commentID);
    const updatedComments = this.state.comments.filter(comment => {
      if (comment._id !== commentID) return comment;
    });
    this.setState({ comments: updatedComments });
  };
}

export default Comments;
