import React from "react";
import { FaSpinner } from "react-icons/fa";

export interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return <FaSpinner className="loader"></FaSpinner>;
};

export default Loader;
