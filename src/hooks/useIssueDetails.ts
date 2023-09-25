import { useQuery } from "@tanstack/react-query";

export function useIssueDetails(issueNumber: string) {
  return useQuery(["issues", issueNumber], async () => {
    const res = await fetch(`/api/issues/${issueNumber}`);
    return await res.json();
  });
}
