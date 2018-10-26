import React from "react";

function ArticleVoteButton({
  userHasVotedUp,
  userHasVotedDown,
  votes,
  handleUpVote,
  handleDownVote
}) {
  return (
    <div className="voteContainer">
      <button
        className="button is-medium is-outlined"
        onClick={e => handleUpVote()}
      >
        {userHasVotedUp ? "✔️" : "🔺"}
      </button>
      <br />
      <span className="has-text-weight-bold has-text-danger is-size-2">{`${votes}`}</span>
      <br />
      <button
        className="button is-medium is-outlined"
        onClick={e => handleDownVote()}
      >
        {userHasVotedDown ? "✔️" : "🔻 "}
      </button>
    </div>
  );
}

export default ArticleVoteButton;
