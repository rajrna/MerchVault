import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const DashArtist = () => {
  // Adding sample data to the products state
  const [products, setProducts] = useState([
    {
      image: "https://via.placeholder.com/150",
      name: "Abstract Design",
      brand: "Artist A",
      description: "A modern abstract art piece with bold colors.",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Nature Landscape",
      brand: "Artist B",
      description: "A serene landscape capturing the beauty of nature.",
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Geometric Patterns",
      brand: "Artist C",
      description: "A trendy geometric design with clean lines and shapes.",
    },
  ]);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDelete = (productName) => {
    const updatedProducts = products.filter(
      (product) => product.name !== productName
    );
    setProducts(updatedProducts);
  };

  return (
    <SectionContainer>
      <h2>Artist's Designs</h2>
      <InfoContainer>
        <ProductsSection>
          <h3>Product List</h3>
          <ProductTable>
            <thead>
              <tr>
                <th>Design Image</th>
                <th>Product Name</th>
                <th>Brand (Artist)</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={product.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={product.image} alt={product.name} />
                      </a>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>
                      <div className="action-btns">
                        <button onClick={() => handleDelete(product.name)}>
                          <FaTrash className="p-icon delete-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No products submitted yet.</td>
                </tr>
              )}
            </tbody>
          </ProductTable>
        </ProductsSection>
      </InfoContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  padding: 5rem 10rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  margin-bottom: 10rem;
  height: 600px;
  overflow-y: scroll;
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

  .action-btns,
  .action-btns button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .action-btns button {
    border: none;
    background: #fff;
    cursor: pointer;
  }
  .p-icon {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .delete-icon {
    color: rgb(231, 76, 60);
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export default DashArtist;
