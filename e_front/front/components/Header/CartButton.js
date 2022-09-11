import React from "react";
import Image from "next/image";
import fins from "../../public/fins.png";
import Cart from "../../public/cart.svg";

function CartButton({
  setCartNotification,
  cartNotification,
  cart,
  cartDropdown,
  setCartDropdown,
}) {
  return (
    <button
      onClick={() =>
        cartDropdown ? setCartDropdown(false) : setCartDropdown(true)
      }
      onBlur={() => setCartDropdown(false)}
      className="flex justify-center my-auto animate-appear md:animate-none"
    >
      <Cart
        className={`w-11 h-11 md:w-6 md:h-6 ${
          cart
            ? "stroke-gray-900"
            : "stroke-gray-600 hover:stroke-white lg:hover:stroke-gray-900"
        }`}
        alt="Bell icon"
      />

      <div className={`absolute ${cart.length >= 1 ? "block" : "hidden"}`}>
        <span className="absolute w-8 h-8 text-2xl leading-7 text-white bg-green-700 rounded-full md:text-base md:leading-none md:w-5 md:h-5 -top-2">
          <p className="my-auto">{cart.length}</p>
        </span>
      </div>

      <div
        className={`w-1/2 z-10 md:w-1/4 mt-10 ${
          cartDropdown ? "absolute" : "hidden"
        }`}
      >
        <div className="z-10 grid justify-center grid-flow-row divide-y-2 rounded-lg">
          {cart ? (
            cart?.map(({ name, quantity }) => (
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
            ))
          ) : (
            <div className="flex items-center justify-center p-6 text-white bg-gray-600 border-2 border-black rounded-lg hover:bg-black">
              <div className="">
                <p className="border-b border-white">
                  No items in the cart yet
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default CartButton;
