import { useRouter } from "next/router";
import React from "react";

const MovieTabs = () => {
  const router = useRouter();
  return (
    <div className="p-4 flex space-x-3 ">
      <p
        className={`text-md hover:text-orange-100 p-2 transition select-none cursor-pointer ${
          router.query.tab === "reviews" && "border-b p-2 text-orange-100"
        }`}
        onClick={() => {
          router.query.tab = "reviews";
          router.push(router, undefined, { scroll: false });
        }}
      >
        Reviews
      </p>
      <p
        className={`text-md hover:text-orange-100 transition p-2 select-none cursor-pointer ${
          router.query.tab === "tickets" && "border-b p-2 text-orange-100"
        }`}
        onClick={() => {
          router.query.tab = "tickets";
          router.push(router, undefined, { scroll: false });
        }}
      >
        Tickets
      </p>
      <p
        className={`text-md hover:text-orange-100 transition p-2 select-none cursor-pointer ${
          router.query.tab === "market" && "border-b p-2 text-orange-100"
        }`}
        onClick={() => {
          router.query.tab = "market";
          router.push(router, undefined, { scroll: false });
        }}
      >
        Market
      </p>
    </div>
  );
};

export default MovieTabs;
