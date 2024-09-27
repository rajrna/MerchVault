import React, { useState } from "react";
import styled from "styled-components";
import Dashdetails from "./dashdetails";
import DashProfile from "./dashprofile";
import DashProduct from "./dashproduct";
import DashMessage from "./dashmessage";
import DashOrder from "./dashorder";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashdetails");
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);

  return (
    <Container>
      <Sidebar>
      <SidebarItem
          active={activeSection === "dashdetails"}
          onClick={() => setActiveSection("dashdetails")}
        >
          Dashboard
        </SidebarItem>
        <SidebarItem
          active={activeSection === "dashprofile"}
          onClick={() => setActiveSection("dashprofile")}
        >
          Profile
        </SidebarItem>
        <SidebarItem
          active={activeSection === "dashproduct"}
          onClick={() => setActiveSection("dashproduct")}
        >
          Product
        </SidebarItem>
        <SidebarItem
          active={activeSection === "dashorder"}
          onClick={() => setActiveSection("dashorder")}
        >
          Orders
        </SidebarItem>
        <SidebarItem
          active={activeSection === "dashmessage"}
          onClick={() => setActiveSection("dashmessage")}
        >
          Messages
        </SidebarItem>
        
        <SidebarItem>LOG OUT</SidebarItem>
      </Sidebar>

      <MainContent>
        {activeSection === "dashdetails" && <Dashdetails />}
        {activeSection === "dashprofile" && <DashProfile />}
        {activeSection === "dashproduct" && <DashProduct/>}
        {activeSection === "dashorder" && <DashOrder/>}
        {activeSection === "dashmessage" && <DashMessage/>}

        
      </MainContent>
    </Container>
  );
};

export default AdminDashboard;

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
