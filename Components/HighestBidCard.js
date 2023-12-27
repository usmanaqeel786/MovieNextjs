import React from "react";
import { FaSortUp } from "react-icons/fa";

const HighestBidCard = ({ data }) => {
  return data ? (
    <div className="flex p-2 bg-cyan-900 bg-opacity-50 self-start items-center rounded-lg  mb-5">
      <FaSortUp className="mt-2 text-green-500" />
      <h1 className="p-1 font-medium lg:text-lg  text-sm text-amber-100">
        <span className="text-amber-500 text-base">{data?.price} USD</span>
      </h1>
    </div>
  ) : null;
};

export default HighestBidCard;
