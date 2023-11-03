import React from "react";
import { useParams } from "react-router-dom";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import {
  useIssueComments,
  useIssueDetails,
  useScrollToBottomAction,
} from "../hooks";
import { IssueComment } from "../types";
import IssueStatus from "./IssueStatus";
import IssueAssignment from "./IssueAssignment";
import IssueLabels from "./IssueLabels";
import Loader from "./Loader";

export interface IssueDetailsProps {}

const IssueDetails: React.FC<IssueDetailsProps> = () => {
  const { issueNumber } = useParams();
  const issueDetailsQuery = useIssueDetails(issueNumber!);
  const issueCommentsQuery = useIssueComments(+issueNumber!);

  console.log(issueCommentsQuery);

  useScrollToBottomAction(document, issueCommentsQuery.fetchNextPage, 100);

  return (
    <div className="issue-details">
      {issueDetailsQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader issue={issueDetailsQuery.data} />
          <main>
            <section>
              {issueCommentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                // issueCommentsQuery.data?.map((comment: IssueComment) => (
                //   <Comment
                //     key={comment.id}
                //     comment={comment}
                //   />
                // ))
                issueCommentsQuery.data?.pages.map((commentPage) =>
                  commentPage.map((comment: IssueComment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                    />
                  ))
                )
              )}
              {issueCommentsQuery.isFetchingNextPage && <Loader />}
            </section>
            <aside>
              <IssueStatus
                status={issueDetailsQuery.data.status}
                issueNumber={issueDetailsQuery.data.number.toString()}
              />
              <IssueAssignment
                assignee={issueDetailsQuery.data.assignee}
                issueNumber={issueDetailsQuery.data.number.toString()}
              />
              <IssueLabels
                labels={issueDetailsQuery.data.labels}
                issueNumber={issueDetailsQuery.data.number.toString()}
              />
            </aside>
          </main>
        </>
      )}
    </div>
  );
};

export default IssueDetails;
