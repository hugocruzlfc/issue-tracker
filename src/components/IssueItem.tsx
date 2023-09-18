import React from "react";
import { Issue } from "../types";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";

export interface IssueItemProps {
  issue: Issue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  const {
    number,
    title,
    status,
    createdDate,
    createdBy,
    assignee,
    labels,
    comments,
  } = issue;
  return (
    <li>
      <div>
        {status === "done" || status === "cancelled" ? (
          <GoIssueOpened style={{ color: "red" }} />
        ) : (
          <GoIssueClosed style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span
              key={label}
              className={`lablel red`}
            >
              {label}
            </span>
          ))}
        </span>
        <small>
          # {number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee && <div>{assignee}</div>}
      <span className="comment-count">
        {comments.length > 0 && (
          <>
            <GoComment />
            {comments.length}
          </>
        )}
      </span>
    </li>
  );
};

export default IssueItem;
