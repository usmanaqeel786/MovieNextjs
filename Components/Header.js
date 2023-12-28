import Image from "next/image";
import React from "react";
import HeaderItems from "./HeaderItems";
import {
  HomeIcon,
  BadgeCheckIcon,
  CollectionIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
  BackspaceIcon,
  ChevronLeftIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = () => {
  const HULO_LOGO = require("../assets/hulu-white.png");
  const router = useRouter();
  const userData = useSelector((state) => state.userr.user);

  // console.log(router);
  if (!userData)
    return (
      <div className="flex items-center justify-center p-3">
        <Image
          src={require("../assets/hulu-white.png")}
          width={400}
          height={200}
          alt="branding"
          className="items-center justify-center self-center opacity-90"
        />
      </div>
    );
  return (
    <header className="flex flex-col sm:flex-row m-0 mt-4 ml-10 justify-between items-center h-auto">
      <div className="flex flex-grow justify-between sm:max-w-full md:max-w-2xl  px-5">
        {router.pathname !== "/" && (
          <ChevronLeftIcon
            className="h-8 mt-1 absolute left-7 hover:text-gray-100 cursor-pointer mr-10 hover:bg-amber-500 transition rounded-full shadow-xl p-1"
            onClick={() => {
              if (router.query.tab) {
                router.push("/");
              } else router.back();
            }}
          />
        )}
        <HeaderItems
          title="HOME"
          Icon={HomeIcon}
          onClick={() => router.push("/")}
        />
        <HeaderItems
          title="TRENDING"
          Icon={LightningBoltIcon}
          onClick={() => router.push("/?genre=fetchTrending")}
        />
        <HeaderItems
          title="MARKET"
          Icon={OfficeBuildingIcon}
          onClick={() => router.push({ pathname: "/market" })}
        />
        <HeaderItems
          title="MY MOVIES"
          Icon={CollectionIcon}
          onClick={() => router.push({ pathname: `/${userData.number}` })}
        />
        {/* <HeaderItems
          title="SEARCH"
          Icon={SearchIcon}
          onClick={() => router.push({ pathname: "/" })}
        /> */}
        <HeaderItems
          title="ACCOUNT"
          Icon={UserIcon}
          onClick={() => router.push({ pathname: "/profile" })}
        />
      </div>
      <div className="items-center flex justify-center mb-0 self-center">
        <Image
          src={HULO_LOGO}
          width={150}
          height={100}
          className="object-contain"
          alt="image"
        />
      </div>
    </header>
  );
};

export default Header;
