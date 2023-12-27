import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const CollectionTable = ({ item }) => {
  const router = useRouter();
  const userName = useSelector((state) => state.userr.user);

  return (
    <div
      className=" group cursor-pointer p-2 px-3 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
      onClick={() => {
        router.push(
          `/movieDetails/${item?.id}?number=${userName.number}&tab=reviews`
        );
      }}
    >
      <div className="relative">
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
          <h2 className="mt-1 p-1 text-sm text-white transition-all truncate duration-100 ease-in-out group-hover:font-bold group-hover:truncate">
            {item?.title}
          </h2>
          <p className="text-gray-400 text-xs px-1 font-light italic">
            {new Date(item?.createAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionTable;
