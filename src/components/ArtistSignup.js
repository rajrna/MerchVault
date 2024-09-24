import React, { useState } from "react";
import styled from "styled-components";

const ArtistSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <SectionWrapper id="artist-signup">
      <ContentWrapper>
        <ImageWrapper>
          <img src="/images/artist.jpg" alt="Artist Sign Up" />
        </ImageWrapper>
        <FormWrapper onSubmit={handleSubmit}>
          <h2>Join as an Artist</h2>
          <p>Showcase your work and become part of our creative community.</p>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Tell us about yourself</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </FormWrapper>
      </ContentWrapper>
    </SectionWrapper>
  );
};

// Styled components for layout and design
const SectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  width: 100%;
  background: rgb(34, 32, 42);
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 2rem;
  align-items: center;
  width: 80%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  width: 60%;
  // background: linear-gradient(135deg, #007bff, #00c6ff);
  padding: 2rem;

  img {
    width: 50rem;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    // box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;

const FormWrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 40%;
  padding: 3rem;
  gap: 1rem;
  border-radius: 16px;

  background: rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;

    font-size: 1rem;
    color: #fff;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 0.5rem;
  height: 120px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.1);
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: #ff9800;
  color: white;
  font-size: 1.7rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
    color: #ff9800;
  }
`;

export default ArtistSignup;
