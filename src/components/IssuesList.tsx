import React from "react";
import { Link } from "react-router-dom";

export interface IssuesListProps {}

const IssuesList: React.FC<IssuesListProps> = () => {
  return (
    <div>
      <h1>Issues List</h1>
      <ul>
        <li>
          <Link to="/issue/1">Issue 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default IssuesList;
