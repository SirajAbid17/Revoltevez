import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiHome,
  FiPackage,
  FiBookOpen,
  FiCompass,
} from "react-icons/fi";

export default function NotFound() {
  const navigate = useNavigate();

 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const quickLinks = [
    { to: "/", label: "Home", icon: <FiHome size={15} /> },
    { to: "/products", label: "Products", icon: <FiPackage size={15} /> },
    { to: "/stories", label: "Stories", icon: <FiBookOpen size={15} /> },
    { to: "/find-a-store", label: "Find a Store", icon: <FiCompass size={15} /> },
  ];

  return (
    <section className="min-h-screen w-full bg-[#f7f7f5] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg text-center">
      
        <h1 className="text-[80px] sm:text-[110px] font-bold tracking-[-0.05em] leading-none text-[#111] mb-4">
          404
        </h1>

       
        <h2 className="text-[22px] sm:text-[28px] font-semibold tracking-[-0.03em] text-[#111] mb-3">
          Page not found
        </h2>

       
        <p className="text-[13.5px] text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
          The page you're looking for has been moved, deleted, or never
          existed.
        </p>

     
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-full bg-white border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <FiArrowLeft size={13} />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white text-[12.5px] font-semibold hover:bg-gray-800 transition-all"
          >
            <FiHome size={13} />
            Back to Home
          </Link>
        </div>

        
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">
          Or explore
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="
                group flex flex-col items-center gap-2
                p-3.5 rounded-2xl
                bg-white border border-gray-100
                hover:border-gray-300 hover:shadow-sm
                transition-all duration-300
              "
            >
              <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                {link.icon}
              </div>
              <span className="text-[12px] font-semibold text-[#111]">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}