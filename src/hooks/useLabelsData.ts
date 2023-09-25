import { useQuery } from "@tanstack/react-query";

export function useLabelsData() {
  const labelsQuery = useQuery(
    ["labels"],
    ({ signal }) => fetch("/api/labels", { signal }).then((res) => res.json())
    // {
    //   staleTime: 1000 * 60 * 5, // 5 minutes
    // }
  );
  return labelsQuery;
}
