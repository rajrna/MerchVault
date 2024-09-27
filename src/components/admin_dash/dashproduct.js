import React, { useState } from "react";
import styled from "styled-components";

const DashProduct = () => {
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // State to control edit popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: e.target.productName.value,
      category: e.target.category.value,
      brand: e.target.brand.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      description: e.target.productDescription.value,
      image: imagePreview,
      status: "Pending",
    };

    setProducts([...products, newProduct]);
    e.target.reset();
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const handleDelete = (productName) => {
    const updatedProducts = products.filter(
      (product) => product.name !== productName
    );
    setProducts(updatedProducts);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setImagePreview(product.image); // Set image preview to the current product image
    setShowEditPopup(true); // Open edit popup
  };

  const handleUpdate = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.name === updatedProduct.name ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setShowEditPopup(false); // Close edit popup
    setSelectedProduct(null); // Clear selected product
  };

  return (
    <SectionContainer>
      <h2>Product Section</h2>
      <InfoContainer>
        <Form onSubmit={handleSubmit}>
          <h3> Edit Product Design</h3>
          <FormLayout>
            <LeftColumn>
              <label>Upload Image:</label>
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
              <InputGroup>
                <InputColumn>
                  <label>Product Name:</label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    required
                  />
                </InputColumn>
                <InputColumn>
                  <label>Category:</label>
                  <StyledSelect name="category" required>
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    <option value="tshirt">T-shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="hat">Hat</option>
                    <option value="poster">Poster</option>
                  </StyledSelect>
                </InputColumn>
              </InputGroup>

              <InputGroup>
                <InputColumn>
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    required
                  />
                </InputColumn>
                <InputColumn>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                  />
                </InputColumn>
              </InputGroup>

              <InputGroup>
                <InputColumn>
                  <label>Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    required
                  />
                </InputColumn>
                <InputColumn>
                  <label>Product Description:</label>
                  <textarea
                    name="productDescription"
                    placeholder="Product Description"
                    required
                  />
                </InputColumn>
              </InputGroup>
            </RightColumn>
          </FormLayout>
          <button type="submit">Submit Your Design</button>
        </Form>
        <hr />

        <ProductsSection>
          <h3>Product List</h3>
          <ProductTable>
            <thead>
              <tr>
                <th>Design Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Status</th>
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
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>{product.status}</td>
                    <td>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product.name)}>
                        Delete
                      </button>
                      <button onClick={() => handleViewClick(product)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No products submitted yet.</td>
                </tr>
              )}
            </tbody>
          </ProductTable>
        </ProductsSection>

        {/* Popup window for product details */}
        {showPopup && selectedProduct && (
          <PopupOverlay>
            <PopupContent>
              <h3>Product Details</h3>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <p>
                <strong>Name:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category}
              </p>
              <p>
                <strong>Brand:</strong> {selectedProduct.brand}
              </p>
              <p>
                <strong>Price:</strong> {selectedProduct.price}
              </p>
              <p>
                <strong>Stock:</strong> {selectedProduct.stock}
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <button onClick={handleClosePopup}>X</button>
            </PopupContent>
          </PopupOverlay>
        )}

        {/* Popup window for editing product */}
        {showEditPopup && selectedProduct && (
          <EditPopup
            product={selectedProduct}
            onClose={() => setShowEditPopup(false)}
            onUpdate={handleUpdate}
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
        )}
      </InfoContainer>
    </SectionContainer>
  );
};

// New Edit Popup Component
const EditPopup = ({
  product,
  onClose,
  onUpdate,
  onImageChange,
  imagePreview,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h3>Edit Product Design</h3>
        <Form onSubmit={handleSubmit}>
          <div className="edit-img">
            {" "}
            <input type="file" onChange={onImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>
          <InputGroup>
            <InputColumn>
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </InputColumn>
            <InputColumn>
              <label>Category:</label>
              <StyledSelect
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
                placeholder="Category"
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="tshirt">T-shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="hat">Hat</option>
                <option value="poster">Poster</option>
              </StyledSelect>
            </InputColumn>
          </InputGroup>

          <InputGroup>
            <InputColumn>
              <label>Brand:</label>
              <input
                type="text"
                name="brand"
                value={updatedProduct.brand}
                onChange={handleChange}
                placeholder="Brand"
              />
            </InputColumn>
            <InputColumn>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </InputColumn>
          </InputGroup>

          <InputGroup>
            <InputColumn>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={updatedProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
            </InputColumn>
            <InputColumn>
              <label>Product Description:</label>
              <textarea
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
                placeholder="Product Description"
              />
            </InputColumn>
          </InputGroup>

          <InputGroup>
            <InputColumn>
              <button type="submit">Update Product</button>
              <button type="button" onClick={onClose}>
                {" "}
                Cancel
              </button>
            </InputColumn>
          </InputGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

// ...Styled components...

const SectionContainer = styled.div`
  padding: 5rem 10rem;
  // background-color: white;
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
`;

// Overlay for dimming the background
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  // z-index: 999;
  z-index: 1000;
`;

// Content area for the popup
const ModalContainer = styled.div`
  background: white;
  padding: 4rem;
  border-radius: 10px;
  width: 800px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  height: 600px;
  overflow-y: scroll;

  h3 {
    font-size: 2.8rem;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }

    input[type="file"] {
      padding: 5px;
    }

    button {
      background-color: #007bff;
      widht: 100%;
      color: white;
      border: none;
      border-radius: 30px;
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    button[type="button"] {
      background-color: #dc3545; // Red for cancel button
    }

    button[type="button"]:hover {
      background-color: #c82333; // Darker red for hover effect
    }
  }

  .edit-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    max-width: 50%;
    margin: 10px 0;
  }
`;

// Overlay for the popup
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Popup content styling
const PopupContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  height: 600px;
  overflow-y: scroll;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.6rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 0.8rem 1.6rem;
    background-color: rgb(231, 76, 60);
    border: 1px solid rgb(231, 76, 60);
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    width: 35px; /* Width of the button */
    height: 35px; /* Height of the button */

    &:hover {
      background-color: #fff;

      border: 1px solid rgb(231, 76, 60);
      color: rgb(231, 76, 60);
    }
  }
`;

// Add this styled component to your file
const StyledSelect = styled.select`
  padding: 2rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1.8rem;
  background-color: white;
  color: #333;
  cursor: pointer;
  // width: 71%;

  &:focus {
    border-color: #0056b3;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
  }

  option {
    font-size: 1.8rem;
    color: rgb(117, 117, 117);
    padding: 2rem;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;

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

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  width: 100%;
  gap: 4rem; // Space between input sections
`;

const InputColumn = styled.div`
  flex: 1; // Ensures equal width for each input section
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
  }

  input,
  textarea,
  ${StyledSelect} {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1.4rem;
    background-color: white;
    color: #333;

    &:focus {
      border-color: #0056b3;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
    }
  }
`;

const FormLayout = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex: 1;
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

export default DashProduct;
