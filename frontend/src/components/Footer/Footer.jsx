import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
} from "react-icons/fi";

import {
  DEVELOPER,
  EXPLORE_LINKS,
  COMPANY_LINKS,
  LINK_CLASS,
} from "./footerData";

import DeveloperModal from "./DeveloperModal";

function CreditAvatar({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
        <span className="text-[9px] font-bold text-white/70">SA</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function AnimatedCredit({ onOpen }) {
  const FULL_TEXT = "Explore Journey";

  const [mode, setMode] = useState("typing");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (mode !== "typing") return;

    setTypedText("");
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setTypedText(FULL_TEXT.slice(0, i));

      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    if (mode === "typing") {
      const timer = setTimeout(() => setMode("profile"), 10000);
      return () => clearTimeout(timer);
    }

    if (mode === "profile") {
      const timer = setTimeout(() => setMode("typing"), 10000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="
        group relative inline-flex items-center gap-1.5
        rounded-full border border-white/10 bg-white/[0.03]
        px-2.5 py-1 sm:px-3 sm:py-1.5
        transition-all duration-500
        hover:border-white/25 hover:bg-white/[0.06]
        hover:-translate-y-0.5
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0b0b0b]
        cursor-pointer
        overflow-hidden
        min-w-[120px] sm:min-w-[130px]
      "
    >
      <span
        className="
          pointer-events-none absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          transition-transform duration-1000
          group-hover:translate-x-full
        "
      />

      {mode === "typing" ? (
        <span className="relative flex w-full items-center justify-center gap-1">
          <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[-0.01em] text-white whitespace-nowrap">
            {typedText}
          </span>

          {typedText.length < FULL_TEXT.length && (
            <span className="inline-block w-[1.5px] h-3 bg-white/80 animate-[blink_0.9s_step-end_infinite]" />
          )}

          <span
            className="
              relative flex h-4 w-4 sm:h-5 sm:w-5 shrink-0
              items-center justify-center rounded-full
              bg-white/5 text-white/60
              transition-all duration-500
              group-hover:bg-white
              group-hover:text-black
              group-hover:rotate-45
            "
          >
            <FiArrowUpRight size={10} />
          </span>
        </span>
      ) : (
        <span className="relative flex w-full items-center justify-center gap-1.5 animate-[fadeInSlide_0.4s_ease]">
          <span className="relative shrink-0">
            <span className="block h-5 w-5 sm:h-6 sm:w-6 rounded-full p-[1.5px] bg-gradient-to-br from-white/60 via-white/20 to-white/60">
              <span className="block h-full w-full rounded-full overflow-hidden bg-gray-800">
                <CreditAvatar
                  src={DEVELOPER.avatar}
                  alt={DEVELOPER.name}
                />
              </span>
            </span>

            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500 border-[1.5px] border-[#0b0b0b]" />
          </span>

          <span className="text-[10.5px] sm:text-[11px] font-semibold text-white whitespace-nowrap">
            {DEVELOPER.name}
          </span>

          <span
            className="
              relative flex h-4 w-4 sm:h-5 sm:w-5 shrink-0
              items-center justify-center rounded-full
              bg-white/5 text-white/60
              transition-all duration-500
              group-hover:bg-white
              group-hover:text-black
              group-hover:rotate-45
            "
          >
            <FiArrowUpRight size={10} />
          </span>
        </span>
      )}
    </button>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [devModalOpen, setDevModalOpen] = useState(false);

  return (
    <>
      <footer className="relative z-[70] overflow-hidden bg-[#0b0b0b] text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 2xl:max-w-[90rem] 2xl:px-16">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:gap-x-10 sm:gap-y-12 sm:py-16 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.1fr] lg:gap-16 lg:py-20 xl:gap-20">

            {/* BRAND */}
            <div className="col-span-2 lg:col-span-1">
              <div className="mb-6 sm:mb-7">
                <h3 className="text-[28px] font-bold tracking-[-0.05em] sm:text-3xl">
                  REVOLTEVEZ
                </h3>

                <p className="mt-2 text-[9px] font-semibold tracking-[0.35em] text-white/35">
                  ELECTRIC MOBILITY
                </p>
              </div>

              <p className="max-w-[380px] text-[13.5px] leading-6 text-white/45 sm:text-sm sm:leading-7">
                Redefining everyday mobility through electric performance,
                modern design and technology built for the next generation of
                riders.
              </p>
            </div>

            {/* EXPLORE */}
            <div>
              <h4 className="mb-5 text-[10px] font-bold tracking-[0.3em] text-white/35 sm:mb-7">
                EXPLORE
              </h4>

              <ul className="space-y-3.5 sm:space-y-4">
                {EXPLORE_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className={LINK_CLASS}>
                      <span>{item.label}</span>

                      <FiArrowUpRight className="text-xs opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="mb-5 text-[10px] font-bold tracking-[0.3em] text-white/35 sm:mb-7">
                COMPANY
              </h4>

              <ul className="space-y-3.5 sm:space-y-4">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className={LINK_CLASS}>
                      <span>{item.label}</span>

                      <FiArrowUpRight className="text-xs opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="mb-5 text-[10px] font-bold tracking-[0.3em] text-white/35 sm:mb-7">
                STAY CONNECTED
              </h4>

              <div className="space-y-3.5 sm:space-y-4">

                {/* PHONE */}
                <a
                  href="tel:+923406500029"
                  className="group flex items-center gap-3 transition-colors"
                >
                  <FiPhone className="shrink-0 text-white/35 transition-colors group-hover:text-white" />

                  <span className="text-[13.5px] text-white/60 transition-colors group-hover:text-white sm:text-sm">
                    0340 650 0029
                  </span>
                </a>

               

                {/* EMAIL */}
                <a
                  href="mailto:info@revolt.evez.com.pk"
                  className="group flex items-center gap-3 transition-colors"
                >
                  <FiMail className="shrink-0 text-white/35 transition-colors group-hover:text-white" />

                  <span className="break-all text-[13.5px] text-white/60 transition-colors group-hover:text-white sm:text-sm">
                    info@revolt.evez.com.pk
                  </span>
                </a>

                {/* ADDRESS */}
                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-white/35" />

                  <span className="text-[13.5px] leading-relaxed text-white/60 sm:text-sm">
                    Al Ghani Industrial Area,
                    <br />
                    Iqbal Chowk, Gajumata,
                    <br />
                    Lahore, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col items-start gap-3 border-t border-white/10 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">

            {/* COPYRIGHT */}
            <p className="text-[10px] leading-none tracking-wide text-white/30">
              © {currentYear} REVOLTEVEZ (PRIVATE) LIMITED. ALL RIGHTS RESERVED.
            </p>

            {/* DEVELOPER CREDIT */}
            <AnimatedCredit
              onOpen={() => setDevModalOpen(true)}
            />

            {/* PRIVACY + RIDERS */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">

              <Link
                to="/privacy"
                className="text-[10px] tracking-wide text-white/30 transition-colors hover:text-white"
              >
                PRIVACY
              </Link>

              <span className="flex items-center gap-1.5 text-[10px] tracking-wide text-white/30">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
                MADE FOR RIDERS
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* DEVELOPER MODAL */}
      <DeveloperModal
        isOpen={devModalOpen}
        onClose={() => setDevModalOpen(false)}
      />

      {/* ANIMATIONS */}
      <style>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }

          51%, 100% {
            opacity: 0;
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

