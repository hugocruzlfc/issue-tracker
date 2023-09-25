import { useQuery } from "@tanstack/react-query";

export function useSearchQuery(searchValue: string) {
  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    ({ signal }) =>
      fetch(`/api/search/issues?q=${searchValue}`, { signal }).then((res) =>
        res.json()
      ),
    {
      enabled: searchValue.length > 0,
    }
  );
  return searchQuery;
}
