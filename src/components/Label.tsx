import React from "react";
import { useLabelsData } from "../hooks";
import { Label as LabelType } from "../types";

export interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  const labelQuery = useLabelsData();

  if (labelQuery.isLoading) {
    return null;
  }

  const labelData = labelQuery.data?.find((l: LabelType) => l.id === label);
  if (!labelData) {
    return null;
  }

  return <span className={`label ${labelData.color}`}>{labelData.name}</span>;
};

export default Label;
