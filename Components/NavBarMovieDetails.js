import { useRouter } from "next/router";
import React from "react";

const NavBarMovieDetails = ({ requests, movieId }) => {
  const router = useRouter();

  return (
    <nav className="relative">
      <div className="flex px-10  items-center sm:px-20 text-2xl  whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide py-2">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            key={key}
            onClick={() => {
              router.push(`${movieId}/${title}`);
            }}
            className="last:pr-24 lg:text-lg text-sm cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500"
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute py-0 top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12" />
    </nav>
  );
};

export default NavBarMovieDetails;
