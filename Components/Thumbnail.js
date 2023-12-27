import Image from "next/image";
import React from "react";
import { ThumbUpIcon } from "@heroicons/react/outline";
import { forwardRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { shimmer, toBase64 } from "@/lib/helpers";

const Thumbnail = forwardRef(({ result }, ref) => {
  const userData = useSelector((state) => state.userr.user);
  const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const handleMovieDetails = (item) =>
    router.push(
      "/movieDetails/" + item + `?number=${userData.number}&&tab=reviews`
    );
  return (
    <div
      ref={ref}
      className=" group cursor-pointer p-2 px-3 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
      onClick={() => {
        handleMovieDetails(result.id);
      }}
    >
      <div className="relative">
        <Image
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}`
          }
          height={1080}
          width={1920}
          className="rounded-md"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(1920, 1080)
          )}`}
          alt="image"
        />
      </div>
      <div className="p-0 pb-4 relative rounded rounded-t-none bg-opacity-0 group-hover:bg-opacity-100 bg-amber-700 items-center justify-center">
        <div className="flex  w-full justify-between ">
          <h2 className="mt-1 p-1 text-sm text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:truncate">
            {result.title || result.original_name}
          </h2>
          <p className="max-w-md rounded rounded-t-none lg:flex hidden absolute mt-8 bg-amber-700 transition ease-linear group-hover:opacity-100 opacity-0 font-light text-[15px] p-1 pt-0">
            {result.overview}
          </p>
          <p className="flex items-center opacity-0 group-hover:opacity-100 mt-0 pr-2 self-center">
            <ThumbUpIcon className="h-5" /> {result.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Thumbnail;
