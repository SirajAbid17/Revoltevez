import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";


export default function PrivacyContact() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-black text-white p-6 sm:p-8">
     
      <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/[0.08] blur-3xl" />

      <div className="relative">
        
        <div className="flex items-center gap-2 mb-3">
          <FiMail size={11} className="text-white/50" />
          <span className="text-[9.5px] font-bold tracking-[0.3em] text-white/40 uppercase">
            Questions?
          </span>
        </div>

        
        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.03em] leading-tight mb-2">
          We're here to help.
        </h2>

        <p className="text-[12.5px] text-white/60 leading-relaxed max-w-md mb-5">
          If you have any questions about this Privacy Policy or how we
          handle your data, reach out to our team.
        </p>

       
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
          <a
            href="mailto:info@revolt.evez.com.pk"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all"
          >
            <FiMail size={13} className="text-white/70 shrink-0" />
            <span className="text-[11.5px] font-medium text-white/90 truncate">
              Email Us
            </span>
          </a>

          <a
            href="tel:+923406500029"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all"
          >
            <FiPhone size={13} className="text-white/70 shrink-0" />
            <span className="text-[11.5px] font-medium text-white/90 truncate">
              0340 650 0029
            </span>
          </a>

          <Link
            to="/find-a-store"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all"
          >
            <FiMapPin size={13} className="text-white/70 shrink-0" />
            <span className="text-[11.5px] font-medium text-white/90 truncate">
              Visit Office
            </span>
          </Link>
        </div>

        
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-white/70 hover:text-white transition-colors"
        >
          Back to Home
          <FiArrowUpRight
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}