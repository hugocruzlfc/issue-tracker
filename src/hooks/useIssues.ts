import { useQuery } from "@tanstack/react-query";
import { fetchWithErrors } from "../helpers";

export function useIssues(labels: string[], status: string) {
  return useQuery(
    ["issues", { labels, status }],
    ({ signal }) => {
      const statusString = status ? `status=${status}` : "";
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      return fetchWithErrors(`api/issues?${labelsString}${statusString}`, {
        signal,
      });
    }
    // {
    //   staleTime: 1000 * 60, // 1 minute
    // }
  );
}
