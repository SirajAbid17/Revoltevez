import React from "react";
import {
  FiCheck,
  FiTruck,
  FiShield,
  FiTool,
} from "react-icons/fi";


export default function ProductLeftPanel({ product }) {
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
  );
}