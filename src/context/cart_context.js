import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  const localCartData = localStorage.getItem("thapaCart");
  if (!localCartData) {
    return []; // Return an empty array if no data in localStorage
  }

  try {
    return JSON.parse(localCartData); // Safely parse the data if it exists
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return []; // Return an empty array if parsing fails
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // Increment and decrement
  const setDecrement = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Add the data in local storage
  useEffect(() => {
    // Ensure local storage only gets updated with valid data
    if (state.cart.length > 0) {
      localStorage.setItem("thapaCart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrement,
        setIncrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
