import React from "react";

export default function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "N/A"}
        className={`w-full px-3 py-2.5 rounded-lg bg-gray-50 border text-[12.5px] outline-none transition-all ${
          error
            ? "border-red-300 focus:border-red-500"
            : "border-gray-200 focus:border-black focus:bg-white"
        }`}
      />
      {error && <p className="text-[10.5px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}