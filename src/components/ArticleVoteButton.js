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
      <div>
        {userHasVotedUp ? (
          <h1>LIKED</h1>
        ) : (
          <button onClick={e => handleUpVote()}>LIKE</button>
        )}
      </div>
      <p>{votes}</p>
      <div>
        {userHasVotedDown ? (
          <h1>DISLIKED</h1>
        ) : (
          <button onClick={e => handleDownVote()}>DISLIKE</button>
        )}
      </div>
    </div>
  );
}

export default ArticleVoteButton;
