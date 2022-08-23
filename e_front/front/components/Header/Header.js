import Link from "next/dist/client/link";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import Icon from "../../public/Icon.svg";
import Bell from "../../public/bell.svg";
import Cart from "../../public/cart.svg";
import User from "../../public/user.svg";
import Glass from "../../public/search.svg";
import { SearchBar } from "./SearchBar";
import Spinner from "../Spinner";
import SignIn from "./SignIn";
import SignInPortal from "./SignInPortal";

export default function Header() {
  const { data: session, status } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const [notification, setNotification] = useState(false);
  const [unspinned, unSpin] = useState(false);
  const [signInWindow, setWindow] = useState(false);
  const [searchWindow, setSearchWindow] = useState(false);

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint = useMediaQuery(768);

  useEffect(() => {
    if (!isBreakpoint) {
      setSearchWindow(false);
    }
  }, [isBreakpoint]);

  useEffect(() => {
    if (status != "loading") {
      const timeout = setTimeout(() => unSpin(true), 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [status]);

  useEffect(() => {
    if (signInWindow || searchWindow) {
      document.getElementById("__next").style.filter =
        "blur(1px) grayscale(100%)";
      document.getElementById("__next").disabled;
    } else {
      document.getElementById("__next").style.filter = "blur(0px)";
    }
  }, [signInWindow, searchWindow]);

  return (
    <div className="relative z-10 flex items-center justify-between h-16 text-gray-600 bg-gray-300 shadow-lg min-w-fit flex-nowrap">
      <div className="items-center justify-between my-auto ">
        <Link href="/">
          <a className="flex flex-row text-gray-600 ml-7 align-center py-auto hover:text-black focus:text-black fill-gray-600 hover:fill-black">
            <Icon className="my-auto w-9 h-9" alt="" />
            <p className="hidden my-auto ml-3 md:block">Home</p>
          </a>
        </Link>
      </div>
      <div className="w-1/4 h-auto mx-4 my-auto">
        {isBreakpoint ? (
          <button
            onClick={() => !searchWindow && setSearchWindow(true)}
            className="justify-center w-24 h-12 my-auto ml-4 text-sm font-medium text-center text-white rounded-full animate-appear hover:text-black focus:text-black bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-black"
          >
            <div className="w-8 h-8 m-auto">
              <Glass className="stroke-white" />
            </div>
            <SignInPortal selector="#SignIn">
              <SearchBar
                searchWindow={searchWindow}
                isBreakpoint={isBreakpoint}
                setSearchWindow={setSearchWindow}
              />
            </SignInPortal>
          </button>
        ) : (
          <SearchBar />
        )}
      </div>
      <div className="flex flex-row justify-between w-auto h-auto md:mr-16">
        <div className="px-4 my-auto ">
          <Cart
            className="w-8 h-8 md:w-6 md:h-6 stroke-gray-600 hover:stroke-black"
            alt="Shopping cart"
          />
        </div>
        <button
          onClick={() => (dropdown ? setDropdown(false) : setDropdown(true))}
          onMouseLeave={() => setDropdown(false)}
          className="relative flex justify-center w-auto h-auto mx-4 my-auto"
        >
          <Bell
            className={`w-8 h-8 md:w-6 md:h-6 ${
              notification
                ? "fill-amber-400 stroke-gray-600"
                : "stroke-gray-600 hover:stroke-black"
            }`}
            alt="Bell icon"
          />
          <div className={`absolute ${notification ? "" : "hidden"}`}>
            <span className="absolute w-3 h-3 bg-red-800 rounded-full opacity-75 animate-ping "></span>
            <span className="absolute w-3 h-3 text-white bg-red-800 rounded-full z-90"></span>
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
        <div className="w-32 h-full ml-4 justify-right">
          <div
            className={`absolute ${
              status != "loading" && "animate-disappear"
            } ${unspinned && "hidden"}`}
          >
            <Spinner className=""></Spinner>
          </div>
          {status == "unauthenticated" && (
            <button
              onClick={() => !signInWindow && setWindow(true)}
              className="w-24 h-12 my-auto text-sm font-medium text-center text-white rounded-full md:rounded-lg md:h-10 animate-appear hover:text-black focus:text-black bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-black"
            >
              Login
              <SignInPortal selector="#SignIn">
                <SignIn signInWindow={signInWindow} setWindow={setWindow} />
              </SignInPortal>
            </button>
          )}

          {session && (
            <div className="absolute">
              <User className="w-8 h-8 my-auto md:w-6 md:h-6 animate-appear stroke-gray-600 hover:stroke-black "></User>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
