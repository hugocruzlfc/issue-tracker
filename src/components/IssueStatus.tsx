import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StatusSelected from "./StatusSelected";
import { Issue } from "../types";

export interface IssueStatusProps {
  status: string;
  issueNumber: string;
}

const IssueStatus: React.FC<IssueStatusProps> = ({ status, issueNumber }) => {
  const queryClient = useQueryClient();
  const setStatus = useMutation(
    (status: string) =>
      fetch(`/api/issues/${issueNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }).then((res) => res.json()),
    {
      onMutate: (newStatus) => {
        const oldStatus = (
          queryClient.getQueryData(["issues", issueNumber]) as Issue
        ).status;
        queryClient.setQueryData(["issues", issueNumber], (data: unknown) => ({
          ...(data as Issue),
          status: newStatus,
        }));

        return function rollback() {
          queryClient.setQueryData(
            ["issues", issueNumber],
            (data: unknown) => ({
              ...(data as Issue),
              status: oldStatus,
            })
          );
        };
      },
      onError: (error, varaibles, rollback) => {
        rollback?.();
      },
      onSettled: () => {
        queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
      },
    }
  );

  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelected
          noEmptyOption
          value={status}
          onChange={(event) => setStatus.mutate(event.target.value)}
        />
      </div>
    </div>
  );
};

export default IssueStatus;
