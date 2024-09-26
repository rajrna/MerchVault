import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const ListView = ({ products }) => {
  return (
    <Wrapper className="section">
      <div className="container grid">
        {products.map((curElem) => {
          const { id, name, image, price, description } = curElem;
          return (
            <div className="card grid grid-two-column">
              <figure>
                <img src={image} alt={name} />
              </figure>

              <div className="card-data">
                <h3>{name}</h3>
                <p className="product-price">
                  <FormatPrice price={price} />
                </p>
                <p>{description.slice(0, 90)}.....</p>

                <NavLink to={`/singleproduct/${id}`} className="btn-main">
                  <Button className="btn">Add to Cart</Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
    padding: 2rem;
  }

  figure {
    width: 25%;
    display: flex;
    // justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    // &::after {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 0%;
    //   height: 100%;
    //   background-color: rgba(0, 0, 0, 0.5);
    //   transition: all 0.2s linear;
    //   cursor: pointer;
    // }
    &:hover::after {
      width: 100%;
      border-radius: 20px;
    }
    &:hover img {
      transform: scale(1.1);
    }
    img {
      max-width: 90%;
      height: 20rem;
      margin-left: 1.8rem;
      transition: all 0.2s linear;
      border-radius: 8px;
    }
  }

  .card {
    display: flex;
    border: 0.1rem solid rgb(170 170 170 / 40%);
    border-radius: 8px;
    padding: 1rem;
    width: 100%;
    background-color: rgb(234, 238, 241);

    .card-data {
      width: 75%;
      padding: 0 1.5rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .product-price {
      color: #4caf50;
      font-size: 2rem;
    }
  }
`;

export default ListView;
