import React, { useState } from "react";
import { useLabelsData } from "../hooks";
import { Issue, Label } from "../types";
import { GoGear } from "react-icons/go";
import { Updater, useMutation, useQueryClient } from "@tanstack/react-query";

export interface IssueLabelsProps {
  labels: string[];
  issueNumber: string;
}

const IssueLabels: React.FC<IssueLabelsProps> = ({ labels, issueNumber }) => {
  const labelsQuery = useLabelsData();
  const [menuOpen, setMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const setLabels = useMutation(
    (labelId: string) => {
      const newLabels = labels.includes(labelId)
        ? labels.filter((label) => label !== labelId)
        : [...labels, labelId];
      return fetch(`/api/issues/${issueNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labels: newLabels }),
      }).then((res) => res.json());
    },
    {
      onMutate: (labelId) => {
        const oldLabels = (
          queryClient.getQueryData(["issues", issueNumber]) as Issue
        ).labels;
        const newLabels = oldLabels.includes(labelId)
          ? oldLabels.filter((label) => label !== labelId)
          : [...oldLabels, labelId];
        queryClient.setQueryData(["issues", issueNumber], (data: unknown) => ({
          ...(data as Issue),
          labels: newLabels,
        }));

        return function rollback() {
          queryClient.setQueryData(["issues", issueNumber], ((data: Issue) => {
            const rollbackLabels = oldLabels.includes(labelId)
              ? [...data.labels, labelId]
              : data?.labels.filter((label: string) => label !== labelId);
            return {
              ...(data as Issue),
              labels: rollbackLabels,
            };
          }) as Updater<Issue | undefined, Issue | undefined>);
        };
      },
      onError: (error, varaibles, rollback) => {
        rollback?.();
      },
      onSettled: () => {
        queryClient.invalidateQueries(["issues", issueNumber], {
          exact: true,
        });
      },
    }
  );
  return (
    <div className="issue-options">
      <div>
        <span>Labels</span>
        {labelsQuery.isLoading
          ? null
          : labels.map((label) => {
              const labelObject = labelsQuery.data?.find(
                (queryLabel: Label) => queryLabel?.id === label
              );
              return (
                <span
                  key={label}
                  className={`label ${labelObject?.color}`}
                >
                  {labelObject?.name}
                </span>
              );
            })}
      </div>
      <GoGear
        onClick={() => !labelsQuery.isLoading && setMenuOpen((open) => !open)}
      />
      {menuOpen && (
        <div className="picker-menu labels">
          {labelsQuery.data?.map((label: Label) => {
            const selected = labels.includes(label?.id);
            return (
              <div
                key={label?.id}
                className={selected ? "selected" : ""}
                onClick={() => {
                  setLabels.mutate(label?.id);
                  setMenuOpen(false);
                }}
              >
                <span
                  className="label-dot"
                  style={{
                    backgroundColor: label?.color,
                  }}
                ></span>
                {label?.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IssueLabels;
