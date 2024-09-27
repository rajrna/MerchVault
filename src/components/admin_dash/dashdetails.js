import React, { useState } from "react";
import styled from "styled-components";

const Dashdetails = ({ users, products }) => {
  const [userList, setUserList] = useState(users || []);

  const handleDeleteUser = (index) => {
    const updatedList = [...userList];
    updatedList.splice(index, 1);
    setUserList(updatedList);
  };

  return (
    <Wrapper>
      <h2>Site Details</h2>
      <div className="total-details-container">
        <div className="total-details">
          <div>
            <div className="dashboardBox">
              <h2>Total Users</h2>
              <h3>30000</h3>
            </div>
          </div>

          <div>
            <div className="dashboardBox">
              <h2>Total Orders</h2>
              <h3>30000</h3>
            </div>
          </div>

          <div>
            <div className="dashboardBox">
              <h2>Total Products</h2>
              <h3>30000</h3>
            </div>
          </div>

          <div>
            <div className="dashboardBox">
              <h2>Total Sales</h2>
              <h3>30000</h3>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <UsersSection>
        <h3>List of User</h3>
        <UserTable>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Artist</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.isArtist ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </UserTable>
      </UsersSection>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 10rem;
  // background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);

  .dashboardBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 220px;
    height: 150px;
    background: rgb(13, 59, 102);
    color: #fff;
    padding: 3rem;
    margin: 1rem;
    border-radius: 8px;
    gap: 2rem;

    h2 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #fff;
    }
    h3 {
      font-size: 2.2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  h2 {
    margin-bottom: 2rem;
  }

  .total-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
  }

  .total-details {
    display: flex;
    justify-content: space-between;
  }

  .user-list {
    // width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
  }

  .user-list table {
    // width: 100%;
    border-collapse: collapse;
  }

  .user-list thead {
    background-color: rgb(13, 59, 102);
    color: white;
  }

  .user-list th,
  .user-list td {
    padding: 1rem;
    font-size: 1.6rem;
    text-align: left;
  }

  .user-list tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
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
const UsersSection = styled.section`
  margin: 2rem 0;

  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
`;

const UserTable = styled.table`
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

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  td {
    padding: 1rem;
    font-size: 1.5rem;
  }

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export default Dashdetails;
