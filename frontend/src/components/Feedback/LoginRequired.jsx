import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginRequired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md text-center">
        
        <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center mx-auto mb-6">
          <FiLock size={30} className="text-gray-400" />
        </div>

      
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-tight text-[#111] mb-3">
          Login required.
        </h1>

        
        <p className="text-[13.5px] text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
          Only verified Revoltevez users can submit feedback. Please login
          with your Google account to share your experience.
        </p>

       
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-black text-white text-[13.5px] font-semibold hover:bg-gray-800 transition-all"
        >
          <FiLogIn size={14} />
          Go to Home & Login
        </button>

      
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100">
          <FcGoogle size={14} />
          <span className="text-[11px] font-medium text-gray-500">
            Verified via Google Auth
          </span>
        </div>
      </div>
    </div>
  );
}