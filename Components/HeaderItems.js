import React from "react";

const HeaderItems = ({ title, Icon, onClick }) => {
  return (
    <div
      className="group flex flex-col cursor-pointer items-center w-12 sm:w-20 hover:text-white transition"
      onClick={onClick}
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest text-xs">
        {title}
      </p>
    </div>
  );
};

export default HeaderItems;
