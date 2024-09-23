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
            {/* <p className="product-price">{<FormatPrice price={price} />}</p> */}
            <p className="product-price">{price}</p>
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
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
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
    border-radius: 8px;
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
`;

export default Product;
