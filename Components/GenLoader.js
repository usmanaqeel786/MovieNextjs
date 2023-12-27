import React from "react";

const GenLoader = () => {
  return (
    <div className=" w-full flex-col self-center mt-52 flex justify-center items-center">
      <div className="flex w-full h-fit flex-col self-center items-center justify-center ">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-cyan-900-500 animate-spin">
          <div className="h-9 w-9 rounded-full bg-transparent"></div>
        </div>
      </div>
      <p className="text-gray-500 text-md p-5">Loading</p>
    </div>
  );
};

export default GenLoader;
