import { ChartSquareBarIcon, PlusCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MarketPlaceCard = ({ item, index }) => {
  const [bidprice, setbidprice] = useState(0);
  const userData = useSelector((state) => state.userr.user);
  const router = useRouter();
  const handleMovieDetails = (item) =>
    router.push(
      "/movieDetails/" + item + `?number=${userData.number}&&tab=market`
    );
  return (
    <div
      className=" group p-2 px-3 transition cursor-pointer duration-300 ease-in transform sm:hover:scale-105 hover:z-50"
      onClick={() => handleMovieDetails(item.movieId)}
    >
      <div className="relative">
        <div className="absolute z-10 m-2 px-2 bg-gray-900 rounded-full shadow-lg">
          <p className="text-sm font-bold text-amber-500 p-1">
            {item.price} USD
          </p>
        </div>
        <Image
          src={item?.imgUrl}
          height={1080}
          width={1920}
          className="rounded-md rounded-b-none"
          alt="image"
        />
      </div>
      <div className="p-0 pb-4 relative rounded bg-gray-800 border-t-0 rounded-t-none  group-hover:bg-opacity-100 group-hover:bg-cyan-900 items-center justify-center">
        <div className="flex flex-col w-full">
          <div className="flex">
            <h2 className=" p-1 text-base truncate  text-white transition-all duration-100 ease-in-out ">
              {item?.title}
            </h2>
          </div>
          <p className="text-gray-300 text-sm px-1 font-light">
            added by {item.userName}
          </p>
          <p className="text-gray-400 text-xs px-1 font-light ">
            {new Date(item?.createAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
