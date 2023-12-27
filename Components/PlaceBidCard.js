import {
  CheckCircleIcon,
  PencilIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import React from "react";
import { FaEdit } from "react-icons/fa";

const PlaceBidCard = ({
  description,
  setdescription,
  price,
  setprice,
  feedinMarket,
  myData,
}) => {
  return (
    <div className="flex lg:flex-row flex-col lg:space-x-1  w-full ">
      <div className="flex flex-col w-full lg:w-1/3">
        {myData && <label className="py-2 text-gray-500">Edit bid price</label>}
        <input
          type="number"
          maxLength={3}
          className="form-input bg-transparent mb-2 hover:border-amber-400 focus:border-amber-400 font-light transition border-cyan-800 rounded lg:text-[15px] text-[15px] text-gray-100"
          placeholder="Bid price b/w 0-999 USD"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
      </div>
      <div className="w-full flex flex-col">
        {myData && (
          <label className="py-2 text-gray-500">Edit description for bid</label>
        )}
        <input
          type="text"
          className="form-input bg-transparent mb-2 w-full font-light border-cyan-800 rounded hover:border-amber-400 transition focus:border-amber-400 lg:text-[15px] text-[15px] text-gray-100"
          placeholder="Add short description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
      </div>
      {!myData ? (
        <CheckCircleIcon
          className="h-10  cursor-pointer hover:text-orange-500 transition"
          onClick={feedinMarket}
        />
      ) : (
        <button
          className="self-center items-center mt-8 rounded-md p-3 px-5 flex bg-cyan-700 hover:bg-cyan-900 cursor-pointer hover:text-orange-500 transition"
          onClick={feedinMarket}
        >
          <FaEdit />
        </button>
      )}{" "}
    </div>
  );
};

export default PlaceBidCard;
