import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageNavigation = ({ title }) => {
  return (
    <Wrapper>
      <div className="navigation-container">
        <NavLink to="/" className="home-link">
          Home
        </NavLink>
        <span className="separator">/</span>
        <NavLink to="/products" className="home-link">
          Products
        </NavLink>
        <span className="separator">/</span>
        <span className="current-page">{title}</span>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  background: #fff;
  padding: 1rem 0;
  // border-bottom: 1px solid #ddd;

  .navigation-container {
    max-width: 1200px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 2rem;
    color: #333;
  }

  .home-link {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  .separator {
    color: #888;
  }

  .current-page {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .navigation-container {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .home-link,
    .separator,
    .current-page {
      font-size: 0.9rem;
    }
  }
`;
export default PageNavigation;
