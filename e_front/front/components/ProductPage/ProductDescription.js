import React, { useState, useReducer, useEffect, useContext } from "react";
import Image from "next/image";
import fins from "../../public/fins.png";
import mask from "../../public/mask.jpg";
import Cart from "../../public/cart_icon.svg";
import { initializer, cartReducer } from "./CartReducer";
import { CartContext } from "./CartProvider";
import {
  addToCart,
  clearCart,
  removeFromCart,
  decrementItemQuantity,
  initialState,
} from "./CartReducer";

const skeletonPhotos = ["q", "w", "e", "r"];

function ProductDescription({ slug }) {
  const initializer = (initialState) => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("localCart"));
      return (localCart ??= initialState);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [cart, dispatch] = useReducer(cartReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);
  const quantityInt = parseInt(quantity);

  const item = { name: slug, quantity: quantityInt };

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setQuantity(result);
  };

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const decrementItemQuantityHandler = (item) => {
    dispatch(decrementItemQuantity(item));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-full mt-16 text-center bg-gray-200 md:p-4 h-fit md:mt-6 md:w-1/2">
      <div className="p-4 text-2xl">Golden 3D</div>
      <p className="mx-8 mb-4 text-left md:my-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <form
        onSubmit={() => addToCartHandler(item)}
        className="flex items-center justify-center w-full h-20 gap-2 px-2 bg-gray-400 border-2 rounded-md md:gap-6"
      >
        <div className="flex items-center justify-center p-3 font-bold bg-gray-100 rounded-md text-rose-800 h-14">
          <p>Price: 9.99$</p>
        </div>
        <input
          className="text-xl text-center border-2 md:pl-3 w-14 h-14"
          value={quantity}
          name="name"
          required
          min={1}
          onChange={(event) => handleChange(event)}
          type="number"
        ></input>
        <button
          type="submit"
          value="Submit"
          className="flex items-center justify-center w-32 gap-0 p-1 bg-gray-100 border-4 border-gray-300 rounded-lg md:p-0 md:gap-4 md:w-44 h-14"
        >
          <p className="font-semibold">Add to cart</p>
          <Cart className="w-12 h-12 fill-green-700" />
        </button>
      </form>
      <p className="mx-8 my-4 text-xl font-semibold text-center">
        Similiar products:
      </p>
      <div className="w-full p-4 bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center divide-y-4 divide-gray-400 md:divide-y-0 md:flex-row md:divide-x-4 ">
          {skeletonPhotos.length > 1 &&
            skeletonPhotos.map((photo, index) => (
              <div
                key={photo}
                className={`w-2/3 py-2 md:py-0 md:px-1 md:w-1/4 cursor-pointer`}
              >
                <p className="text-lg">Lorem ipsum</p>
                <Image
                  className="rounded-xl"
                  layout="responsive"
                  src={fins}
                  alt="fins"
                ></Image>
                <p className="text-xl">9.99$</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
