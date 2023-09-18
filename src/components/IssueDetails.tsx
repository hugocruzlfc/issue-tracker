import React from "react";
import { useParams } from "react-router-dom";

export interface IssueDetailsProps {}

const IssueDetails: React.FC<IssueDetailsProps> = () => {
  const { number } = useParams();
  return <h1>Issue {number}</h1>;
};

export default IssueDetails;
