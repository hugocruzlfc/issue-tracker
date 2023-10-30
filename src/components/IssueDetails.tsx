import React from "react";
import { useParams } from "react-router-dom";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import { useIssueComments, useIssueDetails } from "../hooks";
import { IssueComment } from "../types";
import IssueStatus from "./IssueStatus";

export interface IssueDetailsProps {}

const IssueDetails: React.FC<IssueDetailsProps> = () => {
  const { issueNumber } = useParams();
  const issueDetailsQuery = useIssueDetails(issueNumber!);
  const issueCommentsQuery = useIssueComments(+issueNumber!);

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
                issueCommentsQuery.data?.map((comment: IssueComment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                  />
                ))
              )}
            </section>
            <aside>
              <IssueStatus
                status={issueDetailsQuery.data.status}
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
