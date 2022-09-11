import React, { createContext, useEffect, useReducer } from "react";
import { cartReducer, initialState } from "./CartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initializer = (initialState) => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("localCart"));
      return (localCart ??= initialState);
    }
  };

  const [cart, dispatch] = useReducer(cartReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
