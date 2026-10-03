import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Our Bikes", to: "/products" },
  { label: "Stories", to: "/#stories" },
  { label: "About Us", to: "/about" },
  { label: "Find a Store", to: "/find-a-store" },
];

const COMPANY_LINKS = [
  { label: "Become a Partner", to: "/partner" },
  { label: "Careers", to: "/careers" },
  { label: "Services", to: "/services" },
  { label: "Feedback", to: "/feedback" },
  { label: "Privacy Policy", to: "/privacy" },
];

const SOCIALS = [
  { icon: <FiInstagram />, label: "Instagram" },
  { icon: <FiFacebook />, label: "Facebook" },
  { icon: <FiYoutube />, label: "YouTube" },
  { icon: <FiLinkedin />, label: "LinkedIn" },
];

const LINK_CLASS =
  "group inline-flex items-center gap-2 text-[13.5px] sm:text-sm text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-white/40";

const ICON_LINK_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/45 transition-all duration-300 hover:border-white hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[70] overflow-hidden bg-[#0b0b0b] text-white">
      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 2xl:max-w-[90rem] 2xl:px-16">
        <div
          className="
            grid
            grid-cols-2
            gap-x-8
            gap-y-10
            py-12
            sm:gap-x-10
            sm:gap-y-12
            sm:py-16
            lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.1fr]
            lg:gap-16
            lg:py-20
            xl:gap-20
          "
        >
          {/* ================= BRAND ================= */}
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
              Redefining everyday mobility through electric performance, modern
              design and technology built for the next generation of riders.
            </p>

            {/* Socials */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className={ICON_LINK_CLASS}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ================= EXPLORE ================= */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold tracking-[0.3em] text-white/35 sm:mb-7">
              EXPLORE
            </h4>
            <ul className="space-y-3.5 sm:space-y-4">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={LINK_CLASS}>
                    <span>{item.label}</span>
                    <FiArrowUpRight className="text-xs opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= COMPANY ================= */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold tracking-[0.3em] text-white/35 sm:mb-7">
              COMPANY
            </h4>
            <ul className="space-y-3.5 sm:space-y-4">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={LINK_CLASS}>
                    <span>{item.label}</span>
                    <FiArrowUpRight className="text-xs opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= STAY CONNECTED ================= */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-5 text-[10px] font-bold tracking-[0.3em] text-white/35 sm:mb-7">
              STAY CONNECTED
            </h4>

            <div className="space-y-3.5 sm:space-y-4">
              {/* Phone */}
              <a
                href="tel:+923406500029"
                className="group flex items-center gap-3 transition-colors focus:outline-none focus-visible:underline focus-visible:underline-offset-4"
              >
                <FiPhone className="shrink-0 text-white/35 transition-colors group-hover:text-white" />
                <span className="text-[13.5px] text-white/60 transition-colors group-hover:text-white sm:text-sm">
                  0340 650 0029
                </span>
              </a>

              {/* Website */}
              <a
                href="https://revolt.evez.com.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-colors focus:outline-none focus-visible:underline focus-visible:underline-offset-4"
              >
                <FiGlobe className="shrink-0 text-white/35 transition-colors group-hover:text-white" />
                <span className="break-all text-[13.5px] text-white/60 transition-colors group-hover:text-white sm:text-sm">
                  revolt.evez.com.pk
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@revolt.evez.com.pk"
                className="group flex items-center gap-3 transition-colors focus:outline-none focus-visible:underline focus-visible:underline-offset-4"
              >
                <FiMail className="shrink-0 text-white/35 transition-colors group-hover:text-white" />
                <span className="break-all text-[13.5px] text-white/60 transition-colors group-hover:text-white sm:text-sm">
                  info@revolt.evez.com.pk
                </span>
              </a>

              {/* Address */}
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

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col items-start gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-7">
          <p className="text-[10px] leading-relaxed tracking-wide text-white/30">
            © {currentYear} REVOLTEVEZ (PRIVATE) LIMITED. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:gap-6">
            <a
              href="#"
              className="text-[10px] tracking-wide text-white/30 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
            >
              TERMS
            </a>
            <a
              href="#"
              className="text-[10px] tracking-wide text-white/30 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
            >
              PRIVACY
            </a>
            <span className="flex items-center gap-2 text-[10px] tracking-wide text-white/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
              MADE FOR RIDERS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}