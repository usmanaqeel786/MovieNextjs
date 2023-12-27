import TicketsCard from "@/Components/TicketsCard";
import React, { useState } from "react";

const Tickets = ({ data }) => {
  // console.log("DATAAA:::", data);
  return (
    <div className="px-5 grid lg:grid-cols-3 grid-cols-1">
      {data.map((item) => (
        <TicketsCard item={item} />
      ))}
    </div>
  );
};

export default Tickets;
