import React from "react";
import { Issue } from "../types";
import IssueIcon from "./IssueIcon";
import { relativeDate, statusOptions } from "../helpers";
import { useUserData } from "../hooks";

export interface IssueHeaderProps {
  issue: Issue;
}

const IssueHeader: React.FC<IssueHeaderProps> = ({ issue }) => {
  const currentStatus = statusOptions.find(
    (status) => status.id === issue?.status
  );

  const createdUser = useUserData(issue?.createdBy);

  return (
    <header>
      <h2>
        {issue?.title} <span>#{issue?.number}</span>
      </h2>
      <div>
        <span
          className={
            issue?.status === "done" || issue?.status === "cancelled"
              ? "closed"
              : "open"
          }
        >
          <IssueIcon status={issue?.status} />
          {currentStatus?.label}
        </span>
        <span className="created-by">
          {createdUser.isLoading ? "..." : createdUser.data?.name}
        </span>{" "}
        opened this issue {relativeDate(issue?.createdDate)} ·{" "}
        {issue?.comments.length} comments
      </div>
    </header>
  );
};

export default IssueHeader;
