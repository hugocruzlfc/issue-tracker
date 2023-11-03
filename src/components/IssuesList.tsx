import React, { useState } from "react";
import IssueItem from "./IssueItem";
import { Issue } from "../types";
import SearchForm from "./SearchForm";
import { useIssues, useSearchQuery } from "../hooks";
import Loader from "./Loader";

export interface IssuesListProps {
  labels: string[];
  status: string;
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}

const IssuesList: React.FC<IssuesListProps> = ({
  labels,
  status,
  pageNum,
  setPageNum,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const issuesQuery = useIssues(labels, status, pageNum);

  const searchQuery = useSearchQuery(searchValue);

  return (
    <div>
      <SearchForm setSearchValue={setSearchValue} />
      <h2>Issues List {issuesQuery.isFetching ? <Loader /> : null}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error instanceof Error && issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
        <>
          <ul className="issues-list">
            {issuesQuery.data?.map((issue: Issue) => (
              <IssueItem
                key={issue.id}
                issue={issue}
              />
            ))}
          </ul>
          <div className="pagination">
            <button
              onClick={() => {
                if (pageNum - 1 > 0) {
                  setPageNum(pageNum - 1);
                }
              }}
            >
              Previous
            </button>
            <p>
              Page {pageNum} {issuesQuery.isFetching ? "..." : ""}
            </p>
            <button
              disabled={
                issuesQuery.data?.length === 0 || issuesQuery.isPreviousData
              }
              onClick={() => {
                if (
                  issuesQuery.data?.length !== 0 &&
                  !issuesQuery.isPreviousData
                ) {
                  setPageNum(pageNum + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Search Result</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data?.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue: Issue) => (
                  <IssueItem
                    key={issue.id}
                    issue={issue}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default IssuesList;
