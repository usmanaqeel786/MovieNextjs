import { useRouter } from "next/router";
import React from "react";

const NavBar = ({ requests }) => {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex px-10 sm:px-20 text-md whitespace-nowrap space-x-10 sm:space-x-10 overflow-x-scroll scrollbar-hide py-2">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            key={key}
            onClick={() =>
              router.query.genre !== key && router.push(`/?genre=${key}`)
            }
            className={`last:pr-24 cursor-pointer transition duration-100 transform ${
              router.query.genre === key && "scale-125 text-amber-500"
            } hover:scale-125 hover:text-white active:text-amber-500`}
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12" />
    </nav>
  );
};

export default NavBar;
