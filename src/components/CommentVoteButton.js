import React from "react";

function CommentVoteButton({
  handleUpVote,
  handleDownVote,
  votedUpOn,
  votedDownOn,
  votes,
  commentID
}) {
  const userHasVotedUp = votedUpOn.includes(commentID);
  const userHasVotedDown = votedDownOn.includes(commentID);

  return (
    <div className="voteContainer">
      <button
        className="button is-outlined"
        onClick={e => {
          if (userHasVotedUp === false) handleUpVote(commentID);
        }}
      >
        {userHasVotedUp ? "✔️" : "🔺"}
      </button>
      <br />
      <span className="has-text-weight-bold has-text-danger is-size-3">{`${votes}`}</span>
      <br />
      <button
        className="button is-outlined"
        onClick={e => {
          if (userHasVotedDown === false) handleDownVote(commentID);
        }}
      >
        {userHasVotedDown ? "✔️" : "🔻 "}
      </button>
    </div>
  );
}

export default CommentVoteButton;
