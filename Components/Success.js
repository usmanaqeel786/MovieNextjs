import { CheckCircleIcon } from "@heroicons/react/outline";
import React from "react";

const Success = ({ title }) => {
  return (
    <div className="mr-2 rounded items-center flex space-x-1">
      <CheckCircleIcon className="h-6 text-green-900" />
      <p className=" p-2 text-md text-green-900">{title}</p>
    </div>
  );
};

export default Success;
