import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import axios from "axios"; // Using axios for API requests

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_price: "",
  shipping_fee: 5000,
  shipping: false,
  delivery_address: {},
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = async (id, color, amount, product) => {
    try {
      const userId = "12345"; // Assuming you have a way to identify the user
      const response = await axios.post("/api/cart/add", {
        userId,
        productId: id,
        color,
        amount,
      });
      dispatch({ type: "ADD_TO_CART", payload: response.data });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const setDecrement = async (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
    // Add API call for decrementing the quantity on MongoDB
  };

  const setIncrement = async (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
    // Add API call for incrementing the quantity on MongoDB
  };

  const removeItem = async (id) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${id}`);
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear", { userId: "12345" });
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart", { userId: "12345" });
        dispatch({ type: "LOAD_CART", payload: response.data });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

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
