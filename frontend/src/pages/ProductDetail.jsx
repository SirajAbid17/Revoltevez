import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiChevronRight, FiPackage } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProductById,
  clearCurrentProduct,
} from "../store/slices/productsSlice";
import BookingModal from "../components/BookingModel/BookingModal";
import Loader from "../components/common/Loader";
import ProductLeftPanel from "../components/Products/ProductLeftPanel";
import ProductRightPanel from "../components/Products/ProductRightPanel";
import ProductTabs from "../components/Products/ProductTabs";


export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    currentProduct: product,
    currentLoading: loading,
    currentError: error,
  } = useAppSelector((s) => s.products);

  const [activeTab, setActiveTab] = useState("overview");
  const [bookingOpen, setBookingOpen] = useState(false);


  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  
  if (loading) {
    return <Loader fullPage size="lg" text="Loading product..." />;
  }

  
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] pt-20 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiPackage size={26} className="text-gray-400" />
          </div>
          <h1 className="text-[22px] font-semibold text-[#111] mb-2">
            Product not found
          </h1>
          <p className="text-[13px] text-gray-500 mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 transition-all"
          >
            <FiArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-2">
    
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-[11.5px] text-gray-500">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <FiChevronRight size={12} />
          <Link to="/products" className="hover:text-black transition-colors">
            Products
          </Link>
          <FiChevronRight size={12} />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
      </div>

    
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductLeftPanel product={product} />

          <ProductRightPanel
            product={product}
            onBookNow={() => setBookingOpen(true)}
          />
        </div>

       
        <ProductTabs
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          product={product}
        />
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}