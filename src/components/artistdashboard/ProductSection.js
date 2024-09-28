import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [imageFile, setImageFile] = useState(null); // State to hold the file for uploading

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        console.error("User is not authenticated.");
        return; // If no token, exit the function
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/artist-design/get-my-designs",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        setProducts(response.data); // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle form submission and add product to the list
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.productName.value);
    formData.append("description", e.target.productDescription.value);
    formData.append("image", e.target.productImage.files[0]); // Append the image file

    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      await axios.post(
        "http://localhost:8080/artist-design/submit-products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
      // Reset the form and clear preview (optional)
      setImagePreview(null);
      e.target.reset();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  // Handle image upload and create preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set the preview URL
      setImageFile(file); // Set the image file to be sent to the server
    }
  };

  return (
    <SectionContainer>
      <h2>Product Section</h2>
      <InfoContainer>
        {/* Display the list of submitted products in a table */}
        <ProductsSection>
          <h3>Artist's Designed Products</h3>
          <ProductTable>
            <thead>
              <tr>
                <th>Design Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {/* Wrap the image in an anchor tag to open it in a new window */}
                      <a
                        href={product.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={product.image} alt={product.name} />
                      </a>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No products submitted yet.</td>
                </tr>
              )}
            </tbody>
          </ProductTable>
        </ProductsSection>

        <Form onSubmit={handleSubmit}>
          <h3>Submit New Design</h3>
          <FormLayout>
            <LeftColumn>
              <label>Upload Image:</label>
              {/* Display the image preview */}
              {imagePreview && (
                <PreviewImage src={imagePreview} alt="Image Preview" />
              )}
              <label className="custom-file-upload">
                Choose File
                <input
                  type="file"
                  name="productImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </LeftColumn>
            <RightColumn>
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  required
                />
              </div>

              <div>
                <label>Product Description:</label>
                <textarea
                  name="productDescription"
                  placeholder="Product Description"
                  required
                />
              </div>
            </RightColumn>
          </FormLayout>
          <button type="submit">Submit Your Design</button>
        </Form>
      </InfoContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  padding: 5rem 10rem;
  // background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
`;

const InfoContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  strong {
    font-weight: bold;
  }
`;

const ProductsSection = styled.section`
  margin: 2rem 0;

  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
`;
const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 80px;
    height: auto;
    border-radius: 4px;
  }

  thead {
    background-color: rgb(13, 59, 102);
    color: white;

    th {
      padding: 1rem;
      font-size: 1.6rem;
      text-align: left;
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background-color: #f2f2f2;
      }
    }

    td {
      padding: 1rem;
      font-size: 1.5rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  button {
    margin-top: 2rem;
    padding: 0.8rem;
    background-color: rgb(13, 59, 102);
    color: white;
    border: none;
    font-size: 1.8rem;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3; // Darker shade on hover
    }
  }
`;

const FormLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 4rem;
  width: 100%;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #009579;
  border-radius: 12px;
  padding: 1rem;
  background-color: #f9f9f9;

  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input[type="file"] {
    margin: 1rem 0;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2; // Make this column wider than the left
  margin-left: 1rem;
  gap: 2rem;
  justify-content: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 1.8rem;
    margin: 1rem 0 1.2rem;
    display: block;
  }

  input,
  textarea {
    padding: 2rem;
    margin-bottom: 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }

  textarea {
    height: 100px;
  }
`;

// Style for the preview image
const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
  border-radius: 8px;
  object-fit: cover;
`;

export default ProductSection;
