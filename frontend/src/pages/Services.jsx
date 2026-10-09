import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiZap,
  FiTool,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiBatteryCharging,
  FiCheckCircle,
  FiPhone,
} from "react-icons/fi";

export default function Services() {
 
  const services = [
    {
      icon: <FiTool size={20} />,
      gradient: "from-blue-400 to-blue-600",
      title: "Maintenance & Repair",
      desc: "Expert servicing by certified technicians to keep your ride in top condition.",
      features: [
        "Free first 3 services",
        "Genuine spare parts",
        "Same-day service",
      ],
      tag: "Most Popular",
    },
    {
      icon: <FiBatteryCharging size={20} />,
      gradient: "from-emerald-400 to-emerald-600",
      title: "Battery Care",
      desc: "Complete battery diagnostics, maintenance, and replacement services.",
      features: [
        "24-month warranty",
        "Free health checkup",
        "Genuine batteries",
      ],
      tag: "Warranty",
    },
    {
      icon: <FiTruck size={20} />,
      gradient: "from-purple-400 to-purple-600",
      title: "Home Delivery",
      desc: "Free doorstep delivery anywhere in Pakistan with complete setup.",
      features: ["Free across Pakistan", "Full setup included", "Instant activation"],
      tag: "Free",
    },
    {
      icon: <FiShield size={20} />,
      gradient: "from-amber-400 to-amber-600",
      title: "Insurance & Coverage",
      desc: "Comprehensive insurance plans for theft, damage, and accidents.",
      features: ["Theft protection", "Accident coverage", "Easy claims"],
      tag: "Protected",
    },
    {
      icon: <FiRefreshCw size={20} />,
      gradient: "from-pink-400 to-pink-600",
      title: "Trade-In & Upgrade",
      desc: "Exchange your old bike for a new one with attractive trade-in value.",
      features: ["Best resale value", "Instant evaluation", "Simple process"],
      tag: "Upgrade",
    },
    {
      icon: <FiHeadphones size={20} />,
      gradient: "from-indigo-400 to-indigo-600",
      title: "24/7 Support",
      desc: "Round-the-clock customer support via phone, WhatsApp, and email.",
      features: ["Always available", "Expert help", "Quick response"],
      tag: "Support",
    },
  ];

 
  const steps = [
    {
      num: "01",
      title: "Book Service",
      desc: "Call, WhatsApp, or book online in seconds.",
    },
    {
      num: "02",
      title: "We Pick Up",
      desc: "Free doorstep pickup from your location.",
    },
    {
      num: "03",
      title: "Expert Service",
      desc: "Certified technicians handle everything.",
    },
    {
      num: "04",
      title: "Delivered Back",
      desc: "Your bike returned, fully serviced and ready.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-0 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1000px] mx-auto">
      
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-white border border-gray-100 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
              Our Services
            </span>
          </div>

          <h1 className="text-[26px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.04em] leading-[1.05] text-[#111] mb-2">
            Everything your
            <span className="text-gray-300"> ride needs.</span>
          </h1>

          <p className="text-[11.5px] sm:text-[13px] font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3">
            Complete Care
          </p>

          <p className="max-w-xl mx-auto text-[13px] sm:text-[13.5px] text-gray-500 leading-relaxed">
            From regular maintenance to complete battery care — we've got you
            covered end to end.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="
                group relative overflow-hidden
                bg-white rounded-2xl border border-gray-100
                p-5
                hover:border-gray-200
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                hover:-translate-y-1
                transition-all duration-400
              "
            >
            
              <span className="absolute top-3 right-3 text-[8.5px] font-bold tracking-[0.15em] text-gray-300">
                {String(i + 1).padStart(2, "0")}
              </span>

           
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 group-hover:rotate-[8deg] transition-transform duration-500`}
              >
                {s.icon}
              </div>

           
              <h3 className="text-[14px] font-bold text-[#111] mb-1.5 tracking-tight">
                {s.title}
              </h3>

             
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                {s.desc}
              </p>

             
              <ul className="space-y-1.5 mb-4">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <FiCheckCircle
                      size={11}
                      className="text-green-500 shrink-0"
                    />
                    <span className="text-[11px] text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>

            
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                <span className="w-1 h-1 rounded-full bg-green-500" />
                <span className="text-[9.5px] font-bold text-gray-600 uppercase tracking-wider">
                  {s.tag}
                </span>
              </div>

             
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

       
        <div className="mb-10">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="w-5 h-px bg-black" />
              <span className="text-[9.5px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                How It Works
              </span>
              <span className="w-5 h-px bg-black" />
            </div>
            <h2 className="text-[20px] sm:text-[26px] font-semibold tracking-[-0.03em] text-[#111]">
              Simple. Fast. Hassle-Free.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="
                  group relative bg-white rounded-2xl border border-gray-100 p-4
                  hover:border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                  transition-all duration-300
                "
              >
             
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[13px] font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                  {step.num}
                </div>

                <h3 className="text-[13px] font-bold text-[#111] mb-1">
                  {step.title}
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  {step.desc}
                </p>

               
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2 w-4 h-px bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

     
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-400">
          <div className="relative overflow-hidden rounded-2xl bg-black text-white p-6 sm:p-8">
           
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiZap size={11} className="text-white/50" />
                  <span className="text-[9.5px] font-bold tracking-[0.3em] text-white/40 uppercase">
                    Book a Service
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[26px] font-semibold tracking-[-0.03em] leading-tight">
                  Need help with your ride?
                </h3>
                <p className="mt-2 text-[12px] text-white/60 leading-relaxed">
                  Book a service or reach out — our team is ready 24/7.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <a
                  href="tel:+923406500029"
                  className="
                    group inline-flex items-center gap-1.5 px-5 py-2.5
                    rounded-full bg-white text-black
                    text-[11.5px] font-semibold
                    hover:bg-gray-100 transition-all
                  "
                >
                  <FiPhone size={12} />
                  Call Now
                  <FiArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <Link
                  to="/feedback"
                  className="
                    group inline-flex items-center gap-1.5 px-5 py-2.5
                    rounded-full border border-white/20 text-white
                    text-[11.5px] font-semibold
                    hover:bg-white/10 transition-all
                  "
                >
                  Send Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}