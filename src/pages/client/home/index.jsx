import React from "react";
import Footer from "../../../components/client/Footer.jsx";
import Home from "../../../components/client/Home.jsx";
import Navbar from "../../../components/client/Navbar.jsx";
import NavbarMobile from "../../../components/client/NavbarMobile.jsx";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};
export default HomePage;
