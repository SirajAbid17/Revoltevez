import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiZap,
  FiActivity,
  FiBatteryCharging,
  FiChevronRight,
  FiPackage,
  FiCheck,
  FiTruck,
  FiShield,
  FiTool,
  FiPhone,
  FiShoppingBag,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProductById,
  clearCurrentProduct,
} from "../store/slices/productsSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    currentProduct: product,
    currentLoading: loading,
    currentError: error,
  } = useAppSelector((s) => s.products);

  const [activeTab, setActiveTab] = useState("overview");

  // ============ FETCH ============
  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  // ============ LOADING ============
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] pt-2">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[13px] text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  // ============ ERROR ============
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

  const specs = [
    { label: "Top Speed", value: product.topSpeed, icon: <FiZap size={18} /> },
    { label: "Range", value: product.range, icon: <FiActivity size={18} /> },
    {
      label: "Battery",
      value: product.battery,
      icon: <FiBatteryCharging size={18} />,
    },
  ];

  const features = [
    {
      icon: <FiTruck size={18} />,
      title: "Free Delivery",
      desc: "On all orders within Pakistan",
    },
    {
      icon: <FiShield size={18} />,
      title: "24-Month Warranty",
      desc: "Battery & motor covered",
    },
    {
      icon: <FiTool size={18} />,
      title: "Free Service",
      desc: "First 3 services on us",
    },
    {
      icon: <FiCheck size={18} />,
      title: "Genuine Parts",
      desc: "100% authentic components",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-2">
      {/* Breadcrumb */}
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

      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: IMAGE */}
          <div>
            <div className="sticky top-24">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-5 left-5">
                  {product.status === "published" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                  {product.views || 0} views
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 p-3 text-center hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-center text-gray-700 mb-1.5">
                      {f.icon}
                    </div>
                    <p className="text-[10.5px] font-semibold text-[#111] leading-tight mb-0.5">
                      {f.title}
                    </p>
                    <p className="text-[9.5px] text-gray-500 leading-tight">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-px bg-black" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                REVOLTEVEZ
              </span>
            </div>

            <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.04em] leading-[0.98] text-[#111] mb-3">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-[15px] text-gray-500 italic mb-6">
                "{product.tagline}"
              </p>
            )}

            <div className="flex items-end gap-3 mb-8">
              <p className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#111] leading-none">
                {product.price}
              </p>
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                inclusive of all taxes
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-8">
              {specs.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-center text-gray-700 mb-2">
                    {s.icon}
                  </div>
                  <p className="text-[9.5px] uppercase tracking-[0.12em] font-bold text-gray-400 mb-1">
                    {s.label}
                  </p>
                  <p className="text-[13px] font-bold text-[#111] leading-tight">
                    {s.value || "N/A"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-[15px] font-semibold text-[#111] mb-3">
                Description
              </h3>
              <p className="text-[13.5px] text-gray-600 leading-relaxed">
                Experience the future of electric mobility with the{" "}
                <strong className="text-[#111]">{product.name}</strong>. Built
                for riders who demand performance, efficiency, and modern
                design. The {product.name} delivers a top speed of{" "}
                <strong className="text-[#111]">
                  {product.topSpeed || "N/A"}
                </strong>{" "}
                and an impressive range of{" "}
                <strong className="text-[#111]">{product.range || "N/A"}</strong>
                , powered by a{" "}
                <strong className="text-[#111]">
                  {product.battery || "N/A"}
                </strong>{" "}
                battery. Perfect for daily commutes, weekend adventures, and
                everything in between.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black text-white text-[13.5px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <FiShoppingBag size={15} />
                Book Now
              </button>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white border-2 border-gray-200 text-[13.5px] font-semibold text-[#111] hover:border-black hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <FiPhone size={15} />
                Contact Us
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[11.5px] text-gray-500">
                <FiCheck size={14} className="text-green-500" />
                Free Home Delivery
              </div>
              <div className="flex items-center gap-2 text-[11.5px] text-gray-500">
                <FiCheck size={14} className="text-green-500" />
                7-Day Return Policy
              </div>
              <div className="flex items-center gap-2 text-[11.5px] text-gray-500">
                <FiCheck size={14} className="text-green-500" />
                EMI Available
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16">
          <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto hide-scrollbar">
            {[
              { id: "overview", label: "Overview" },
              { id: "specs", label: "Specifications" },
              { id: "warranty", label: "Warranty & Service" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-8">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-[15px] font-semibold text-[#111] mb-3">
                    Built for Performance
                  </h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    The {product.name} is engineered with precision and passion.
                    Every component is optimized for maximum efficiency,
                    delivering a smooth, powerful, and reliable ride every time.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-[15px] font-semibold text-[#111] mb-3">
                    Designed for Comfort
                  </h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    Long rides feel effortless with ergonomic seating,
                    responsive handling, and advanced suspension. Built for both
                    city commutes and countryside adventures.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {[
                    { label: "Top Speed", value: product.topSpeed },
                    { label: "Range", value: product.range },
                    { label: "Battery", value: product.battery },
                    { label: "Price", value: product.price },
                    {
                      label: "Status",
                      value:
                        product.status === "published"
                          ? "Available"
                          : "Coming Soon",
                    },
                    { label: "Category", value: "Electric Motorcycle" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
                    >
                      <span className="text-[12.5px] font-semibold text-gray-500 uppercase tracking-wider">
                        {row.label}
                      </span>
                      <span className="text-[13.5px] font-medium text-[#111]">
                        {row.value || "N/A"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <FiShield size={22} />,
                    title: "24-Month Warranty",
                    desc: "Battery and motor fully covered for 24 months from purchase date.",
                  },
                  {
                    icon: <FiTool size={22} />,
                    title: "Free Servicing",
                    desc: "First 3 scheduled services are completely free at any Revoltevez center.",
                  },
                  {
                    icon: <FiPhone size={22} />,
                    title: "24/7 Support",
                    desc: "Reach our support team anytime — we're here to help.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#111] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[12.5px] text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}