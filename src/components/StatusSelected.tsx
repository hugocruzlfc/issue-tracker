import React from "react";
import { statusOptions } from "../helpers";

export interface StatusSelectedProps {
  value: string;
  noEmptyOption: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusSelected: React.FC<StatusSelectedProps> = ({
  value,
  onChange,
  noEmptyOption = false,
}) => {
  return (
    <select
      className="status-select"
      value={value}
      onChange={onChange}
    >
      {noEmptyOption ? null : (
        <option value="">Select a status to filter</option>
      )}
      {statusOptions.map((status) => (
        <option
          key={status.id}
          value={status.id}
        >
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelected;
