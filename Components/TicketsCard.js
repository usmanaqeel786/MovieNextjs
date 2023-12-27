import { ClockIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";

const TicketsCard = ({ item }) => {
  return (
    <div className="select-none bg-gray-800 lg:shadow-md rounded-md m-2">
      <div className="p-2">
        <div className="flex items-center">
          <Image
            src={item.imageUrl}
            width={50}
            height={50}
            className="opacity-90 rounded-full "
          />
          <h1 className="px-2 font-bold text-sm truncate">{item.name}</h1>
        </div>
        <p className=" text-md text-center  text-gray-400 font-light">
          {item.tickets} tickets available
        </p>
        <div className="self-center flex justify-center p-2">
          <ClockIcon className="h-10  text-amber-600" />
        </div>
        <div className="flex flex-col overflow-auto flex-nowrap flex-grow flex-shrink-0">
          {item.slots.map((slot) => (
            <div className="px-2 py-1 m-2 bg-purple-900 bg-opacity-50 rounded-md ">
              <h1 className="text-purple-200 px-1 tex-sm font-light">
                {slot.date}
              </h1>
              <p className="px-1 text-[15px] text-gray-400 font-light">
                {slot.time}
              </p>
              <p className="px-1 text-[13px] text-gray-400 font-light">
                {slot.seats} seats available
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketsCard;
