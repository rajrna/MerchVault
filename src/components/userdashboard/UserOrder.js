import React, { useState } from "react";
import styled from "styled-components";

const UserDashboard = () => {
  // Sample orders data (this would typically come from an API or backend)
  const [orders, setOrders] = useState([
    {
      orderNo: 1,
      product: "Custom T-Shirt",
      quantity: 2,
      price: "$40",
      status: "Shipped",
      date: "2024-09-15",
    },
    {
      orderNo: 2,
      product: "Custom Poster",
      quantity: 1,
      price: "$20",
      status: "Delivered",
      date: "2024-09-10",
    },
    {
      orderNo: 3,
      product: "Custom Hoodie",
      quantity: 3,
      price: "$90",
      status: "Processing",
      date: "2024-09-12",
    },
  ]);

  return (
    <SectionContainer>
      <h2>My Order Information</h2>
      <InfoContainer>
        <OrdersSection>
          <h3>Order Lists</h3>

          {/* Table displaying the orders */}
          <OrdersTable>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderNo}>
                  <td>{order.orderNo}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </OrdersTable>
        </OrdersSection>
      </InfoContainer>
    </SectionContainer>
  );
};

export default UserDashboard;

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

const OrdersSection = styled.section`
  margin-top: 2rem;

  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
`;

const OrdersTable = styled.table`
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
