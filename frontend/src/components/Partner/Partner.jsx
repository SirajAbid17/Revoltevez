import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMapPin,
  FiUsers,
  FiNavigation,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";

const cards = [
  {
    type: "ride",
    number: "01",
    eyebrow: "DISCOVER YOUR RIDE",
    title: "Experience",
    highlight: "the Ride.",
    description:
      "Find a Revoltevez experience near you and discover electric mobility in a completely new way.",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=90",
    tag: "NEAREST STORE",
    button: "Find a Revoltevez",
    icon: <FiMapPin />,
    path: "/services",
  },
  {
    type: "partner",
    number: "02",
    eyebrow: "BUILD WITH US",
    title: "Be a",
    highlight: "Partner.",
    description:
      "Join the Revoltevez network and be part of the next generation of electric mobility.",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=90",
    tag: "PARTNER NETWORK",
    button: "Contact Revoltevez",
    icon: <FiMail />,
    path: "/find-a-store",
  },
];

export default function Partner() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="w-full overflow-hidden bg-[#f7f7f5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px] 2xl:max-w-[1320px]">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-11 lg:flex-row lg:items-end">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-7 bg-black" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
                REVOLTEVEZ WORLD
              </span>
            </div>

            <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#111]">
              Your journey.
              <br />
              <span className="text-gray-400">Your next move.</span>
            </h2>
          </div>

          <p className="max-w-[380px] text-[13.5px] leading-6 text-gray-500 sm:text-[14px] lg:pb-1">
            Whether you're looking for your next electric ride or want to grow
            with us, there's a place for you in the Revoltevez movement.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 place-items-center gap-5 sm:gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.type}
              role="button"
              tabIndex={0}
              aria-label={`${card.title} ${card.highlight}`}
              onClick={() => handleNavigate(card.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigate(card.path);
                }
              }}
              className="
                group
                relative
                isolate
                mx-auto
                flex
                w-full
                max-w-[540px]
                cursor-pointer
                flex-col
                overflow-hidden
                rounded-[26px]
                border
                border-white/5
                bg-gradient-to-br
                from-[#141414]
                via-[#0d0d0d]
                to-[#050505]
                shadow-[0_18px_55px_rgba(0,0,0,0.14)]
                transition-all
                duration-700
                hover:-translate-y-1
                hover:border-white/15
                hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-black/40
                focus-visible:ring-offset-2
                h-[300px]
                xs:h-[290px]
                sm:h-[320px]
                md:h-[340px]
                lg:h-[400px]
                xl:h-[420px]
              "
            >
              {/* ============ MOBILE / TABLET BACKGROUND IMAGE ============ */}
              <div className="absolute inset-0 lg:hidden">
                <img
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                    transition-transform
                    duration-[1400ms]
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    group-hover:scale-105
                    motion-reduce:transition-none
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
              </div>

              {/* ============ DESKTOP SIDE IMAGE ============ */}
              <div
                className="
                  absolute
                  right-6
                  top-1/2
                  z-10
                  hidden
                  aspect-[3/4]
                  w-[39%]
                  -translate-y-1/2
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  shadow-[0_18px_45px_rgba(0,0,0,0.5)]
                  transition-all
                  duration-700
                  group-hover:scale-[1.035]
                  group-hover:border-white/25
                  lg:block
                "
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                    transition-transform
                    duration-[1400ms]
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    group-hover:scale-110
                    motion-reduce:transition-none
                    motion-reduce:group-hover:scale-100
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.16),transparent_55%)]
                    opacity-0
                    transition-opacity
                    duration-1000
                    group-hover:opacity-100
                  "
                />
              </div>

              {/* ================= AMBIENT GLOW ================= */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-56
                  w-56
                  rounded-full
                  bg-white/[0.06]
                  blur-3xl
                  opacity-0
                  transition-opacity
                  duration-1000
                  group-hover:opacity-100
                  sm:-right-28
                  sm:-top-28
                  sm:h-64
                  sm:w-64
                "
              />

              {/* ================= GRAIN ================= */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-10
                  opacity-[0.03]
                  mix-blend-overlay
                  bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)]
                  [background-size:14px_14px]
                "
              />

              {/* ================= CONTENT ================= */}
              <div
                className="
                  relative
                  z-20
                  flex
                  h-full
                  w-full
                  flex-col
                  justify-between
                  p-5
                  sm:p-6
                  lg:w-[65%]
                  lg:p-7
                "
              >
                {/* TOP ROW */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold tracking-[0.35em] text-white/45">
                    {card.number}
                  </span>

                  <div className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-white/50">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />
                    {card.tag}
                  </div>
                </div>

                {/* CENTER BLOCK */}
                <div className="min-w-0 lg:my-auto">
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-3
                      transition-transform
                      duration-700
                      group-hover:translate-x-1.5
                      motion-reduce:transition-none
                    "
                  >
                    <span className="text-[9.5px] font-bold tracking-[0.28em] text-white/50">
                      {card.eyebrow}
                    </span>

                    <span className="h-px w-6 bg-white/25 transition-all duration-700 group-hover:w-10 sm:w-5 motion-reduce:transition-none" />
                  </div>

                  <h3
                    className="
                      text-[26px]
                      font-semibold
                      leading-[0.95]
                      tracking-[-0.045em]
                      text-white
                      transition-transform
                      duration-700
                      group-hover:-translate-y-1
                      xs:text-[28px]
                      sm:text-[32px]
                      sm:leading-[0.9]
                      lg:text-[36px]
                      lg:tracking-[-0.05em]
                      motion-reduce:transition-none
                    "
                  >
                    {card.title}
                    <br />
                    <span className="text-white/45">{card.highlight}</span>
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[320px]
                      text-[12px]
                      leading-5
                      text-white/60
                      transition-colors
                      duration-700
                      group-hover:text-white/80
                      sm:mt-2.5
                      sm:text-[12.5px]
                      lg:mt-3
                      lg:max-w-[225px]
                      lg:text-[11px]
                      lg:leading-[1.45rem]
                    "
                  >
                    {card.description}
                  </p>

                  {/* CTA BUTTON */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(card.path);
                    }}
                    className="
                      group/btn
                      mt-3.5
                      inline-flex
                      w-fit
                      items-center
                      gap-2.5
                      rounded-full
                      bg-white
                      py-1.5
                      pl-5
                      pr-1.5
                      text-[11px]
                      font-bold
                      tracking-wide
                      text-black
                      transition-all
                      duration-500
                      hover:scale-[1.04]
                      hover:bg-gray-100
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-white/70
                      sm:text-[10px]
                      lg:text-[9px]
                    "
                  >
                    <span className="whitespace-nowrap">{card.button}</span>

                    <span
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-black
                        text-xs
                        text-white
                        transition-transform
                        duration-500
                        group-hover:rotate-45
                        sm:h-7
                        sm:w-7
                        sm:text-sm
                        motion-reduce:transition-none
                        motion-reduce:group-hover:rotate-0
                      "
                    >
                      {card.icon}
                    </span>
                  </button>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex items-center gap-2.5 text-white/40">
                  {card.type === "ride" ? (
                    <>
                      <FiNavigation className="text-xs sm:text-sm" />
                      <span className="text-[8.5px] font-semibold tracking-[0.22em] sm:text-[9px]">
                        EXPLORE NEARBY
                      </span>
                    </>
                  ) : (
                    <>
                      <FiUsers className="text-xs sm:text-sm" />
                      <span className="text-[8.5px] font-semibold tracking-[0.22em] sm:text-[9px]">
                        JOIN OUR NETWORK
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* ================= FLOATING ARROW ================= */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-4
                  z-30
                  flex
                  h-8
                  w-8
                  -translate-y-2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  text-sm
                  text-white
                  opacity-0
                  backdrop-blur-xl
                  transition-all
                  duration-700
                  group-hover:translate-y-0
                  group-hover:opacity-100
                  sm:h-9
                  sm:w-9
                  motion-reduce:transition-none
                "
              >
                <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45 motion-reduce:transition-none" />
              </div>

              {/* ================= PROGRESS BAR ================= */}
              <div className="pointer-events-none absolute bottom-3 left-5 right-5 z-20">
                <div className="h-px overflow-hidden bg-white/10">
                  <div
                    className="
                      h-full
                      w-0
                      bg-gradient-to-r
                      from-white/50
                      to-white/90
                      transition-all
                      duration-[1400ms]
                      ease-out
                      group-hover:w-full
                      motion-reduce:transition-none
                    "
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 sm:tracking-[0.22em]">
              ELECTRIC MOBILITY · MADE FOR MOVEMENT
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[9px] tracking-widest">MOVE DIFFERENT</span>
            <FiChevronRight className="text-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}