import React from "react";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { Status } from "../types";

export interface IssueIconProps {
  status: Status;
  withStyle?: boolean;
}

const IssueIcon: React.FC<IssueIconProps> = ({ status, withStyle = false }) => {
  return (
    <div>
      {status === "done" || status === "cancelled" ? (
        <GoIssueOpened style={withStyle ? { color: "red" } : ""} />
      ) : (
        <GoIssueClosed style={withStyle ? { color: "green" } : ""} />
      )}
    </div>
  );
};

export default IssueIcon;
