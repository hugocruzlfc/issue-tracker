import React from "react";
import { useIsFetching } from "@tanstack/react-query";
import Loader from "./Loader";

export interface FetchingIndicatorProps {}

const FetchingIndicator: React.FC<FetchingIndicatorProps> = () => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fetching-indicator">
      <Loader />
    </div>
  );
};

export default FetchingIndicator;
