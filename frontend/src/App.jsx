import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ClerkSync from "./components/ClerkSync";

import Home from "./pages/Home";
import SSOCallback from "./pages/SSOCallback";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import FindStore from "./pages/FindStore";
import Services from "./pages/Services";
import AllStories from "./pages/AllStories";
import StoryDetail from "./pages/StoryDetail";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

export default function App() {
  return (
    <>
      
      <ClerkSync />

      <Header />

      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/sso-callback" element={<SSOCallback />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/stories" element={<AllStories />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-a-store" element={<FindStore />} />
        <Route path="/services" element={<Services />} />
        <Route path="/feedback" element={<Feedback />} />

        
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stories/:id"
          element={
            <ProtectedRoute>
              <StoryDetail />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
<Route path="/privacy" element={<Privacy />} />
      
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}