import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";
import { useState } from "react";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleCheckout = async () => {
    try {
      // Make the POST request to your API to create a new order
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      const response = await axios.post(
        "http://localhost:8080/orders/place-order", // Update with your actual backend endpoint
        {
          delivery_address: deliveryAddress, // deliveryAddress should be a simple string
          totalAmount: total_price + shipping_fee, // Total amount including shipping
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in headers
          },
        }
      );

      // If successful, clear the cart and show a success message
      if (response.status === 201) {
        clearCart();
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order.");
    }
  };

  if (cart.length === 0) {
    return (
      <EmptyDiv>
        <h3>No Cart in Item</h3>
      </EmptyDiv>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <h3>Item</h3>
          <h3 className="cart-hide">Price</h3>
          <h3>Quantity</h3>
          <h3 className="cart-hide">Sub-Total</h3>
          <h3>Remove</h3>
        </div>
        <hr />

        <div className="cart-item">
          {cart.map((curElem) => (
            <div key={curElem.id}>
              <CartItem
                name={curElem.name}
                price={curElem.price}
                amount={curElem.amount}
                image={curElem.image}
                color={curElem.color}
              />
              <hr />
            </div>
          ))}
        </div>

        <div className="cart-two-button">
          <NavLink to="/products">
            <Button>Continue Shopping</Button>
          </NavLink>
          <Button className="btn btn-clear" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="order-total--amount">
          <div className="order-total--subdata">
            <h3>Cart Total</h3>
            <hr />
            <div>
              <p>Subtotal:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div>
              <p>Shipping Fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>Order Total:</p>
              <p className="total-price">
                <FormatPrice price={shipping_fee + total_price} />
              </p>
            </div>

            {/* Add an input field for delivery address */}
            <div>
              <label>Delivery Address:</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
                required
              />
            </div>

            <div className="cart-two-button">

              <Button onClick={handleCheckout}>Proceed To CheckOut</Button>

            </div>
          </div>
        </div>
        {showPopup && (
          <PopupOverlay>
            <PopupContent>
              <h2>Enter Delivery Address</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Street:
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    required
                  />
                </label>
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                  />
                </label>
                <div className="popup-buttons">
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={handleClosePopup}>
                    Cancel
                  </Button>
                </div>
              </form>
            </PopupContent>
          </PopupOverlay>
        )}
      </div>
    </Wrapper>
  );
};

// Styled Components for Popup
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;

  h2 {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 1rem;

    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.5rem;
    }
  }

  .popup-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    button {
      width: 45%;
    }
  }
`;
const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 150rem;
    margin: 0 auto;
  }
  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 1.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 3rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 7rem;
      height: rem;

      border-radius: 5px;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      p {
        font-size: 1.2rem;
      }

      .color-style {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
      border: 1px solid #e74c3c;
    }

    .btn-clear:hover,
    btn-clear:active {
      box-shadow: 0 2rem 2rem 0 rgb(202 28 28 / 40%);
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      transform: scale(0.96);
      background-color: rgb(255 255 255);
      color: #e74c3c;
      border: 1px solid #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: rgb(205, 208, 208);
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #e0e0e0;
        transform: scale(1.1);
      }
    }

    .amount-style {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #9a9a9a;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
      border-radius: 25px;
    }
    h3 {
      font-weight: bold;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }
    .total-price {
      font-size: 2.5rem;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
