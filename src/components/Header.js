import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/" className="logo-link">
        <img src="./images/logo.png" alt="my logo img" className="logo" />
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 8rem;
  background-color: ${({ theme }) =>
    theme.colors.bg}; /* Background color of the header */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for a floating effect */
  position: sticky;
  top: 0;
  z-index: 1000; /* Ensure the header is above other content */

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .logo {
    height: 4rem; /* Logo height */
    object-fit: contain; /* Ensure the logo is contained within its box without distortion */
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 1rem; /* Adjust padding for smaller screens */

    .logo {
      height: 3rem; /* Smaller logo height for mobile devices */
    }
  }
`;

export default Header;
