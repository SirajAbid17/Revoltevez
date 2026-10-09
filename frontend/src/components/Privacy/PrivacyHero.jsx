import React from "react";
import { FiShield } from "react-icons/fi";


export default function PrivacyHero() {
  return (
    <div className="relative border-b border-gray-100 overflow-hidden">
     
      <div className="pointer-events-none absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
       
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm">
          <FiShield size={11} className="text-gray-500" />
          <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
            Legal
          </span>
        </div>

        
        <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] font-semibold tracking-[-0.04em] leading-[1.02] text-[#111] mb-3">
          Privacy
          <span className="text-gray-400"> Policy.</span>
        </h1>

       
        <p className="max-w-xl text-[13.5px] sm:text-[14.5px] text-gray-500 leading-relaxed">
          Your privacy matters to us. This policy explains what data we
          collect, how we use it, and how we keep it safe.
        </p>

       
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11.5px] text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Last updated · January 2025
          </span>
          <span className="hidden sm:inline text-gray-300">·</span>
          <span>Revoltevez (Private) Limited</span>
        </div>
      </div>
    </div>
  );
}