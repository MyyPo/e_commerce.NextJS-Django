import Link from "next/dist/client/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Icon from "../../public/Icon.svg";
import Bell from "../../public/bell.svg";
import Cart from "../../public/cart.svg";
import User from "../../public/user.svg";
import { SearchBar } from "./SearchBar";

export default function Header() {
  const { data: session, status } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const [notification, setNotification] = useState(false);

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between w-full text-gray-600 bg-gray-100 shadow-lg h-14">
      <div className="items-center justify-between py-auto">
        <Link href="/">
          <a className="flex flex-row text-gray-600 pl-7 align-center py-auto hover:text-black focus:text-black fill-gray-600 hover:fill-black">
            <Icon className="my-auto w-9 h-9" alt="" />
            <p className="pl-3 my-auto">Home</p>
          </a>
        </Link>
      </div>
      <SearchBar className="items-center justify-between py-auto" />
      <div className="flex flex-row w-auto h-auto pr-16">
        <div className="p-4 my-auto">
          <Cart
            className="w-6 h-6 stroke-gray-600 hover:stroke-black"
            alt="Shopping cart"
          />
        </div>
        <button
          onClick={() => (dropdown ? setDropdown(false) : setDropdown(true))}
          onMouseLeave={() => setDropdown(false)}
          className="relative flex justify-center w-auto h-auto p-4 my-auto"
        >
          <Bell
            className={`w-6 h-6 ${
              notification
                ? "fill-amber-400 stroke-gray-600"
                : "stroke-gray-600 hover:stroke-black"
            }`}
            alt="Bell icon"
          />
          <div className={`absolute ${notification ? "" : "hidden"}`}>
            <span className="absolute w-3 h-3 bg-red-800 rounded-full opacity-75 animate-ping "></span>
            <span className="absolute w-3 h-3 bg-red-800 rounded-full "></span>
          </div>
          <div className={` w-64 ${dropdown ? "absolute" : "hidden"}`}>
            <div className="grid grid-flow-row mt-12 border border-gray-600 rounded-lg ">
              <a className="flex rounded-t-lg hover:bg-black" href="#">
                Link 1
              </a>
              <a className="flex hover:bg-black" href="#">
                Link 2
              </a>
              <a className="flex rounded-b-lg hover:bg-black" href="#">
                Link 3
              </a>
            </div>
          </div>
        </button>

        <div
          className={` ${
            session ? "hidden" : "p-4 my-auto hover:text-black focus:text-black"
          }`}
        >
          <Link href="/login">Login</Link>
        </div>
        <div className="p-4 my-auto">
          <User className="w-6 h-6 stroke-gray-600 hover:stroke-black "></User>
        </div>
      </div>
    </div>
  );
}
