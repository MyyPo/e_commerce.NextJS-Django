import React from "react";

function SkeletonProductCard() {
  return (
    <div className="text-center rounded-xl">
      <div className="flex items-center justify-center ">
        <div className="w-5/6 mx-auto bg-gray-700 rounded-lg h-44 animate-pulse" />
      </div>
      <div className="my-2">
        <div className="w-3/4 h-4 mx-auto bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="my-2">
        <div className="w-2/3 h-4 mx-auto bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="my-2">
        <div className="w-2/3 h-4 mx-auto bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export default SkeletonProductCard;
