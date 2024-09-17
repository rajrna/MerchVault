import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();

  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <Wrapper>
      <div className="colors">
        <p>Colors:</p>
        <div className="color-options">
          {colors.map((curColor, index) => (
            <button
              key={index}
              style={{ backgroundColor: curColor }}
              className={`color-btn ${color === curColor ? "active" : ""}`}
              onClick={() => setColor(curColor)}
            >
              {color === curColor && <FaCheck className="checkStyle" />}
            </button>
          ))}
        </div>
      </div>
      {/* Amount and Add to Cart */}
      <div className="amount-cart">
        <div className="amount-toggle">
          <button className="amount-btn" onClick={setDecrease}>
            -
          </button>
          <span className="amount-style">{amount}</span>
          <button className="amount-btn" onClick={setIncrease}>
            +
          </button>
        </div>

        <NavLink
          to="/cart"
          onClick={() => addToCart(id, color, amount, product)}
        >
          <Button className="add-to-cart-btn">Add to Cart</Button>
        </NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors {
    margin-bottom: 2rem;
  }

  .colors p {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .color-options {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .color-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    outline: none;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    &.active {
      border: 2px solid #000;
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
    }
  }

  .checkStyle {
    font-size: 1.4rem;
    color: #fff;
  }

  .amount-cart {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .amount-toggle {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.4rem;

    .amount-btn {
      border: none;
      background-color: #f0f0f0;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      font-size: 2rem;
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
      color: #333;
      font-weight: bold;
      text-align: center;
      width: 4rem;
    }
  }

  .add-to-cart-btn {
    width: 100%; /* Make button full-width */
    max-width: 100%; /* Ensure it stretches to the full width */
    text-align: center;
    padding: 1rem 2rem; /* Adjust padding for better appearance */
    font-size: 1.4rem;
    box-sizing: border-box; /* Ensure padding is included in width */
  }

  /* Media query to stack the amount section vertically on smaller screens */
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .amount-cart {
      flex-direction: column;
    }

    .amount-toggle {
      margin: 0 auto;
      flex-direction: row;

      .amount-btn {
        width: 2rem; /* Larger button size for better touch interaction */
        height: 2rem;
        font-size: 2rem;
      }

      .amount-style {
        font-size: 1.5rem;
        margin: 0.5rem 0;
      }
    }
  }

  /* Ensure the amount section is horizontal on larger screens */
  @media (min-width: ${({ theme }) => theme.media.tablet}) {
    .amount-toggle {
      flex-direction: row;
    }

    .amount-btn {
      width: 3rem; /* Default size for larger screens */
      height: 3rem;
      font-size: 2rem;
    }
  }
`;

export default AddToCart;
