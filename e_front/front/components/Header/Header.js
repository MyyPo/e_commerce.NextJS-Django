import Link from "next/dist/client/link";
import { useState, useEffect, useCallback, useContext } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import fins from "../../public/fins.png";

import Icon from "../../public/Icon.svg";
import User from "../../public/user.svg";
import Glass from "../../public/search.svg";
import { SearchBar } from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";
import Spinner from "../Spinner";
import SignIn from "./SignIn";
import SignInPortal from "./SignInPortal";
import CartButton from "./CartButton";
import MobileCartButton from "./MobileCartButton";
import BellButton from "./BellButton";

export default function Header() {
  const { data: session, status } = useSession();
  const [cartDropdown, setCartDropdown] = useState(false);
  const [mobileCartDropdown, setMobileCartDropdown] = useState(false);
  const [bellDropdown, setBellDropdown] = useState(false);
  const [bellNotification, setBellNotification] = useState(false);
  const [cartNotification, setCartNotification] = useState(true);
  const [unspinned, unSpin] = useState(false);
  const [signInWindow, setWindow] = useState(false);
  const [searchWindow, setSearchWindow] = useState(false);
  const [cart, setCart] = useState([]);

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
  const isBreakpoint = useMediaQuery(767);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("localCart"));
    setCart(cart);
  }, []);

  useEffect(() => {
    if (status != "loading") {
      const timeout = setTimeout(() => unSpin(true), 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [status]);

  useEffect(() => {
    if (signInWindow || searchWindow || mobileCartDropdown) {
      document.getElementById("__next").style.filter =
        "blur(1px) grayscale(100%)";
      document.getElementById("__next").style.pointerEvents = "none";
      document.getElementById("__next").style.overflowY = "hidden";
      document.getElementById("__next").style.height = "100vh";
    } else {
      document.getElementById("__next").style.position = "";
      document.getElementById("__next").style.filter = "blur(0px)";
      document.getElementById("__next").style.pointerEvents = "auto";
      document.getElementById("__next").style.height = "";
    }
  }, [signInWindow, searchWindow, mobileCartDropdown]);

  return (
    <nav className="text-gray-600 shadow-lg bg-gradient-to-l from-gray-200 via-gray-400 to-gray-600">
      <div className="w-full">
        <div className=" md:justify-between">
          <div className="grid grid-flow-col justify-evenly ">
            <div className="flex flex-col items-center justify-between w-20 min-w-full py-4 md:mr-10">
              <Link href="/">
                <a className="relative flex flex-row text-gray-200 group align-center py-auto hover:text-white fill-gray-200 hover:fill-white">
                  <Icon className="w-12 h-12 my-auto md:w-9 md:h-9" alt="" />
                  <div className="absolute transition duration-500 bg-white rounded-full opacity-0 group-hover:opacity-10 md:rounded-xl -inset-1 blur" />
                  <p className="hidden md:my-auto md:ml-3 md:block">Home</p>
                </a>
              </Link>
            </div>
            <div className="items-center w-20 min-w-full my-auto md:w-full">
              {isBreakpoint && (
                <div className="relative group">
                  <div className="absolute transition duration-500 rounded-full bg-sky-300 group-hover:opacity-100 md:rounded-lg opacity-40 -inset-1 blur"></div>
                  <button
                    onClick={() => !searchWindow && setSearchWindow(true)}
                    className="relative items-center justify-center w-20 my-auto text-sm font-medium text-center text-white rounded-full group h-14 animate-appear hover:from-gray-600 hover:to-gray-700 bg-gradient-to-b from-gray-900 to-gray-600"
                  >
                    <div className="w-8 h-8 m-auto">
                      <Glass className="stroke-white" />
                    </div>
                    <SignInPortal selector="#SignIn">
                      <SearchBarMobile
                        searchWindow={searchWindow}
                        isBreakpoint={isBreakpoint}
                        setSearchWindow={setSearchWindow}
                      />
                    </SignInPortal>
                  </button>
                </div>
              )}
              {!isBreakpoint && <SearchBar />}
            </div>
            <div className="flex items-center justify-between w-20 md:gap-9">
              {!isBreakpoint && (
                <CartButton
                  cartNotification={cartNotification}
                  setCartNotification={setCartNotification}
                  cartDropdown={cartDropdown}
                  cart={cart}
                  setCartDropdown={setCartDropdown}
                />
              )}

              <BellButton
                bellNotification={bellNotification}
                cartDropdown={bellDropdown}
                cart={cart}
                setBellDropdown={setBellDropdown}
              />

              <div className="relative flex items-center justify-center w-20 md:justify-start md:mr-12">
                <div
                  className={`absolute ${
                    status != "loading" && "animate-disappear"
                  } ${unspinned && "hidden"}`}
                >
                  <Spinner className=""></Spinner>
                </div>
                {status == "unauthenticated" && (
                  <div className="relative group lg:flex lg:flex-row lg:gap-8">
                    <div className="relative">
                      <button
                        onClick={() => !signInWindow && setWindow(true)}
                        className="relative z-10 w-20 text-sm font-medium text-center text-white rounded-full peer hover:from-gray-600 hover:to-gray-700 h-14 md:rounded-lg md:h-10 animate-appear bg-gradient-to-b from-gray-900 to-gray-600"
                      >
                        Log In
                        <SignInPortal selector="#SignIn">
                          <SignIn
                            signInWindow={signInWindow}
                            setWindow={setWindow}
                          />
                        </SignInPortal>
                      </button>
                      <div className="absolute transition duration-500 rounded-full bg-sky-300 peer-hover:opacity-100 md:rounded-lg opacity-40 -inset-1 blur" />
                    </div>
                    <div className="relative hidden lg:flex">
                      <button
                        onClick={() => !signInWindow && setWindow(true)}
                        className="relative z-10 w-20 text-sm font-medium text-center text-white rounded-full peer hover:from-gray-600 hover:to-gray-700 h-14 md:rounded-lg md:h-10 animate-appear bg-gradient-to-b from-gray-900 to-gray-600"
                      >
                        Sign Up
                        <SignInPortal selector="#SignIn">
                          <SignIn
                            signInWindow={signInWindow}
                            setWindow={setWindow}
                          />
                        </SignInPortal>
                      </button>
                      <div className="absolute transition duration-500 rounded-full bg-sky-300 lg:block peer-hover:opacity-100 md:rounded-lg opacity-40 -inset-1 blur" />
                    </div>
                  </div>
                )}

                {session && (
                  <div className=" md:w-0 md:min-w-0">
                    <Link href={"/profile"}>
                      <a>
                        <User className="hidden my-auto mb-1 md:block md:mb-0 w-14 h-14 md:w-6 md:h-6 animate-appear stroke-gray-600 hover:stroke-black "></User>
                      </a>
                    </Link>
                  </div>
                )}

                {isBreakpoint && (
                  <MobileCartButton
                    cartNotification={cartNotification}
                    setCartNotification={setCartNotification}
                    mobileCartDropdown={mobileCartDropdown}
                    cart={cart}
                    setMobileCartDropdown={setMobileCartDropdown}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
