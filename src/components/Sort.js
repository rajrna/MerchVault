import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } =
    useFilterContext();
  return (
    <Wrapper>
      {/* 1st column: Grid/List View Toggle */}
      <div className="view-toggle">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}
        >
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setListView}
        >
          <BsList className="icon" />
        </button>
      </div>
      {/* 2nd column: Product Count */}
      <div className="product-count">
        <p>{`${filter_products.length} Product${
          filter_products.length > 1 ? "s" : ""
        } Available`}</p>
      </div>

      {/* 3rd column: Sort Selection */}
      <div className="sort-select">
        <form>
          <label htmlFor="sort" className="visually-hidden">
            Sort Products :
          </label>
          <select
            name="sort"
            id="sort"
            className="sort-select--style"
            onChange={sorting}
          >
            <option value="">Select Sort Option</option>
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
            <option value="a-z">Name (A - Z)</option>
            <option value="z-a">Name (Z - A)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem; /* Adjusted margin for better spacing */

  .view-toggle {
    display: flex;
    gap: 1rem; /* Reduced gap for better alignment */

    .sort-btn {
      padding: 0.6rem 0.8rem;
      border: 1px solid ${({ theme }) => theme.colors.black};
      border-radius: 0.3rem;
      background-color: ${({ theme }) => theme.colors.bg};
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;

      .icon {
        font-size: 1.4rem; /* Adjusted font size */
      }

      &.active {
        background-color: ${({ theme }) => theme.colors.black};
        color: #fff;
      }
    }
  }

  .product-count {
    p {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }
  }

  .sort-select {
    .sort-select--style {
      padding: 0.5rem;
      border: 1px solid ${({ theme }) => theme.colors.black};
      border-radius: 0.3rem;
      background-color: ${({ theme }) => theme.colors.bg};
      cursor: pointer;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column;
    align-items: flex-start;

    .view-toggle {
      gap: 0.5rem; /* Adjusted for mobile */
    }

    .product-count {
      margin-top: 1rem; /* Spacing for mobile view */
    }

    .sort-select {
      margin-top: 1rem; /* Spacing for mobile view */
    }
  }
`;

export default Sort;
