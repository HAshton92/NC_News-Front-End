import React, { Component } from "react";

class AddComment extends Component {
  state = {
    commentBody: ""
  };
  render() {
    return (
      <form>
        Your comment...<br />
        <input
          type="text"
          value={this.state.commentBody}
          onChange={e => this.handleCommentInput(e)}
          placeholder="What did you think of this article?"
        />
        {this.state.commentBody.length > 4 ? (
          <button className="submitCommentButton" onClick={this.handleClick}>
            Submit
          </button>
        ) : (
          <p>minimum 5 characters</p>
        )}
      </form>
    );
  }
  handleCommentInput = event => {
    this.setState({ commentBody: event.target.value });
  };

  handleClick = event => {
    event.preventDefault();
    this.props.handleCommentSubmit(this.state.commentBody);
  };
}

export default AddComment;
