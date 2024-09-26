import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = ({ myData }) => {
  const { name } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          {/* Hero Text */}
          <div className="hero-section-data">
            <p className="intro-data">Welcome to</p>
            <h1>{name}</h1>
            <p>
              Create products that are uniquely yours. Customize your favorite
              items with personalized graphics and designs. Start exploring and
              make something special today!
            </p>
            <NavLink to="/products">
              <Button>Shop Now</Button>
            </NavLink>
          </div>

          {/* Hero Image */}
          <div className="hero-section-image">
            <figure>
              <img
                src="images/hero_home.png"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  .container {
    max-width: 140rem;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  .hero-section-data {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .intro-data {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555;
    }

    h1 {
      font-size: 3rem;
      font-weight: 700;
      color: #333;
    }

    p {
      font-size: 1.4rem;
      color: #666;
      line-height: 1.6;
    }

    a {
      margin-top: 1rem;
    }
  }

  .hero-section-image {
    display: flex;
    justify-content: center;
    align-items: center;

    figure {
      margin: 0;
      position: relative;
      overflow: hidden;
    }

    .img-style {
      width: 100%;
      height: auto;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 8rem 0;

    .hero-section-data h1 {
      font-size: 2.5rem;
    }

    .hero-section-data p {
      font-size: 1.2rem;
    }
  }
`;

export default HeroSection;
