import styled from "styled-components";

export const Button = styled.button`
  text-decoration: none;
  max-width: auto;
  background-color: rgb(13, 59, 102);
  color: rgb(255 255 255);
  padding: 1.4rem 2.4rem;
  border: 1px solid rgb(13, 59, 102);
  border-radius: 30px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(98 84 243);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
    background-color: rgb(255 255 255);
    color: rgb(13, 59, 102);
    border: 1px solid rgb(13, 59, 102);
  }

  a {
    text-decoration: none;
    color: rgb(255 255 255);
    font-size: 1.8rem;
  }

  .part3 .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px !important;
    height: 40px !important;
    width: 40px !important;
    border-radius: 50% !important;
    border: 1px solid rgb(0, 0, 0, 1) !important;
    color: #000;
  }

  .part3 .circle svg {
    font-size: 23px;
  }
`;
