import AddReview from "@/Components/AddReview";
import EmptyRecord from "@/Components/EmptyRecord";
import ReviewCard from "@/Components/ReviewCard";
import React, { useState } from "react";

const Reviews = ({ data, userreview, setuserreview, feedReviewinDb }) => {
  return (
    <div className="flex px-3 lg:px-4 w-full flex-col ">
      <AddReview
        userreview={userreview}
        feedReviewinDb={feedReviewinDb}
        setuserreview={setuserreview}
      />
      {data.length === 0 ? (
        <EmptyRecord
          title={"No Reviews Yet"}
          subtext={"Add your first review from section above"}
        />
      ) : (
        data.map((item, index) => <ReviewCard item={item} key={index} />)
      )}
    </div>
  );
};

export default Reviews;
