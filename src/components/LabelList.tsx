import React from "react";
import { useLabelsData } from "../hooks";
import { Label } from "../types";

export interface LabelListProps {
  selected: string[];
  toggleLabel: (label: string) => void;
}

const LabelList: React.FC<LabelListProps> = ({ selected, toggleLabel }) => {
  const labelQuery = useLabelsData();

  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelQuery.data?.map((label: Label) => (
            <li key={label.id}>
              <button
                className={`label ${
                  selected.includes(label.id) ? "selected" : ""
                }${label.color}`}
                onClick={() => toggleLabel(label.id)}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LabelList;
