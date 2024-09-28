import React, { useState } from "react";
import styled from "styled-components";

const DashMessage = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "Great products!" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Can I customize this banner?" },
    
  ]);

  return (
    <SectionContainer>
      <h2>Messages</h2>
      <InfoContainer>
        <ProductsSection>
          <h3>User Messages</h3>
          <ProductTable>
            <thead>
              <tr>
                <th>Message ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.id}</td>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No messages yet.</td>
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
  overflow: scroll;
`;

const InfoContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

export default DashMessage;
