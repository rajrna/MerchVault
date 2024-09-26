import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productcontext";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    {" "}
    {/* Add AuthProvider here */}
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
