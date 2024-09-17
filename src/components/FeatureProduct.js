import { useProductContext } from "../context/productcontext";
import styled from "styled-components";
import Product from "./Product";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const FeatureProduct = () => {
  const { isLoading, featureProducts } = useProductContext();

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="fp-container">
          <div className="fp-header">
            {" "}
            <div className="intro-data">Check Now! </div>
            <div className="common-heading">Our Feature Products</div>
          </div>
          <NavLink to="/products">
            <Button className="viewall-btn">
              View All <FaArrowRight />
            </Button>
          </NavLink>
        </div>

        <div className="grid grid-three-column">
          {featureProducts.map((curElem) => {
            return <Product key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }

  .card {
    background-color: #fff;
    border-radius: 1rem;
    padding: 0 0 0.01rem 0;

    img {
      border-radius: 5px;
    }
    .card-data {
      padding: 0 3rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }

  .fp-container {
    display: flex;
    flex-direction: row;
    height: 7rem;
  }
  .fp-header {
    width: 89%;
  }

  .viewall-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px;
  }
`;

export default FeatureProduct;
