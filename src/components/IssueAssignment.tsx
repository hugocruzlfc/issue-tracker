import React, { useState } from "react";
import { useUserData } from "../hooks";
import { GoGear } from "react-icons/go";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Issue, User } from "../types";

export interface IssueAssignmentProps {
  assignee: string;
  issueNumber: string;
}

const IssueAssignment: React.FC<IssueAssignmentProps> = ({
  assignee,
  issueNumber,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useUserData(assignee);
  const usersQuery = useQuery(["users"], () =>
    fetch("/api/users").then((res) => res.json())
  );
  const queryClient = useQueryClient();
  const setAssignment = useMutation(
    (assignee: string) =>
      fetch(`/api/issues/${issueNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignee }),
      }).then((res) => res.json()),
    {
      onMutate: (newAssignee) => {
        const oldAssignee = (
          queryClient.getQueryData(["issues", issueNumber]) as Issue
        ).assignee;
        queryClient.setQueryData(["issues", issueNumber], (data: unknown) => ({
          ...(data as Issue),
          assignee: newAssignee,
        }));

        return function rollback() {
          queryClient.setQueryData(
            ["issues", issueNumber],
            (data: unknown) => ({
              ...(data as Issue),
              assignee: oldAssignee,
            })
          );
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
        <span>Assignee</span>
        {user.isSuccess && (
          <div>
            <img
              src={user.data.profilePictureUrl}
              alt={user.data.name}
            />
            {user.data.name}
          </div>
        )}
      </div>
      <GoGear
        onClick={() => !usersQuery.isLoading && setMenuOpen((open) => !open)}
      />
      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data.map((user: User) => (
            <div
              key={user.id}
              onClick={() => {
                setAssignment.mutate(user.id);
                setMenuOpen(false);
              }}
            >
              <img
                src={user.profilePictureUrl}
                alt={user.name}
              />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueAssignment;
