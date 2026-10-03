import React from "react";

function SpecPill({ label, value, icon }) {
  return (
    <div className="px-2 py-2 rounded-lg bg-gray-50 border border-gray-100 text-center">
      <div className="flex items-center justify-center text-gray-500 mb-1.5">
        {icon}
      </div>
      <p className="text-[8.5px] uppercase tracking-[0.08em] font-bold text-gray-400 mb-0.5">
        {label}
      </p>
      <p className="text-[10px] font-semibold text-gray-800 leading-tight">
        {value || "N/A"}
      </p>
    </div>
  );
}

export default SpecPill;