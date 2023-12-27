import React from "react";

const IconLabel = ({ Icon, title, isClick, onClick }) => {
  return (
    <div
      className={`flex py-1 items-center transition mr-2  rounded-lg ${
        isClick && "hover:bg-gray-700 cursor-pointer"
      } `}
      onClick={isClick && onClick}
    >
      <Icon className="h-6" />
      <p className="px-1 lg:text-md text-sm">{title}</p>
    </div>
  );
};

export default IconLabel;
