import React, { useState } from "react";
import styled from "styled-components";

const MyImage = ({ imgs = [{ url: " " }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <Wrapper>
      <div className="main-screen">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div>

      <div className="thumbnail-container">
        {imgs.map((curElm, index) => (
          <figure key={index}>
            <img
              src={curElm.url}
              alt={curElm.filename}
              className="thumbnail-image"
              onClick={() => setMainImage(curElm)}
            />
          </figure>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  .main-screen {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 8px;
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
      transition: transform 0.3s ease-in-out;
    }
  }

  .thumbnail-container {
    display: flex;
    justify-content: start;
    overflow-x: auto; /* Enable horizontal scrolling */
    overflow-y: hidden;
    gap: 1rem;
    padding: 0.5rem;
    background-color: #f5f5f5;
    max-width: 100%;
    white-space: nowrap; /* Keep thumbnails in a row */

    figure {
      margin: 0;
      display: inline-block; /* Ensure thumbnails stay in a row */
    }

    .thumbnail-image {
      width: 100px;
      height: 70px;
      border-radius: 5px;
      box-shadow: ${({ theme }) => theme.colors.shadow};
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .thumbnail-image:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 1024px) {
    .main-screen img {
      width: 90%;
    }

    .thumbnail-container .thumbnail-image {
      width: 90px;
      height: 60px;
    }
  }

  @media (max-width: 768px) {
    .main-screen img {
      width: 85%;
    }

    .thumbnail-container .thumbnail-image {
      width: 80px;
      height: 55px;
    }
  }

  @media (max-width: 600px) {
    .main-screen img {
      width: 80%;
    }

    .thumbnail-container {
      gap: 0.5rem;
      padding: 0.5rem;
      background-color: black;
      overflow-x: auto;
      white-space: nowrap; /* Prevent thumbnails from wrapping */

      .thumbnail-image {
        width: 70px;
        height: 50px;
      }
    }
  }
`;

export default MyImage;
