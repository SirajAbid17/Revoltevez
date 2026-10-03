import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiZap,
  FiActivity,
  FiBatteryCharging,
  FiChevronRight,
  FiPackage,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchPublicProducts } from "../../../store/slices/productsSlice";

export default function ExploreProducts() {
  const dispatch = useAppDispatch();
  const {
    publicProducts: bikes,
    publicLoading: loading,
    publicError: error,
  } = useAppSelector((s) => s.products);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(fetchPublicProducts());
  }, [dispatch]);

  useEffect(() => {
    if (bikes.length > 0 && current >= bikes.length) {
      setCurrent(0);
    }
  }, [bikes.length, current]);

  useEffect(() => {
    if (bikes.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bikes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [bikes.length]);

  const nextBike = () => {
    if (bikes.length < 2) return;
    setCurrent((prev) => (prev + 1) % bikes.length);
  };

  const previousBike = () => {
    if (bikes.length < 2) return;
    setCurrent((prev) => (prev - 1 + bikes.length) % bikes.length);
  };

  const getBike = (offset) => {
    if (bikes.length === 0) return null;
    return bikes[(current + offset + bikes.length) % bikes.length];
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[13px] text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error || bikes.length === 0) {
    return (
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiPackage size={26} className="text-gray-400" />
          </div>
          <h2 className="text-[20px] font-semibold text-[#111] mb-2">
            No products available
          </h2>
          <p className="text-[13px] text-gray-500">
            {error || "Check back soon for new releases."}
          </p>
        </div>
      </section>
    );
  }

  const active = getBike(0);
  const previous = bikes.length > 1 ? getBike(-1) : null;
  const next = bikes.length > 1 ? getBike(1) : null;

  return (
    <section className="w-full bg-white text-black py-10 sm:py-12 md:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* HEADING */}
        <div className="text-center mb-7 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <span className="w-6 sm:w-8 h-px bg-black" />
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-gray-500">
              Discover
            </p>
            <span className="w-6 sm:w-8 h-px bg-black" />
          </div>

          <h2 className="text-[26px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold tracking-[-0.04em] leading-[1.02]">
            Explore
            <span className="text-gray-400"> Revoltevez </span>
            Products
          </h2>

          <p className="mt-3 text-[12.5px] sm:text-[13.5px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Discover our latest motorcycles engineered for performance,
            efficiency, comfort and everyday adventures.
          </p>
        </div>

        {/* CAROUSEL — white fades removed */}
        <div className="relative w-full">
          <div className="relative flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
            {/* LEFT CARD */}
            {previous && (
              <div className="hidden md:block relative w-[22%] h-[220px] lg:h-[280px] rounded-2xl lg:rounded-3xl overflow-hidden shrink-0 opacity-55 scale-[0.88] grayscale-[20%] transition-all duration-700 ease-out group">
                <img
                  src={previous.image}
                  alt={previous.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white/60 text-[9px] uppercase tracking-[0.25em] mb-1">
                    Previous
                  </p>
                  <p className="text-white text-[13px] font-bold truncate">
                    {previous.name}
                  </p>
                </div>
              </div>
            )}

            {/* CENTER CARD */}
            <div className="relative w-full md:w-[54%] lg:w-[52%] h-[280px] sm:h-[320px] md:h-[350px] lg:h-[400px] rounded-2xl lg:rounded-3xl overflow-hidden shrink-0 bg-gray-100 shadow-[0_20px_55px_rgba(0,0,0,0.15)] group">
              <img
                src={active.image}
                alt={active.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5 pointer-events-none" />

              <div className="absolute top-3 left-3 md:top-5 md:left-5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[8.5px] md:text-[9px] text-white font-semibold tracking-[0.2em] uppercase">
                    Featured
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-3 md:top-5 md:right-5">
                <div className="px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-sm">
                  <span className="text-white text-[10px] md:text-[11px] font-mono tracking-widest font-semibold">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(bikes.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6">
                <p className="text-white/60 text-[8.5px] md:text-[9px] uppercase tracking-[0.3em] mb-1.5">
                  Revoltevez
                </p>
                <h3 className="text-white text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-bold tracking-tight leading-[1.05]">
                  {active.name}
                </h3>
                {active.tagline && (
                  <p className="text-white/70 text-[11px] md:text-[12px] mt-1.5 italic">
                    {active.tagline}
                  </p>
                )}
                <div className="mt-2.5 w-10 h-px bg-white/50" />
              </div>

              {bikes.length > 1 && (
                <>
                  <button
                    onClick={previousBike}
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-xl hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 z-10"
                    aria-label="Previous"
                  >
                    <FiArrowLeft size={16} />
                  </button>

                  <button
                    onClick={nextBike}
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-xl hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 z-10"
                    aria-label="Next"
                  >
                    <FiArrowRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* RIGHT CARD */}
            {next && (
              <div className="hidden md:block relative w-[22%] h-[220px] lg:h-[280px] rounded-2xl lg:rounded-3xl overflow-hidden shrink-0 opacity-55 scale-[0.88] grayscale-[20%] transition-all duration-700 ease-out group">
                <img
                  src={next.image}
                  alt={next.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white/60 text-[9px] uppercase tracking-[0.25em] mb-1">
                    Next
                  </p>
                  <p className="text-white text-[13px] font-bold truncate">
                    {next.name}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SPECS */}
          <div className="max-w-3xl mx-auto mt-6 md:mt-8">
            <div className="grid grid-cols-3 border-y border-gray-200">
              <div className="group flex flex-col items-center justify-center py-4 md:py-5 px-2 border-r border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <FiZap size={14} />
                </div>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-0.5">
                  Top Speed
                </p>
                <p className="text-[12.5px] md:text-[15px] font-bold">
                  {active.topSpeed || "N/A"}
                </p>
              </div>

              <div className="group flex flex-col items-center justify-center py-4 md:py-5 px-2 border-r border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <FiActivity size={14} />
                </div>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-0.5">
                  Range
                </p>
                <p className="text-[12.5px] md:text-[15px] font-bold">
                  {active.range || "N/A"}
                </p>
              </div>

              <div className="group flex flex-col items-center justify-center py-4 md:py-5 px-2 hover:bg-gray-50 transition-colors duration-300">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <FiBatteryCharging size={15} />
                </div>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-0.5">
                  Battery
                </p>
                <p className="text-[12.5px] md:text-[15px] font-bold">
                  {active.battery || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-5 md:mt-6">
              <Link
                to={`/products/${active._id}`}
                className="group inline-flex items-center gap-2.5 px-5 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-full text-[11.5px] md:text-[13px] font-semibold tracking-wide hover:bg-gray-800 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
              >
                Explore {active.name}
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <FiChevronRight size={13} />
                </span>
              </Link>
            </div>
          </div>

          {/* INDICATORS */}
          {bikes.length > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-6 md:mt-7">
              {bikes.map((bike, index) => (
                <button
                  key={bike._id}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    current === index
                      ? "w-10 bg-black"
                      : "w-4 bg-gray-300 hover:bg-gray-500"
                  }`}
                  aria-label={`Show ${bike.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}