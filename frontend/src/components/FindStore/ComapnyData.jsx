import React from "react";
import {
  FiPhone,
  FiGlobe,
  FiMapPin,
  FiClock,
  FiMail,
  FiArrowUpRight,
  FiAward,
  FiUsers,
  FiZap,
} from "react-icons/fi";

export default function ComapnyData() {
  // ============ COMPANY INFO ============
  const companyInfo = [
    {
      icon: <FiPhone size={16} />,
      label: "Phone",
      value: "0340 650 0029",
      link: "tel:+923406500029",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <FiGlobe size={16} />,
      label: "Website",
      value: "revolt.evez.com.pk",
      link: "https://revolt.evez.com.pk",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: <FiMail size={16} />,
      label: "Email",
      value: "info@revolt.evez.com.pk",
      link: "mailto:info@revolt.evez.com.pk",
      color: "from-red-400 to-red-600",
    },
  ];

  // ============ LEGAL INFO ============
  const legalInfo = [
    {
      icon: <FiAward size={14} />,
      label: "Entity",
      value: "Private Limited Company",
    },
    {
      icon: <FiZap size={14} />,
      label: "Industry",
      value: "Electric Vehicles · Mobility · Technology",
    },
    {
      icon: <FiMapPin size={14} />,
      label: "Region",
      value: "Lahore, Pakistan",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-0 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-12 ">
      <div className="max-w-[1000px] mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-100 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
              Company Details
            </span>
          </div>

          <h1 className="text-[26px] sm:text-[34px] font-semibold tracking-[-0.04em] leading-tight text-[#111] mb-2">
            Revoltevez
            <span className="text-gray-300"> (Private) Limited</span>
          </h1>

          <p className="text-[11.5px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
            Think Unlimited
          </p>
        </div>

        {/* ================= CONTACT CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {companyInfo.map((info, i) => (
            <a
              key={i}
              href={info.link}
              target={info.link.startsWith("http") ? "_blank" : undefined}
              rel={
                info.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="
                group bg-white rounded-2xl border border-gray-100
                p-4
                hover:border-gray-200
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                hover:-translate-y-1
                transition-all duration-400
              "
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${info.color} text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform duration-300`}
              >
                {info.icon}
              </div>

              {/* Label */}
              <p className="text-[9.5px] font-bold tracking-[0.14em] text-gray-400 uppercase mb-1">
                {info.label}
              </p>

              {/* Value */}
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12.5px] font-semibold text-[#111] truncate">
                  {info.value}
                </p>
                <FiArrowUpRight
                  size={12}
                  className="text-gray-300 group-hover:text-black transition-all duration-300 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </a>
          ))}
        </div>

        {/* ================= LOCATION CARD ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-400">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT — Info */}
            <div className="p-6 sm:p-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
                  Head Office
                </span>
              </div>

              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.03em] leading-tight text-[#111] mb-4">
                Visit Our Factory
              </h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                  <FiMapPin size={14} />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold tracking-[0.14em] text-gray-400 uppercase mb-1">
                    Address
                  </p>
                  <p className="text-[12.5px] font-medium text-[#111] leading-relaxed">
                    Al Ghani Industrial Area,
                    <br />
                    Iqbal Chowk, Gajumata,
                    <br />
                    Lahore, Pakistan
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                  <FiClock size={14} />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold tracking-[0.14em] text-gray-400 uppercase mb-1">
                    Business Hours
                  </p>
                  <p className="text-[12.5px] font-medium text-[#111]">
                    Mon – Sat · 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

              {/* Directions button */}
              <a
                href="https://maps.google.com/?q=Al+Ghani+Industrial+Area+Iqbal+Chowk+Gajumata+Lahore+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex items-center gap-2 px-5 py-2.5
                  rounded-full bg-black text-white
                  text-[11.5px] font-semibold
                  hover:bg-gray-800
                  transition-all duration-300
                  w-fit mt-1
                "
              >
                <FiMapPin size={12} />
                Get Directions
                <FiArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* RIGHT — Map */}
            <div className="relative min-h-[280px] md:min-h-full bg-gray-100">
              <iframe
                title="Revoltevez Location"
                src="https://www.google.com/maps?q=Al+Ghani+Industrial+Area+Iqbal+Chowk+Gajumata+Lahore+Pakistan&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* ================= LEGAL INFO ================= */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {legalInfo.map((item, i) => (
            <div
              key={i}
              className="
                group bg-white rounded-2xl border border-gray-100 p-4
                hover:border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                transition-all duration-300
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-gray-500 transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-[9.5px] font-bold tracking-[0.14em] text-gray-400 uppercase">
                  {item.label}
                </p>
              </div>
              <p className="text-[12.5px] font-semibold text-[#111] leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}