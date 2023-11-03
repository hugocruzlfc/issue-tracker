import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrors } from "../helpers";
import { Issue } from "../types";

export function useIssues(labels: string[], status: string, pageNum: number) {
  const queryClient = useQueryClient();
  return useQuery(
    ["issues", { labels, status, pageNum }],
    async ({ signal }) => {
      const statusString = status ? `status=${status}` : "";
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      const paginationString = pageNum ? `page=${pageNum}` : "";
      const results = await fetchWithErrors(
        `api/issues?${labelsString}${statusString}${paginationString}`,
        {
          signal,
        }
      );
      results.forEach((issue: Issue) => {
        queryClient.setQueryData(["issues", issue.number.toString()], issue);
      });

      return results;
    },
    {
      keepPreviousData: true,
    }
    // {
    //   staleTime: 1000 * 60, // 1 minute
    // }
  );
}
