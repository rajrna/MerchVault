import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import FeatureProduct from "./components/FeatureProduct";
import ImageSlider from "./components/ImageSlider";

const Home = () => {
  const data = {
    name: "MerchVault",
  };

  return (
    <>
      <HeroSection myData={data} />;
      <ImageSlider />;
      <FeatureProduct />;
    </>
  );
};

export default Home;
