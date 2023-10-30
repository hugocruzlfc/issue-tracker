import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Issue } from "../types";

export interface AddIssueFormProps {}

interface IssueFormContent {
  title: string;
  comment: string;
}

const AddIssueForm: React.FC<AddIssueFormProps> = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addIssue = useMutation(
    (issueBody: IssueFormContent) =>
      fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueBody),
      }).then((res) => res.json() as Promise<Issue>),
    {
      onSuccess: (data: Issue) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueryData(["issues", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );

  const handelOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addIssue.isLoading) return;

    addIssue.mutate({
      comment: e.currentTarget.comment.value,
      title: e.currentTarget.titleOfIssue.value,
    });
  };

  return (
    <form onSubmit={handelOnSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="titleOfIssue"
        id="titleOfIssue"
        placeholder="Title"
      />
      <label htmlFor="comment">Comment</label>
      <textarea
        name="comment"
        id="comment"
        placeholder="Comment"
      />
      <button
        type="submit"
        disabled={addIssue.isLoading}
      >
        {addIssue.isLoading ? "Adding..." : "Add Issue"}
      </button>
    </form>
  );
};

export default AddIssueForm;
