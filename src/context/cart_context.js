import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import axios from "axios"; // Using axios for API requests
import { useAuthContext } from "./authContext"; // Import useAuthContext

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
  const { token } = useAuthContext(); // Use context for authentication

  // Create axios instance with base URL
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // Replace with your API base URL
    headers: {
      Authorization: `Bearer ${token}`, // Include JWT token in headers
    },
  });

  const addToCart = async (id, color, amount) => {
    try {
      const response = await axiosInstance.post("/cart/add-to-cart", {
        productId: id,
        color,
        quantity: amount,
      });
      dispatch({ type: "ADD_TO_CART", payload: response.data });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const setDecrement = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
    // Add API call for decrementing the quantity on MongoDB if needed
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
    // Add API call for incrementing the quantity on MongoDB if needed
  };

  const removeItem = async (id) => {
    try {
      await axiosInstance.delete(`/cart/remove/${id}`);
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart/delete-cart");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart/get-cart");
        dispatch({ type: "LOAD_CART", payload: response.data });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [token]);

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
