import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiZap,
  FiShield,
  FiTarget,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

const features = [
  {
    num: "01",
    icon: <FiZap size={14} />,
    title: "Powerful Performance",
    desc: "Smooth and confident riding experience.",
  },
  {
    num: "02",
    icon: <FiShield size={14} />,
    title: "Reliable Quality",
    desc: "Built for everyday journeys and adventures.",
  },
  {
    num: "03",
    icon: <FiTarget size={14} />,
    title: "Your Perfect Bike",
    desc: "Choose a bike that fits your style and needs.",
  },
];

export default function WhyChoose() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-black py-12 sm:py-14 md:py-16 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gray-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gray-100/60 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-10 lg:gap-14 items-center">

        
          <div
            className={`
              relative overflow-hidden rounded-2xl sm:rounded-3xl group
              transition-all duration-1000 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <img
              src="/img6.jpeg"
              alt="Revoltevez Motorcycle"
              loading="lazy"
              className="
                w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px]
                object-cover object-center
                transition-transform duration-[1200ms] ease-out
                group-hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-black text-[11px] sm:text-xs font-bold tracking-[0.15em] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                REVOLTEVEZ
              </span>
            </div>

            <div
              className="
                absolute top-4 right-4 sm:top-5 sm:right-5
                w-10 h-10 sm:w-11 sm:h-11 rounded-full
                bg-white/15 backdrop-blur-md border border-white/25
                flex items-center justify-center text-white
                opacity-0 translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-500
              "
            >
              <FiArrowUpRight size={16} />
            </div>
          </div>

         
          <div className="max-w-lg">
           
            <div
              className={`
                inline-flex items-center gap-2 mb-2.5 sm:mb-3
                transition-all duration-700 ease-out
                ${isVisible ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-4"}
              `}
            >
              <span className="w-6 h-px bg-black" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-gray-500 uppercase">
                Why Choose Us
              </span>
            </div>

           
            <h2
              className={`
                text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px]
                font-bold leading-[1.05] tracking-[-0.03em] mb-3 sm:mb-4
                transition-all duration-700 ease-out delay-200
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
            >
              Ride More.
              <br />
              <span className="text-gray-400">Live Different.</span>
            </h2>

           
            <p
              className={`
                text-gray-600 text-[13px] sm:text-sm leading-relaxed mb-5 sm:mb-6
                transition-all duration-700 ease-out delay-300
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
            >
              Discover bikes built for performance, reliability, comfort, and
              everyday adventures. Find a motorcycle that matches your style
              and the way you ride.
            </p>

           
            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7">
              {features.map((feature, i) => (
                <div
                  key={feature.num}
                  className={`
                    group/feature flex items-start gap-3
                    transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
                  `}
                  style={{ transitionDelay: isVisible ? `${400 + i * 100}ms` : "0ms" }}
                >
                  <div
                    className="
                      relative shrink-0 w-9 h-9 rounded-xl
                      bg-black text-white flex items-center justify-center
                      shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                      transition-all duration-500
                      group-hover/feature:scale-105 group-hover/feature:rotate-[8deg]
                    "
                  >
                    {feature.icon}

                    <span
                      className="
                        absolute -top-1.5 -right-1.5
                        min-w-[18px] h-[18px] px-1 rounded-full
                        bg-white text-black text-[9px] font-bold
                        flex items-center justify-center
                        ring-2 ring-black
                        transition-transform duration-500
                        group-hover/feature:scale-110
                      "
                    >
                      {feature.num}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-[13px] sm:text-[13.5px] font-bold text-black tracking-tight mb-0.5 transition-colors duration-300 group-hover/feature:text-gray-700">
                      {feature.title}
                    </h3>
                    <p className="text-[11.5px] text-gray-500 leading-snug">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

         
            <div
              className={`
                transition-all duration-700 ease-out
                ${isVisible ? "opacity-100 translate-y-0 delay-[700ms]" : "opacity-0 translate-y-5"}
              `}
            >
              <Link
                to="/products"
                className="
                  group inline-flex items-center gap-2.5
                  px-5 sm:px-6 py-2.5 sm:py-3
                  bg-black text-white rounded-full
                  font-semibold text-xs sm:text-[12.5px]
                  shadow-[0_8px_22px_rgba(0,0,0,0.18)]
                  hover:bg-gray-900 hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)]
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-300
                "
              >
                <span>Explore Bikes</span>
                <span
                  className="
                    w-6 h-6 rounded-full
                    bg-white/15 flex items-center justify-center
                    transition-all duration-300
                    group-hover:bg-white group-hover:text-black
                    group-hover:translate-x-0.5
                  "
                >
                  <FiArrowRight size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}