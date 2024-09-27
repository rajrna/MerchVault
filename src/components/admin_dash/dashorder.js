import React, { useState } from "react";
import styled from "styled-components";

const DashOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      products: [
        { name: "T-shirt", size: "L", quantity: 2 },
        { name: "Hoodie", size: "M", quantity: 1 },
      ],
      price: "$70",
      status: "Shipped",
      address: "Fulbari, Pokhara",
      date: "2024-09-27",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      products: [{ name: "Banner", size: "One Size", quantity: 1 }],
      price: "$35",
      status: "Processing",
      address: "Ranipauwa, Pokhara",
      date: "2024-09-27",
    },
  ]);

  // Function to calculate total quantity of products in an order
  const calculateTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

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
                <th>User</th>
                <th>Email</th>
                <th>Products</th>
                <th>Total Quantity</th> {/* New Total Quantity column */}
                <th>Total Price</th>
                <th>Status</th>
                <th>Address</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>{order.email}</td>
                    <td>
                      <ul>
                        {order.products.map((product, index) => (
                          <li key={index}>
                            {product.name} (Size: {product.size}, Quantity:{" "}
                            {product.quantity})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{calculateTotalQuantity(order.products)}</td>{" "}
                    {/* Display total quantity */}
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                    <td>{order.address}</td>
                    <td>{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </ProductTable>
        </ProductsSection>
      </InfoContainer>
    </SectionContainer>
  );
};

// Styled Components (same as before)
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

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export default DashOrder;
