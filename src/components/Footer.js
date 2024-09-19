import React from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <div className="container grid grid-three-column">
          <div className="footer-about">
            <h3>MerchVault</h3>
            <p>
              At MerchVault, we believe in offering unique and personalized
              merchandise for every occasion. Whether you're looking for custom
              designs or trending styles, we’ve got you covered.
            </p>
          </div>

          <div className="footer-social">
            <h3>Connect With Us</h3>
            <div className="footer-social--icons">
              <div>
                <FaDiscord className="icons" />
              </div>
              <div>
                <FaInstagram className="icons" />
              </div>
              <div>
                <a href="https://www.youtube.com/">
                  <FaYoutube className="icons" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-contact">
            <h3>Reach Us</h3>
            <a href="tel:9814173184">
              <h3>+977 9814173184</h3>
            </a>
          </div>
        </div>

        <div className="footer-bottom--section">
          <hr />
          <div className="container grid grid-two-column">
            <p>@{new Date().getFullYear()} MerchVault. All Rights Reserved</p>
            <div>
              <p>PRIVACY POLICY</p>
              <p>TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  footer {
    padding: 10rem 0 2rem 0;
    background-color: #0d3b66;
    color: #ffffff;

    h3 {
      color: #f0f0f0;
      margin-bottom: 1.5rem;
    }

    p {
      color: #c0c0c0;
    }

    .footer-about {
      p {
        max-width: 400px;
        line-height: 1.8;
        font-size: 1rem;
      }
    }

    .footer-social--icons {
      display: flex;
      gap: 1.5rem;

      div {
        padding: 0.5rem;
        border-radius: 50%;
        background-color: #ffffff33;
        display: flex;
        align-items: center;
        justify-content: center;

        .icons {
          color: #ffffff;
          font-size: 2rem;
          cursor: pointer;
        }

        &:hover {
          background-color: #ffffff66;
        }
      }
    }

    .footer-contact h3 {
      color: #c0c0c0;
      font-size: 1.5rem;
    }

    .footer-bottom--section {
      padding-top: 2rem;

      hr {
        margin-bottom: 1rem;
        border: none;
        height: 1px;
        background-color: #ffffff33;
      }

      .grid {
        display: flex;
        justify-content: space-between;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 768px) {
    footer {
      padding: 6rem 0 2rem 0;

      .footer-about p {
        max-width: 100%;
        text-align: center;
      }

      .footer-social--icons {
        justify-content: center;
      }

      .footer-bottom--section .grid {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
    }
  }
`;

export default Footer;
