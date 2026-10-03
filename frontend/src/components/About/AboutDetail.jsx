import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiActivity,
  FiMapPin,
  FiTag,
  FiTruck,
  FiTool,
} from "react-icons/fi";

export default function AboutDetail() {
  // ============ CORE VALUES ============
  const values = [
    {
      icon: <FiZap size={18} />,
      title: "Electric First",
      desc: "Committed to sustainable, zero-emission mobility.",
    },
    {
      icon: <FiShield size={18} />,
      title: "Built to Last",
      desc: "Engineered with precision and quality materials.",
    },
    {
      icon: <FiTrendingUp size={18} />,
      title: "Constantly Evolving",
      desc: "Innovating for the next generation of riders.",
    },
  ];

  // ============ BENEFITS ============
  const benefits = [
    {
      icon: <FiTag size={16} />,
      gradient: "from-emerald-400 to-emerald-600",
      title: "Best Price Guarantee",
      desc: "Most competitive prices on premium electric vehicles.",
      tag: "Save More",
    },
    {
      icon: <FiShield size={16} />,
      gradient: "from-blue-400 to-blue-600",
      title: "24-Month Warranty",
      desc: "Battery and motor fully covered for 2 years.",
      tag: "Protected",
    },
    {
      icon: <FiTruck size={16} />,
      gradient: "from-purple-400 to-purple-600",
      title: "Free Home Delivery",
      desc: "Delivered to your doorstep — anywhere in Pakistan.",
      tag: "Free Shipping",
    },
    {
      icon: <FiTool size={16} />,
      gradient: "from-amber-400 to-amber-600",
      title: "Free Service Included",
      desc: "First 3 scheduled services on us.",
      tag: "Zero Cost",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* ================= HERO ================= */}
      <section className="px-5 sm:px-8 lg:px-12 pt-2 pb-8 sm:pt-4 sm:pb-10">
        <div className="max-w-[1000px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-100">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
              About Revoltevez
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[26px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.04em] leading-[1.05] text-[#111] mb-2.5">
            Revoltevez
            <span className="text-gray-300"> (Private) Limited</span>
          </h1>

          {/* Tagline */}
          <p className="text-[11.5px] sm:text-[13px] font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3">
            Think Unlimited
          </p>

          {/* Description */}
          <p className="max-w-xl mx-auto text-[13px] sm:text-[13.5px] text-gray-500 leading-relaxed">
            Building the future of sustainable transportation with
            high-performance electric vehicles.
          </p>

          {/* Keywords */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
            {["Electric Vehicles", "Mobility", "Technology"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-black text-white text-[9.5px] font-bold tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="bg-[#f7f7f5] px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-[1000px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="w-5 h-px bg-black" />
              <span className="text-[9.5px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                What Drives Us
              </span>
              <span className="w-5 h-px bg-black" />
            </div>
            <h2 className="text-[20px] sm:text-[26px] font-semibold tracking-[-0.03em] text-[#111]">
              Our Core Values
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {values.map((v, i) => (
              <div
                key={i}
                className="
                  group bg-white rounded-2xl border border-gray-100 p-4
                  hover:border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                  hover:-translate-y-0.5 transition-all duration-300
                "
              >
                <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center mb-3 transition-transform duration-500 group-hover:rotate-[10deg]">
                  {v.icon}
                </div>
                <h3 className="text-[13px] font-bold text-[#111] mb-1">
                  {v.title}
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-[1000px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="w-5 h-px bg-black" />
              <span className="text-[9.5px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                Why Revoltevez
              </span>
              <span className="w-5 h-px bg-black" />
            </div>
            <h2 className="text-[20px] sm:text-[26px] font-semibold tracking-[-0.03em] text-[#111]">
              More Value. Better Ride.
            </h2>
            <p className="max-w-md mx-auto mt-2 text-[12px] text-gray-500 leading-relaxed">
              Premium electric vehicles at prices that make sense.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="
                  group relative overflow-hidden
                  bg-white rounded-2xl border border-gray-100
                  p-4
                  hover:border-gray-200
                  hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                  hover:-translate-y-1
                  transition-all duration-400
                "
              >
                {/* Number */}
                <span className="absolute top-3 right-3 text-[8.5px] font-bold tracking-[0.15em] text-gray-300">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${b.gradient} text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  {b.icon}
                </div>

                {/* Title */}
                <h3 className="text-[13px] font-bold text-[#111] mb-1 tracking-tight">
                  {b.title}
                </h3>

                {/* Description */}
                <p className="text-[11.5px] text-gray-500 leading-relaxed mb-2.5">
                  {b.desc}
                </p>

                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">
                    {b.tag}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 sm:px-8 lg:px-12 pb-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-black text-white p-6 sm:p-8">
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiActivity size={11} className="text-white/50" />
                  <span className="text-[9.5px] font-bold tracking-[0.3em] text-white/40 uppercase">
                    Join the Movement
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[26px] font-semibold tracking-[-0.03em] leading-tight">
                  Ready to ride the future?
                </h3>
                <p className="mt-2 text-[12px] text-white/60 leading-relaxed">
                  Explore our lineup or become a partner.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <Link
                  to="/products"
                  className="
                    group inline-flex items-center gap-1.5 px-5 py-2.5
                    rounded-full bg-white text-black
                    text-[11.5px] font-semibold
                    hover:bg-gray-100 transition-all
                  "
                >
                  Explore Products
                  <FiArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  to="/find-a-store"
                  className="
                    group inline-flex items-center gap-1.5 px-5 py-2.5
                    rounded-full border border-white/20 text-white
                    text-[11.5px] font-semibold
                    hover:bg-white/10 transition-all
                  "
                >
                  <FiMapPin size={12} />
                  Find a Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}