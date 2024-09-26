import React, { useState } from "react";
import UserProfile from "./UserProfile";
import UserOrder from "./UserOrder";
import ArtistDashboard from "../artistdashboard/Dashboard";
import styled from "styled-components";
import ArtistInfo from "../artistdashboard/ArtistInfo";
import ProductSection from "../artistdashboard/ProductSection";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("userprofile");
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);

  return (
    <Container>
      <Sidebar>
        <SidebarItem
          active={activeSection === "userprofile"}
          onClick={() => setActiveSection("userprofile")}
        >
          My Information
        </SidebarItem>
        <SidebarItem
          active={activeSection === "orderlist"}
          onClick={() => setActiveSection("orderlist")}
        >
          My Order
        </SidebarItem>
        <SidebarItem
          active={artistDropdownOpen}
          onClick={() => setArtistDropdownOpen(!artistDropdownOpen)}
        >
          Artist
        </SidebarItem>
        {artistDropdownOpen && (
          <Dropdown>
            <DropdownItem
              active={activeSection === "artistInfo"}
              onClick={() => setActiveSection("artistInfo")}
            >
              Artist Info
            </DropdownItem>
            <DropdownItem
              active={activeSection === "productSection"}
              onClick={() => setActiveSection("productSection")}
            >
              Product Section
            </DropdownItem>
          </Dropdown>
        )}
        <SidebarItem>LOG OUT</SidebarItem>
      </Sidebar>

      <MainContent>
        {activeSection === "userprofile" && <UserProfile />}
        {activeSection === "orderlist" && <UserOrder />}
        {activeSection === "artistInfo" && <ArtistInfo section="info" />}
        {activeSection === "productSection" && (
          <ProductSection section="products" />
        )}
      </MainContent>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 2rem;
  display: flex;
  color: #000;
  font-size: 1.8rem;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  padding: 1.2rem 1.8rem;
  margin-bottom: 1rem;
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#495057" : "transparent")};
  border-radius: 4px;

  &:hover {
    background-color: #495057;
    color: white;
  }
`;

const Dropdown = styled.div`
  margin-left: 1.8rem;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.div`
  padding: 1rem 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#6c757d" : "transparent")};
  border-radius: 4px;

  &:hover {
    background-color: #6c757d;
    color: white;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
`;
