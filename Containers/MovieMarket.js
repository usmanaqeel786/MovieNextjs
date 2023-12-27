import EmptyRecord from "@/Components/EmptyRecord";
import HighestBidCard from "@/Components/HighestBidCard";
import MarketCard from "@/Components/MarketCard";
import PlaceBidCard from "@/Components/PlaceBidCard";
import React, { useState } from "react";

const MovieMarket = ({
  data,
  description,
  setdescription,
  price,
  setprice,
  feedinMarket,
  myData,
}) => {
  return (
    <div className="px-5 flex flex-col">
      <HighestBidCard data={data[0]} />
      <PlaceBidCard
        description={description}
        setdescription={setdescription}
        price={price}
        setprice={setprice}
        feedinMarket={feedinMarket}
        myData={myData}
      />
      {data.length === 0 && (
        <EmptyRecord
          title={"No Bid yet"}
          subtext={"Place your first bid and become part of market place"}
        />
      )}
      {data.map((item, index) => (
        <MarketCard item={item} key={index} />
      ))}
    </div>
  );
};

export default MovieMarket;
