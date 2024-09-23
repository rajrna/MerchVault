import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const images = [
  {
    url: "https://images.vexels.com/media/users/3/293955/raw/82e1ec239507923872141780f7f2115f-anime-girl-with-katana-t-shirt-design.jpg",
    caption: "Discover Our New Collection",
  },
  {
    url: "https://images.vexels.com/media/users/3/276587/raw/db4ddd93fe349fd448750cc4598fffad-anime-menino-japons-com-design-de-t-shirt-de-auscultadores.jpg",
    caption: "Customize Your Own Shirts",
  },
  {
    url: "https://images.vexels.com/media/users/3/319669/raw/ef3b8603f916dda8b9a000ed34a81542-anime-girl-with-weapon-t-shirt-design.jpg",
    caption: "Upgrade Your Style Today",
  },
  {
    url: "https://images.vexels.com/media/users/3/289180/raw/e720f9f80b6cd41bf1460ec60b459868-design-de-camiseta-de-menino-de-anime-pac-fico.jpg",
    caption: "Let Your Creativity Go Wild",
  },
  {
    url: "https://images.vexels.com/media/users/3/272077/raw/458245d78667bb00ea5346b50c06bf0f-anime-girl-with-ramen-bowl-t-shirt-design.jpg",
    caption: "Look for More",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const length = images.length;

  useEffect(() => {
    let slideInterval;

    if (autoPlay) {
      slideInterval = setInterval(() => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      }, 5000); // Change slide every 5 seconds
    }

    return () => clearInterval(slideInterval);
  }, [current, autoPlay, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <Wrapper>
      <section
        className="slider"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {images.map((image, index) => (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <>
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="image"
                />
                <div className="caption">{image.caption}</div>
              </>
            )}
          </div>
        ))}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* src/ImageSlider.css */

  .slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    overflow: hidden;
    background-color: #000;
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.05);
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .caption {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    padding: 0px 20px;
    border-radius: 5px;
    font-size: 8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.5rem;
    color: #fff;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s ease;
  }

  .left-arrow:hover,
  .right-arrow:hover {
    color: #ff6347; /* Tomato color on hover */
  }

  .left-arrow {
    left: 25px;
  }

  .right-arrow {
    right: 25px;
  }

  .dots {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .dot {
    height: 12px;
    width: 12px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .dot.active,
  .dot:hover {
    background-color: rgb(98 84 243); /* Tomato color for active and hover */
  }

  @media screen and (max-width: 768px) {
    .caption {
      font-size: 4rem;
      bottom: 30px;
    }

    .left-arrow,
    .right-arrow {
      font-size: 2.1rem;
    }

    .left-arrow {
      left: 15px;
    }

    .right-arrow {
      right: 15px;
    }

    .dots {
      bottom: 10px;
    }

    .dot {
      height: 10px;
      width: 10px;
    }
  }
  @media screen and (max-width: 1064px) {
    .caption {
      font-size: 4rem;
      bottom: 30px;
    }

    .left-arrow,
    .right-arrow {
      font-size: 2.5rem;
    }

    .left-arrow {
      left: 15px;
    }

    .right-arrow {
      right: 15px;
    }

    .dots {
      bottom: 10px;
    }

    .dot {
      height: 10px;
      width: 10px;
    }
  }
`;

export default ImageSlider;
