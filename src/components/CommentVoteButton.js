import React from "react";

function CommentVoteButton({
  votedUpOn,
  votedDownOn,
  handleCommentVote,
  votes,
  commentID
}) {
  const userHasVotedUp = votedUpOn.includes(commentID);
  const userHasVotedDown = votedDownOn.includes(commentID);

  //NOTE TO SELF: CLEAN THIS SHIT UP
  //    ||
  //   _||_
  //   \  /
  //    \/

  return (
    <div className="voteContainer">
      <button
        className="likeButton"
        onClick={e => {
          if (userHasVotedUp === false) handleCommentVote(commentID, "up");
        }}
      >
        {userHasVotedUp ? "LIKED" : "LIKE"}
      </button>
      <p>{votes}</p>
      <button
        className="dislikeButton"
        onClick={e => {
          if (userHasVotedDown === false) handleCommentVote(commentID, "down");
        }}
      >
        {userHasVotedDown ? "DISLIKED" : "DISLIKE"}
      </button>
    </div>
  );
}

export default CommentVoteButton;
