import React from "react";
import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";
import { Issue } from "../types";

export interface IssuesListProps {}

const IssuesList: React.FC<IssuesListProps> = () => {
  const issueQuery = useQuery(["issues"], () =>
    fetch("api/issues").then((res) => res.json())
  );

  return (
    <div>
      <h2>Issues List</h2>
      {issueQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issueQuery.data?.map((issue: Issue) => (
            <IssueItem
              key={issue.id}
              issue={issue}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default IssuesList;
