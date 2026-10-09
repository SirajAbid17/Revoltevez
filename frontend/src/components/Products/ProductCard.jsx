import React from "react";
import { Link } from "react-router-dom";
import {
  FiZap,
  FiActivity,
  FiBatteryCharging,
  FiChevronRight,
} from "react-icons/fi";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500"
    >
      
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

       
        <div className="absolute top-3 left-3">
          {product.status === "published" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500 text-white text-[9.5px] font-bold uppercase tracking-wider shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 text-white text-[9.5px] font-bold uppercase tracking-wider shadow-md">
              Coming Soon
            </span>
          )}
        </div>

        
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9.5px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.views || 0} views
        </div>

        
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-[9px] uppercase tracking-[0.18em] font-semibold text-white/70 mb-0.5">
            Price
          </p>
          <p className="text-[16px] font-bold">{product.price}</p>
        </div>

        
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-black opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
          <FiChevronRight size={15} />
        </div>
      </div>

     
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-[15px] font-bold text-[#111] tracking-tight leading-tight group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-[11.5px] text-gray-500 italic mt-0.5">
              {product.tagline}
            </p>
          )}
        </div>

       
        <div className="grid grid-cols-3 gap-1.5">
          <MiniSpec
            label="Speed"
            value={product.topSpeed}
            icon={<FiZap size={12} />}
          />
          <MiniSpec
            label="Range"
            value={product.range}
            icon={<FiActivity size={12} />}
          />
          <MiniSpec
            label="Battery"
            value={product.battery}
            icon={<FiBatteryCharging size={12} />}
          />
        </div>
      </div>
    </Link>
  );
}

function MiniSpec({ label, value, icon }) {
  return (
    <div className="px-2 py-2 rounded-lg bg-gray-50 border border-gray-100 text-center">
      <div className="flex items-center justify-center text-gray-500 mb-1">
        {icon}
      </div>
      <p className="text-[8px] uppercase tracking-[0.08em] font-bold text-gray-400 mb-0.5">
        {label}
      </p>
      <p className="text-[9.5px] font-semibold text-gray-800 leading-tight truncate">
        {value || "N/A"}
      </p>
    </div>
  );
}