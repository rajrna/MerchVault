import React, { useState } from "react";
import ArtistInfo from "./ArtistInfo";
import ProductSection from "./ProductSection";
import styled from "styled-components";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("artistInfo");

  return (
    <Container>
      <Sidebar>
        <SidebarItem
          active={activeSection === "artistInfo"}
          onClick={() => setActiveSection("artistInfo")}
        >
          Artist Information
        </SidebarItem>
        <SidebarItem
          active={activeSection === "productSection"}
          onClick={() => setActiveSection("productSection")}
        >
          Product Section
        </SidebarItem>
      </Sidebar>

      <MainContent>
        {activeSection === "artistInfo" && <ArtistInfo />}
        {activeSection === "productSection" && <ProductSection />}
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
  // background-color: #343a40;
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

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
`;
