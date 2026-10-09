import React from "react";
import {
  FiZap,
  FiActivity,
  FiBatteryCharging,
  FiCheck,
  FiPhone,
  FiShoppingBag,
} from "react-icons/fi";


export default function ProductRightPanel({ product, onBookNow }) {
  const specs = [
    { label: "Top Speed", value: product.topSpeed, icon: <FiZap size={18} /> },
    { label: "Range", value: product.range, icon: <FiActivity size={18} /> },
    {
      label: "Battery",
      value: product.battery,
      icon: <FiBatteryCharging size={18} />,
    },
  ];

  return (
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
        <button
          onClick={onBookNow}
          className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black text-white text-[13.5px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
        >
          <FiShoppingBag size={15} />
          Book Now
        </button>
        <a
          href="https://wa.me/923406500029"
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
  );
}