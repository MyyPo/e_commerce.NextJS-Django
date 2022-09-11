import React from "react";
import Bell from "../../public/bell.svg";
import Image from "next/image";
import fins from "../../public/fins.png";

function BellButton({ bellNotification, cart, bellDropdown, setBellDropdown }) {
  return (
    <button
      onClick={() =>
        bellDropdown ? setBellDropdown(false) : setBellDropdown(true)
      }
      onBlur={() => setBellDropdown(false)}
      className="justify-center hidden my-auto md:flex"
    >
      <Bell
        className={`w-8 h-8 md:w-6 md:h-6 ${
          bellNotification
            ? "fill-amber-400 stroke-gray-600"
            : "stroke-gray-600 hover:stroke-white lg:hover:stroke-black"
        }`}
        alt="Bell icon"
      />
      <div className={`absolute ${bellNotification ? "" : "hidden"}`}>
        <span className="absolute w-3 h-3 bg-red-800 rounded-full opacity-75 animate-ping "></span>
        <span className="absolute w-3 h-3 text-white bg-red-800 rounded-full"></span>
      </div>
      <div
        className={`w-1/2 z-10 md:w-1/4 mt-10 ${
          bellDropdown ? "absolute" : "hidden"
        }`}
      >
        <div className="z-10 grid justify-center grid-flow-row divide-y-2 rounded-lg">
          {cart?.map(({ name, quantity }) => (
            <a
              key={name}
              className="grid items-center grid-flow-col grid-cols-3 gap-4 px-4 py-2 text-white bg-gray-600 first:rounded-t-lg last:rounded-b-lg hover:bg-black"
              href="#"
            >
              <Image
                className="rounded-lg"
                src={fins}
                alt="fins"
                width={60}
                height={80}
              />
              <p className="">{name}</p>
              <div className="">
                <p className="border-b border-white">{quantity} items</p>
                <p className="border-b border-white">Total: 29.99$</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </button>
  );
}

export default BellButton;
