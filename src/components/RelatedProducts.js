// src/components/RelatedProducts.js
import React, { useState } from "react";
import styled from "styled-components";
import { useProductContext } from "../context/productcontext";
import Product from "./Product"; // Assuming you have a ProductCard component

const RelatedProducts = () => {
  const { isLoading, featureProducts } = useProductContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  const slideWidth = 200; // Width of one slide in pixels
  const totalSlides = featureProducts.length;
  const duplicateProducts = [
    ...featureProducts,
    ...featureProducts,
    ...featureProducts,
  ]; // Duplicate products to create loop effect

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : duplicateProducts.length / 3 - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < duplicateProducts.length / 3 - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <Wrapper>
      <h2>Related Products</h2>
      <SliderContainer>
        <ArrowButton className="left" onClick={handlePrevClick}>
          {"<"}
        </ArrowButton>
        <Slider
          style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
        >
          {duplicateProducts.map((product) => (
            <Slide key={product.id}>
              <Product {...product} />
            </Slide>
          ))}
        </Slider>
        <ArrowButton className="right" onClick={handleNextClick}>
          {">"}
        </ArrowButton>
      </SliderContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 1200px;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const Slide = styled.div`
  min-width: 200px; /* Width of each slide */
  margin: 0 1rem;
`;

const ArrowButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.5rem; /* Slightly larger for better visibility */
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  ${({ className }) => className === "left" && `left: 10px;`}
  ${({ className }) => className === "right" && `right: 10px;`}

  &:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

export default RelatedProducts;
