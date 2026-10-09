import React from "react";
import { FiShield, FiTool, FiPhone } from "react-icons/fi";


export default function ProductTabs({ product, activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Specifications" },
    { id: "warranty", label: "Warranty & Service" },
  ];

  const specRows = [
    { label: "Top Speed", value: product.topSpeed },
    { label: "Range", value: product.range },
    { label: "Battery", value: product.battery },
    { label: "Price", value: product.price },
    {
      label: "Status",
      value: product.status === "published" ? "Available" : "Coming Soon",
    },
    { label: "Category", value: "Electric Motorcycle" },
  ];

  const warrantyItems = [
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
  ];

  return (
    <div className="mt-16">
     
      <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
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
              {specRows.map((row, i) => (
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
            {warrantyItems.map((item, i) => (
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
  );
}