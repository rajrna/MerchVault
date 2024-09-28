import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";
import RelatedProducts from "./components/RelatedProducts";
import axios from "axios";

const API = "http://localhost:8080/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const [activeTabs, setActiveTabs] = useState(0);
  const [review, setReview] = useState({
    rating: "",
    comment: "",
  });
  const [reviewsData, setReviewsData] = useState([]);

  const { id } = useParams();

  // State to store the selected size
  const [selectedSize, setSelectedSize] = useState(null);

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
    getSingleProduct(`${API}/${id}`);

    // Fetch reviews for the product
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API}/${id}/get-review`);
        setReviewsData(response.data.reviews);
        console.log("Fetched reviews:", response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  // Example sizes for the size selection (you can replace them with dynamic sizes if available in the API)
  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  // Function to handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Calculate old price based on 20% markup
  const oldPrice = price * 1;
  //Function to switch between tabs
  const handleTabClick = (index) => {
    setActiveTabs(index);
  };

  //Handling of Reviews

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Adjust according to your auth setup

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const reviewData = {
        rating: review.rating,
        comment: review.comment,
      };

      // Send POST request to the backend
      await axios.post(`${API}/${id}/submit-review`, reviewData, config);

      // Clear form after submission
      setReview({ rating: "", comment: "" });

      // Fetch updated reviews
      const response = await axios.get(`${API}/${id}/get-review`);
      setReviewsData(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

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
            <Star stars={stars} reviews={reviewsData.length} />
            <div className="price-info">
              <p className="old-price">
                <FormatPrice price={oldPrice} />
              </p>
              <p className="current-price">{price}</p>
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

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Select Size:</h3>
              <div className="size-options">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="cart-button">
              {stock > 0 && <AddToCart product={singleProduct} />}
            </div>
          </div>
        </div>

        <br />

        {/* tab Section for Product Description and Reviews*/}
        <div className="tab-section">
          <div className="tabs">
            <button
              className={activeTabs === 0 ? "active-tab" : ""}
              onClick={() => handleTabClick(0)}
            >
              Description
            </button>
            <button
              className={activeTabs === 1 ? "active-tab" : ""}
              onClick={() => handleTabClick(1)}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTabs === 0 && (
              <div className="description-content">
                <h2>Product Description</h2>
                <p>{description}</p>
              </div>
            )}
            {activeTabs === 1 && (
              <div className="reviews-content">
                <h2>Customer Reviews</h2>

                {/* List of existing reviews */}
                <div className="existing-reviews">
                  {reviewsData.length > 0 ? (
                    reviewsData.map((review) => (
                      <div key={review._id} className="review">
                        <h3>
                          {review.user && review.user.name
                            ? review.user.name
                            : "Anonymous"}
                        </h3>
                        <div className="stars">
                          {Array(review.rating).fill("⭐")}
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>

                <h3>Leave a Review</h3>

                {/* Review Form */}
                <form className="review-form" onSubmit={handleReviewSubmit}>
                  {/* Remove Name field if user is authenticated */}
                  {/* <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={review.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div> */}

                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      name="rating"
                      value={review.rating}
                      className="select-star"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select rating</option>
                      <option value="1">⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="comment">Your Review</label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows="4"
                      value={review.comment}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <br />
        {/* Related Products Section */}
        <RelatedProducts />

        <br />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: rgb(246, 248, 250);

  .product-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: rgb(246, 248, 250);
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

    h3 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .product-name {
      font-size: 1.4rem;
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

    /* Updated Size Selection Styles */
    .size-selection {
      margin-top: 1.5rem;

      h3 {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #333;
      }

      .size-options {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .size-btn {
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          border: 2px solid #ddd;
          background-color: #f5f5f5;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 500;
          transition: background-color 0.3s, color 0.3s, border-color 0.3s;

          &:hover {
            background-color: #ddd;
          }

          &.active {
            background-color: #333;
            color: #fff;
            border-color: #333;
          }
        }
      }
    }
  }

  /* Styling for the Tab Section */
  .tab-section {
    margin-top: 2rem;
    padding: 0 1rem;

    .tabs {
      display: flex;
      justify-content: flex-start;
      gap: 1.5rem;
      border-bottom: 2px solid #ddd;
      margin-bottom: 1.5rem;

      button {
        padding: 0.8rem 1.5rem;
        background-color: #f8f8f8;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: 500;
        color: #333;
        transition: all 0.3s ease;
        border-radius: 8px 8px 0 0;

        &:hover {
          background-color: #eaeaea;
        }

        &.active-tab {
          background-color: #fff;
          color: #000;
          border-bottom: 3px solid #333;
          font-weight: 600;
        }
      }
    }

    .tab-content {
      padding: 1.5rem;
      background-color: #fafafa;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .description-content {
        padding: 1.5rem;
        background-color: #fff;
        border-radius: 8px;
        line-height: 1.6;
        color: #444;

        h2 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
      }

      /* Reviews specific content */
      /* Styling for the review section */
      .reviews-content {
        padding: 1.5rem;
        background-color: #fff;
        border-radius: 8px;
        line-height: 1.6;
        color: #444;

        .existing-reviews {
          margin-bottom: 2rem;

          .review {
            padding: 1rem;
            border-bottom: 1px solid #ddd;
            margin-bottom: 1rem;
            border: 1px solid #ccc;

            h3 {
              font-size: 1.4rem;
              margin-bottom: 0.5rem;
            }

            .stars {
              font-size: 1.2rem;
              color: #f4b400; /* Star color */
            }

            p {
              font-size: 1rem;
              color: #666;
            }
          }
        }

        h3 {
          margin-bottom: 1rem;
          font-size: 1.6rem;
          color: #555;
        }

        .review-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .form-group {
            display: flex;
            flex-direction: column;

            label {
              font-size: 1rem;
              margin-bottom: 0.5rem;
              color: #333;
            }

            .select-star {
              padding: 0.8rem 1.2rem;
              font-size: 1.1rem;
              border-radius: 30px;

              background: ${({ theme }) => theme.colors.primary};
              cursor: pointer;
              font-size: 1rem;
              transition: border-color 0.3s;
            }
            .select-star :focus {
              border-color: ${({ theme }) => theme.colors.white};
              outline: none;
            }

            input,
            select,
            textarea {
              padding: 1rem;
              width: 50rem;
              font-size: 1rem;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: #fafafa;
              outline: none;
              transition: border-color 0.3s ease;

              &:focus {
                border-color: #333;
              }
            }

            textarea {
              resize: none;
            }
          }

          .submit-btn {
            padding: 0.8rem 1.5rem;
            background-color: #333;
            color: #fff;
            border: 1px solid #333;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            width: 20rem;
            font-weight: 600;
            transition: background-color 0.3s ease;

            &:hover {
              background-color: #fafafa;
              color: #333;
              border: 1px solid #333;
            }
          }
        }
      }
    }
  }

  /* Media queries for responsiveness */
  @media (min-width: 768px) {
    .tab-section .tabs button {
      padding: 1rem 2rem;
      font-size: 1.3rem;
    }

    .tab-section .tab-content {
      padding: 2rem;
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
