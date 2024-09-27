import React, { useState } from "react";
import styled from "styled-components";

const DashOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "T-shirt",
      quantity: 2,
      price: "$20",
      status: "Shipped",
      street: "Fulbari",
      city: "Pokhara",
      date: "2024-09-27",
    },
    {
      id: 2,
      product: "Banner",
      quantity: 1,
      price: "$35",
      status: "Processing",
      street: "Ranipauwa",
      city: "Pokhara",
      date: "2024-09-27",
    },
  ]);

  return (
    <SectionContainer>
      <h2>Orders</h2>
      <InfoContainer>
        <ProductsSection>
          <h3>List of Orders</h3>
          <ProductTable>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Street</th>
                <th>City</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                    <td>{order.street}</td>
                    <td>{order.city}</td>
                    <td>{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No orders yet.</td>
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

export default DashOrder;
