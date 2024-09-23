import React from "react";
import { useFilterContext } from "../context/filter_context";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, maxPrice, minPrice },
    all_products,
    updateFilterValue,
    clearFilters,
  } = useFilterContext();

  // Function to get unique data for filtering
  const getUniqueData = (data, property) => {
    let newVal = data.map((item) => item[property]);
    if (property === "colors") {
      newVal = newVal.flat();
    }
    return ["all", ...new Set(newVal)];
  };

  const categoryOnlyData = getUniqueData(all_products, "category");
  const companyOnlyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <Wrapper>
      <div className="filter-search">
        <input
          type="text"
          name="text"
          placeholder="Search..."
          value={text}
          onChange={updateFilterValue}
        />
      </div>

      <div className="card">
        <div className="filter-category">
          <h3>Category</h3>
          <div className="filter-category-buttons">
            {categoryOnlyData.map((item, index) => (
              <button
                key={index}
                type="button"
                name="category"
                value={item}
                onClick={updateFilterValue}
                className={category === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr />

      <div className="card">
        <div className="filter-company">
          <h3>Brands</h3>
          <select
            name="company"
            id="company"
            onChange={updateFilterValue}
            className="filter-company--select"
          >
            {companyOnlyData.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr />

      <div className="card">
        <div className="filter-colors">
          <h3>Colors</h3>
          <div className="filter-color-style">
            {colorsData.map((curColor, index) => (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={`color-btn ${color === curColor ? "active" : ""}`}
                onClick={updateFilterValue}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr />

      <div className="card">
        <div className="filter-price">
          <p>
            <span>Price : </span>$0 - <FormatPrice price={price} />
          </p>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={updateFilterValue}
          />
        </div>
      </div>

      <hr />

      <div className="clear-btn-container">
        <div className="filter-clear">
          <Button className="btn" onClick={clearFilters}>
            Clear Filter
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  .card {
    padding: 1.5rem;
    display: flex;
    gap: 5rem;
    flex-direction: column;
    // border: 1px solid ${({ theme }) => theme.colors.border};
    // border-radius: 25px;
    background-color: ${({ theme }) => theme.colors.bg};
  }

  .filter-search input {
    padding: 0.8rem 1rem;
    border-radius: 30px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }

  .filter-category {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      margin-bottom: 0.5rem;
    }

    .filter-category-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    button {
      padding: 0.5rem 2rem;
      border-radius: 30px;
      background-color: ${({ theme }) => theme.colors.backgroundLight};
      border: 1px solid ${({ theme }) => theme.colors.borderLight};
      color: ${({ theme }) => theme.colors.textDark};
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #a1a1a1;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      }

      &.active {
        background-color: #333;
        color: #fff;
        border-color: #333;
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      }
    }
  }
  .filter-company--select {
    padding: 0.8rem 1.2rem;
    font-size: 1.1rem;
    border-radius: 30px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    background: ${({ theme }) => theme.colors.white};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }

  .filter-colors {
    .filter-color-style {
      display: flex;
      gap: 0.8rem;

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
        color: #fff;
        font-size: 1rem;
      }
    }
  }

  .checkStyle {
    font-size: 1.4rem;
  }

  .filter-price {
    input {
      width: 100%;
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
      color: black;
    }
  }
  .filter-price span {
    font-weight: bold;
  }

  .clear-btn-container .filter-clear {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .filter-clear .btn {
    background-color: ${({ theme }) => theme.colors.danger};
    color: #fff;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #fff;
      color: rgb(13, 59, 102);
    }
  }
`;

export default FilterSection;
