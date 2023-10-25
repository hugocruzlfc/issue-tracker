import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrors } from "../helpers";
import { Issue } from "../types";

export function useIssues(labels: string[], status: string) {
  const queryClient = useQueryClient();
  return useQuery(
    ["issues", { labels, status }],
    async ({ signal }) => {
      const statusString = status ? `status=${status}` : "";
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      const results = await fetchWithErrors(
        `api/issues?${labelsString}${statusString}`,
        {
          signal,
        }
      );
      results.forEach((issue: Issue) => {
        queryClient.setQueryData(["issues", issue.number.toString()], issue);
      });

      return results;
    }
    // {
    //   staleTime: 1000 * 60, // 1 minute
    // }
  );
}
