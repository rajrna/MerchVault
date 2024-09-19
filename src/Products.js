import React from "react";
import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import Sort from "./components/Sort";
import ProductList from "./components/ProductList";

const Products = () => {
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>
        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-product {
    overflow-y: scroll;
    margin: 5px 0;
    width: 100%;
    height: 62rem;
    border-top: 3.5px solid #ddd;
    border-bottom: 3.5px solid #ddd;
  }

  .product-view--sort {
    width: 100%;
  }

  .grid-filter-column {
    display: grid;
    grid-template-columns: 0.2fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    .grid-filter-column {
      grid-template-columns: 0.3fr 1fr;
    }
  }

  @media (max-width: 768px) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }

    .main-product {
      height: 50rem;
    }
  }

  @media (max-width: 576px) {
    .main-product {
      height: auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
