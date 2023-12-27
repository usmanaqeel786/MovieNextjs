import Image from "next/image";
import React from "react";

const EmptyRecord = ({ title, subtext }) => {
  return (
    <div className="flex flex-col space-y-3 mt-10 items-center justify-center self-center">
      <Image
        src={require("../assets/cloud.png")}
        width={100}
        height={100}
        className="opacity-20"
      />
      <p className="text-gray-500 text-lg">{title}</p>
      <p className="text-sm p-3 bg-gray-800 text-gray-400 rounded-lg">
        {subtext}
      </p>
    </div>
  );
};

export default EmptyRecord;
