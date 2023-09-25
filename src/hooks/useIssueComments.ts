import { useQuery } from "@tanstack/react-query";

export function useIssueComments(issueNumber: number) {
  const issueCommentsQuery = useQuery(
    ["issues", issueNumber, "comments"],
    ({ signal }) =>
      fetch(`/api/issues/${issueNumber}/comments`, { signal }).then((res) =>
        res.json()
      )
  );
  return issueCommentsQuery;
}
