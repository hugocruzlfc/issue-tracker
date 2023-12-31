import React from "react";
import { Issue } from "../types";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../hooks";
import Label from "./Label";
import IssueIcon from "./IssueIcon";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWithErrors } from "../helpers";

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

  const queryClient = useQueryClient();

  const assigneeUser = useUserData(assignee!);
  const createdByUser = useUserData(createdBy!);
  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery(["issues", number.toString()], () =>
          fetchWithErrors(`/api/issues/${number}`)
        );
        // queryClient.prefetchQuery(
        //   ["issues", number.toString(), "comments"],
        //   () => fetchWithErrors(`/api/issues/${number}`)
        // );
        queryClient.prefetchInfiniteQuery(
          ["issues", number.toString(), "comments"],
          () => fetchWithErrors(`/api/issues/${number}/comments?page=1`)
        );
      }}
    >
      <IssueIcon
        status={status}
        withStyle={true}
      />
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label
              key={label}
              label={label}
            />
          ))}
        </span>
        <small>
          # {number} opened {relativeDate(createdDate)}
          {createdByUser.isSuccess && `by ${createdByUser.data?.name}`}
        </small>
      </div>
      {assignee && (
        <img
          src={
            (assigneeUser?.isSuccess && assigneeUser.data?.profilePictureUrl) ||
            ""
          }
          alt={`Assigned to ${
            assigneeUser.isSuccess && assigneeUser.data?.name
          }`}
          className="assigned-to "
        />
      )}
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
