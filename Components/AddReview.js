import IconLabel from "@/Components/IconLabel";
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

const AddReview = ({ userreview, feedReviewinDb, setuserreview }) => {
  return (
    <div className="flex items-center w-full space-x-2 ">
      <textarea
        rows={2}
        className="form-input bg-transparent focus:border-amber-400 hover:border-amber-400 focus:transition font-light w-full border-cyan-800  rounded lg:text-[15px] text-[15px] text-gray-100"
        placeholder="Add a Review"
        value={userreview}
        onChange={(e) => {
          setuserreview(e.target.value);
        }}
      />
      <CheckCircleIcon
        className="h-10 justify-end m-0 self-center items-end content-end cursor-pointer hover:text-orange-500 transition"
        onClick={feedReviewinDb}
      />
    </div>
  );
};

export default AddReview;
