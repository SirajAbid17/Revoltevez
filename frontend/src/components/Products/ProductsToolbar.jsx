import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronDown,
  FiSliders,
  FiCheck,
} from "react-icons/fi";

export default function ProductsToolbar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  priceFilter,
  setPriceFilter,
  statusFilter,
  setStatusFilter,
  activeFiltersCount,
  onClearFilters,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {/* ================= TOOLBAR ================= */}
      <div className="bg-[#f7f7f5] border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-md">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={15}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, battery..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-gray-200 text-[13px] outline-none focus:border-black transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all"
                  aria-label="Clear search"
                >
                  <FiX size={11} />
                </button>
              )}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Filter Button (mobile) */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="sm:hidden inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-gray-200 text-[12.5px] font-semibold text-gray-700"
              >
                <FiSliders size={14} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Desktop Filters */}
              <div className="hidden sm:flex items-center gap-2">
                <FilterDropdown
                  label="Price"
                  value={priceFilter}
                  onChange={setPriceFilter}
                  options={[
                    { value: "all", label: "All Prices" },
                    { value: "under-3", label: "Under ₨ 3 Lakh" },
                    { value: "3-4", label: "₨ 3 - 4 Lakh" },
                    { value: "above-4", label: "Above ₨ 4 Lakh" },
                  ]}
                />

                <FilterDropdown
                  label="Availability"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "all", label: "All" },
                    { value: "available", label: "Available Now" },
                  ]}
                />

                {activeFiltersCount > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="px-3 py-3 rounded-full text-[12px] font-semibold text-gray-500 hover:text-black transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE FILTERS DRAWER ================= */}
      {filtersOpen && (
        <MobileFiltersDrawer
          onClose={() => setFiltersOpen(false)}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClear={onClearFilters}
        />
      )}
    </>
  );
}

/* ============================================================
   FILTER DROPDOWN
   ============================================================ */
function FilterDropdown({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const active = value !== "all";
  const currentLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-4 py-3 rounded-full border text-[12.5px] font-semibold transition-all ${
          active
            ? "bg-black text-white border-black"
            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
        }`}
      >
        <FiFilter size={13} />
        {currentLabel}
        <FiChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] py-2 z-40 animate-[dropdownIn_0.2s_ease]">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px] text-left hover:bg-gray-50 transition-colors"
            >
              <span
                className={
                  value === opt.value
                    ? "font-semibold text-black"
                    : "text-gray-600"
                }
              >
                {opt.label}
              </span>
              {value === opt.value && (
                <FiCheck size={13} className="text-black" />
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   SORT DROPDOWN
   ============================================================ */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const options = [
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
  ];

  const currentLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:border-gray-300 transition-all"
      >
        {currentLabel}
        <FiChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[200px] bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] py-2 z-40 animate-[dropdownIn_0.2s_ease]">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px] text-left hover:bg-gray-50 transition-colors"
            >
              <span
                className={
                  value === opt.value
                    ? "font-semibold text-black"
                    : "text-gray-600"
                }
              >
                {opt.label}
              </span>
              {value === opt.value && (
                <FiCheck size={13} className="text-black" />
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   MOBILE FILTERS DRAWER
   ============================================================ */
function MobileFiltersDrawer({
  onClose,
  priceFilter,
  setPriceFilter,
  statusFilter,
  setStatusFilter,
  onClear,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const priceOptions = [
    { value: "all", label: "All Prices" },
    { value: "under-3", label: "Under ₨ 3 Lakh" },
    { value: "3-4", label: "₨ 3 - 4 Lakh" },
    { value: "above-4", label: "Above ₨ 4 Lakh" },
  ];

  const statusOptions = [
    { value: "all", label: "All Products" },
    { value: "available", label: "Available Now" },
  ];

  return (
    <div className="fixed inset-0 z-[100] sm:hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.25s_ease]"
      />

      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[340px] bg-white shadow-2xl flex flex-col animate-[slideIn_0.3s_cubic-bezier(.2,.9,.3,1)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FiSliders size={16} className="text-black" />
            <h2 className="text-[15px] font-semibold text-[#111]">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all"
          >
            <FiX size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Price */}
          <div>
            <p className="text-[10.5px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-3">
              Price Range
            </p>
            <div className="space-y-2">
              {priceOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPriceFilter(opt.value)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-[13px] transition-all ${
                    priceFilter === opt.value
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  <span className="font-semibold">{opt.label}</span>
                  {priceFilter === opt.value && <FiCheck size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-[10.5px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-3">
              Availability
            </p>
            <div className="space-y-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-[13px] transition-all ${
                    statusFilter === opt.value
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  <span className="font-semibold">{opt.label}</span>
                  {statusFilter === opt.value && <FiCheck size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex gap-2">
          <button
            onClick={() => {
              onClear();
            }}
            className="flex-1 py-3 rounded-full bg-gray-50 hover:bg-gray-100 text-[13px] font-semibold text-gray-700 transition-all"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-black hover:bg-gray-800 text-white text-[13px] font-semibold transition-all"
          >
            Show Results
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}