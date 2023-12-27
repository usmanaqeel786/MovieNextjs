import { UserCircleIcon } from "@heroicons/react/outline";
import React from "react";

const MarketCard = ({ item }) => {
  return (
    <div className="flex flex-col bg-gray-100 bg-opacity-0 border border-t-0 border-l-0 border-r-0 my-2 p-2 border-gray-700">
      <div className="flex items-center space-x-1">
        <UserCircleIcon className="h-5 -ml-1 text-cyan-700 " />
        <h1 className="text-amber-600 text-[15px]">{item.userName}</h1>
      </div>
      <p className="text-[15px] font-light text-gray-300">{item.description}</p>
      <p className="text-right text-[12px] ml-4 text-gray-500 italic">
        {item.userNumber}
      </p>
      <div className="flex justify-between">
        <p className="text-right text-[16px] text-purple-400 ">
          {item?.price} USD
        </p>
        <p className="text-right text-[12px] text-gray-500 italic">
          {new Date(item.createAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MarketCard;
