import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";

const DashProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [artistData, setArtistData] = useState({
    name: "John Doe", // Replace with actual artist name
    email: "johndoe@example.com", // Replace with actual email
    password: "johndoe123.", // Replace with actual description
  });

  const [formData, setFormData] = useState(artistData);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setArtistData(formData);
    setIsEditing(false);
  };

  return (
    <SectionContainer>
      <h2>My Personal Information</h2>
      <InfoContainer>
        <div>
          <strong>
            Admin Name: <br />
          </strong>{" "}
          {artistData.name}
        </div>

        
        <div>
          <strong>
            Password:
            <br />
          </strong>{" "}
          {artistData.password}
        </div>
        <EditButton onClick={() => setIsEditing(true)}>
          Edit
          <FaEdit className="p-icon" />
        </EditButton>
      </InfoContainer>

      {isEditing && (
        <Modal>
          <Form onSubmit={handleSubmit}>
            <h3>Edit Info</h3>
            <div className="data-container">
              <div>
                <label>Admin Name: </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
            </div>

            <div>
              <label>Password: </label>
              <PasswordInputContainer>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <ToggleButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </ToggleButton>
              </PasswordInputContainer>
            </div>

            <div className="btn-container">
              <button type="submit" className="update-btn">
                Update
              </button>
              <button onClick={() => setIsEditing(false)} className="close-btn">
                Cancel
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </SectionContainer>
  );
};

export default DashProfile;

const SectionContainer = styled.div`
  padding: 5rem 10rem;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 5rem;
  background: #ddd;
  border-radius: 8px;
  margin-top: 1rem;
  gap: 1rem;
  width: 800px; /* Set a symmetric width */

  h3 {
    font-size: 2.3rem;
    font-weight: bold;
  }

  .data-container,
  .btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; /* Adjusted to space-between for symmetry */
    gap: 2rem;
    width: 100%; /* Full width for data containers */
  }

  div {
    display: flex;
    flex-direction: column;
    width: 100%; /* Set div width to 100% for symmetry */
  }

  label {
    margin: 1rem 0 1.2rem;
    font-size: 1.8rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 2rem;
    margin-bottom: 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }

  textarea {
    height: 100px;
  }

  .update-btn {
    padding: 1.4rem 1rem;
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
    font-size: 1.8rem;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    width: 120px; /* Set a fixed width for symmetry */

    &:hover {
      background-color: #fff;
      border: 1px solid #007bff;
      color: #007bff;
    }
  }

  .close-btn {
    background-color: #c82333;
    margin-top: 1rem;
    color: white;
    border: 1px solid #c82333;
    padding: 1.4rem 1rem;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: bold;
    width: 120px; /* Set a fixed width for symmetry */

    &:hover {
      background-color: #fff;
      color: #c82333;
      border: 1px solid #c82333;
    }
  }
`;

const PasswordInputContainer = styled.div`
  display: flex;
  position: relative;

  input {
    flex: 1;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 22rem;
  top: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;

  &:focus {
    outline: none;
  }

  svg {
    color: #6c757d;
  }
`;

const EditButton = styled.button`
  background-color: #007bff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  width: 100px;
  margin-top: 1rem; /* Add margin for spacing */

  .p-icon {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 10px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;
