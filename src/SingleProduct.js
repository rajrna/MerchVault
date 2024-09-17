import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();

  const {
    id: alias,
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, [id]);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  // Calculate old price based on 20% markup
  const oldPrice = price * 1.2;

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container>
        <div className="product-wrapper">
          {/* Product Image Gallery */}
          <div className="image-gallery">
            <MyImage imgs={image} />
          </div>

          {/* Product Details */}
          <div className="details">
            <h1 className="product-name">{name}</h1>
            <h3>
              Brand: <span>{company}</span>
            </h3>
            <Star stars={stars} reviews={reviews} />
            <div className="price-info">
              <p className="old-price">
                <FormatPrice price={oldPrice} />
              </p>
              <p className="current-price">
                <FormatPrice price={price} />
              </p>
            </div>
            <p className="product-description">{description}</p>
            <div className="additional-info">
              <h3 className="stock-status">
                Available:{" "}
                <span className={stock > 0 ? "in-stock" : "out-of-stock"}>
                  {stock > 0 ? "In Stock" : "Not Available"}
                </span>
              </h3>
            </div>
            <div className="cart-button">
              {stock > 0 && <AddToCart product={singleProduct} />}
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #fff;

  .product-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    // border-radius: 8px;
    // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  // .image-gallery {
  //   display: flex;
  //   // justify-content: center;
  //   // align-items: center;
  //   // background: #f1f1f1;
  //   // padding: 1rem;
  //   border-radius: 8px;
  // }

  .details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;

    .product-name {
      font-size: 1.6rem;
      font-weight: 700;
      color: #333;
    }

    .price-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .old-price {
        font-size: 1rem;
        color: #888;
        text-decoration: line-through;
      }

      .current-price {
        font-size: 1.4rem;
        color: #e53935;
        font-weight: 700;
      }
    }

    .product-description {
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
    }

    .additional-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 1rem;
      color: #444;

      h3 {
        font-weight: 700;
      }

      span {
        font-size: 1.2rem;
        font-weight: 500;
        text-transform: uppercase;
      }

      .stock-status {
        font-size: 1.2rem;
        font-weight: 700;
      }

      .in-stock {
        color: green;
        font-weight: 600;
      }

      .out-of-stock {
        color: red;
        font-weight: 600;
      }
    }

    .cart-button {
      margin-top: 1.5rem;
    }
  }

  /* Media queries for responsiveness */
  @media (min-width: 768px) {
    .product-wrapper {
      flex-direction: row;
      padding: 2rem;
      gap: 3rem;
    }

    .image-gallery {
      flex: 1;
      padding: 2rem;
    }

    .details {
      flex: 1;
      padding: 2rem;

      .product-name {
        font-size: 2rem;
      }

      .price-info .old-price {
        font-size: 1.2rem;
      }

      .price-info .current-price {
        font-size: 1.6rem;
      }

      .product-description {
        font-size: 1.1rem;
      }

      .additional-info {
        font-size: 1.1rem;
      }

      .additional-info span {
        font-size: 1.4rem;
      }
    }
  }

  @media (min-width: 1024px) {
    .product-wrapper {
      padding: 3rem;
      gap: 4rem;
    }

    .image-gallery {
      padding: 3rem;
    }

    .details {
      padding: 3rem;

      .product-name {
        font-size: 2.4rem;
      }

      .price-info .old-price {
        font-size: 1.4rem;
      }

      .price-info .current-price {
        font-size: 1.8rem;
      }

      .product-description {
        font-size: 1.2rem;
      }

      .additional-info span {
        font-size: 1.6rem;
      }
    }
  }
`;

export default SingleProduct;
