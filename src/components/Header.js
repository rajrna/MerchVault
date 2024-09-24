import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <AnnouncementBar>
        <p>
          Interested in showcasing your art?{" "}
          <a href="#artist-signup">Join as an artist!</a>
        </p>
      </AnnouncementBar>
      <MainHeader>
        <NavLink to="/" className="logo-link">
          <img src="./images/logo.png" alt="my logo img" className="logo" />
        </NavLink>
        <Nav />
      </MainHeader>
    </>
  );
};

// Small banner announcement
const AnnouncementBar = styled.div`
  background: rgb(34, 32, 42);
  color: white;
  text-align: center;
  padding: 0.8rem 0;

  font-weight: bold;

  p {
    color: #fff;
    margin: 0;
    font-size: 1.5rem;
    a {
      color: #fff;
      text-decoration: underline;
      margin-left: 0.5rem;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #f1f1f1;
    }
  }
`;

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s ease;
  }

  .logo-link:hover {
    transform: scale(1.1);
  }

  .logo {
    height: 3.5rem;
    object-fit: contain;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 1rem;

    .logo {
      height: 3rem;
    }
  }
`;

export default Header;
