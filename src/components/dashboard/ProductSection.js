import React, { useState } from "react";
import styled from "styled-components";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  // Handle form submission and add product to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: e.target.productName.value,
      description: e.target.productDescription.value,
      image: imagePreview, // Use the preview URL
      status: "Pending", // default status
    };
    setProducts([...products, newProduct]);
    e.target.reset();
    setImagePreview(null); // Reset the preview
  };

  // Handle image upload and create preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set the preview URL
    }
  };

  return (
    <SectionContainer>
      <h2>Product Section</h2>

      {/* Display the list of submitted products in a table */}
      <ProductTable>
        <thead>
          <h3>Artist's Designed products</h3>
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
                  <img src={product.image} alt={product.name} />
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
              {" "}
              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                required
              />
            </div>

            <div>
              {" "}
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
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  padding: 5rem 10rem;
  // background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 3rem 0 5rem;
  h3 {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border: 1px solid #d1d1d1;
  }

  th {
    background-color: #f1f1f1;
    font-weight: bold;
    font-size: 1.4rem;
  }
  td {
    font-size: 1.2rem;
  }

  img {
    width: 80px;
    height: auto;
    border-radius: 4px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  h3 {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  button {
    margin-top: 2rem;
    padding: 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 1.8rem;
    font-weight: bold;
    border-radius: 4px;
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
