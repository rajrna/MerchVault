import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import styled from "styled-components";

const Product = (curElem) => {
  const { id, name, image, price, category } = curElem;
  return (
    <Wrapper>
      <NavLink to={`/singleproduct/${id}`}>
        <div className="product-card">
          <img src={image} alt={name} className="product-image" />

          <div className="product-info">
            <h2 className="product-name">{name}</h2>
            <p className="product-price">{<FormatPrice price={price} />}</p>

            <button className="btn-cart">Add to Cart</button>
          </div>
        </div>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .product-card {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin: 20px;
    padding: 10px;
    background-color: rgb(234, 238, 241);
    border-radius: 20px;
    overflow: hidden;
    border: 0.5px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  /* Zoom effect on image hover */
  .product-card:hover .product-image {
    transform: scale(1.15);
  }

  .product-image {
    width: 100%;
    height: 160px;
    border-radius: 20px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-info {
    padding: 20px;
    text-align: center;
  }

  .product-name {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

  .product-price {
    color: #4caf50;
    font-size: 17px;
    margin: 10px 0;
  }

  /* Add to Cart Button */
  .btn-cart {
    padding: 10px 20px;
    background-color: rgb(13, 59, 102);
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .btn-cart:hover {
    background-color: white;
    color: rgb(13, 59, 102);
    border: 1px solid rgb(13, 59, 102);
  }
`;

export default Product;
