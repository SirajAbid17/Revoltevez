import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import ClerkSync from "./components/ClerkSync";
import SSOCallback from "./pages/SSOCallback";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import FindStore from "./pages/FindStore";
import Services from "./pages/Services";
import AllStories from "./pages/AllStories"; // ← add
import StoryDetail from "./pages/StoryDetail"; // ← add
export default function App() {
  return (
    <>
      {/* Invisible — syncs Clerk → Redux */}
      <ClerkSync />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/sso-callback" element={<SSOCallback />} />
           <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/products" element={<AllProducts />} /> 
            <Route path="/products/:id" element={<ProductDetail />} /> 
              <Route path="/feedback" element={<Feedback />} /> 
                <Route path="/about" element={<About />} /> 
                <Route path="/find-a-store" element={<FindStore />} />
                <Route path="/services" element={<Services />} />
                  <Route path="/stories" element={<AllStories />} />        {/* ← add */}
      <Route path="/stories/:id" element={<StoryDetail />} />
      </Routes>

      <Footer />
    </>
  );
}