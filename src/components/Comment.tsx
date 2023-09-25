import React from "react";
import { IssueComment } from "../types";
import { useUserData } from "../hooks";
import { relativeDate } from "../helpers";

export interface CommentProps {
  comment: IssueComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const userQuery = useUserData(comment.createdBy);

  if (userQuery.isLoading) {
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="comment">
      <img
        src={userQuery.data?.profilePictureUrl}
        alt={userQuery.data?.name}
      />
      <div>
        <div className="comment-header">
          <span>{userQuery.data?.name}</span> commented{"  "}
          <span>{relativeDate(comment.createdDate)}</span>
        </div>
        <div className="comment-body">
          <p>{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
