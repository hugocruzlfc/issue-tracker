import { useInfiniteQuery } from "@tanstack/react-query";

export function useIssueComments(issueNumber: number) {
  // const issueCommentsQuery = useQuery(
  //   ["issues", issueNumber, "comments"],
  //   ({ signal }) =>
  //     fetch(`/api/issues/${issueNumber}/comments`, { signal }).then((res) =>
  //       res.json()
  //     )
  // );
  const issueCommentsQuery = useInfiniteQuery(
    ["issues", issueNumber, "comments"],
    ({ signal, pageParam = 1 }) => {
      return fetch(`/api/issues/${issueNumber}/comments?page=${pageParam}`, {
        signal,
      }).then((res) => res.json());
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );
  return issueCommentsQuery;
}
