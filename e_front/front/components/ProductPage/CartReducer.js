export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  item,
});

export const decrementItemQuantity = (item) => ({
  type: "DECREMENT_QUANTITY",
  item,
});

export const removeFromCart = (item) => ({
  type: "REMOVE_FROM_CART",
  item,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const initialState = [];

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.find((item) => item.name === action.item.name)
        ? state.map((item) =>
            item.name === action.item.name
              ? {
                  ...item,
                  quantity: item.quantity + action.item.quantity,
                }
              : item
          )
        : [...state, { ...action.item, quantity: action.item.quantity }];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.name !== action.item.name);

    case "DECREMENT_QUANTITY":
      // if quantity is 1 remove from cart, otherwise decrement quantity
      return state.find((item) => item.name === action.item.name)?.quantity ===
        1
        ? state.filter((item) => item.name !== action.item.name)
        : state.map((item) =>
            item.name === action.item.name
              ? {
                  ...item,
                  quantity: item.quantity - action.item.quantity,
                }
              : item
          );
    case "CLEAR_CART":
      return initialState;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
