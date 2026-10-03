import React, { useEffect, useState, useCallback, useRef } from "react";
import { FiPlay, FiPause, FiArrowRight } from "react-icons/fi";

const images = [
  { src: "/img1.jpeg", title: "Ride the Future", subtitle: "Electric. Effortless. Yours." },
  { src: "./img2.jpeg", title: "Think Unlimited", subtitle: "Built for the road ahead." },
  { src: "./img3.jpeg", title: "Power Meets Style", subtitle: "Engineered for everyday." },
  { src: "./img4.jpeg", title: "Go Electric", subtitle: "Zero emissions. Full throttle." },
  { src: "./img5.jpeg", title: "Move Different", subtitle: "Your next ride starts here." },
];

const SLIDE_DURATION = 5500;

export default function ImagesSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent((index + images.length) % images.length);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
    setProgressKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setProgressKey((k) => k + 1);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) {
      setIsPaused(false);
      return;
    }
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const handleImgError = (index) => {
    setImgErrors((p) => ({ ...p, [index]: true }));
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="
        relative w-full overflow-hidden bg-black
        h-[70svh] sm:h-[calc(100svh-72px)] lg:h-[calc(100svh-78px)]
        min-h-[420px] sm:min-h-[560px] lg:min-h-[640px]
        max-h-[900px]
        select-none
      "
      aria-roledescription="carousel"
    >
      {/* SLIDES */}
      {images.map((slide, index) => {
        const isActive = index === current;
        const hasError = imgErrors[index];

        return (
          <div
            key={slide.src}
            className={`
              absolute inset-0
              transition-opacity duration-[1400ms] ease-in-out
              ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            aria-hidden={!isActive}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

            {!hasError && (
              <img
                src={slide.src}
                alt={slide.title}
                onError={() => handleImgError(index)}
                loading={index === 0 ? "eager" : "lazy"}
                className={`
                  absolute inset-0 w-full h-full
                  object-cover
                  object-[center_30%] sm:object-center
                  transition-transform duration-[7000ms] ease-out will-change-transform
                  ${isActive ? "scale-[1.08]" : "scale-100"}
                `}
              />
            )}

            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                Image not found: {slide.src}
              </div>
            )}

            {/* Overlays — lighter on mobile so image shows through */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 sm:from-black/40 sm:via-black/10 sm:to-black/70" />
            <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/50 via-transparent to-black/30" />
            <div className="absolute bottom-0 left-0 w-full h-40 sm:h-56 lg:h-64 bg-gradient-to-t from-black/80 to-transparent" />

            {/* TEXT */}
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28 lg:pb-32">
                <div className="max-w-2xl">
                  <div
                    className={`
                      inline-flex items-center gap-2 mb-4 sm:mb-5
                      transition-all duration-1000
                      ${isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-4"}
                    `}
                  >
                    <span className="w-6 sm:w-8 h-px bg-white/60" />
                    <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.35em] text-white/70 uppercase">
                      Revoltevez
                    </span>
                  </div>

                  <h1
                    className={`
                      text-white font-bold tracking-[-0.04em] leading-[0.95]
                      text-[32px] sm:text-[52px] md:text-[64px] lg:text-[76px] xl:text-[84px]
                      transition-all duration-1000 ease-out
                      ${isActive ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-6"}
                    `}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className={`
                      mt-3 sm:mt-5 text-white/75 font-medium
                      text-[12.5px] sm:text-[15px] lg:text-[16px] tracking-wide
                      transition-all duration-1000 ease-out
                      ${isActive ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-6"}
                    `}
                  >
                    {slide.subtitle}
                  </p>

                  <div
                    className={`
                      mt-6 sm:mt-9 flex flex-wrap items-center gap-2.5 sm:gap-3
                      transition-all duration-1000 ease-out
                      ${isActive ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-6"}
                    `}
                  >
                    <a
                      href="/products"
                      className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white text-black text-[12px] sm:text-[13px] font-semibold hover:bg-gray-100 active:scale-[0.97] transition-all duration-300"
                    >
                      Explore Bikes
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                        <FiArrowRight size={13} />
                      </span>
                    </a>
                    <a
                      href="/about"
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/25 text-white text-[12px] sm:text-[13px] font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 transition-all duration-300"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pb-5 sm:pb-6 lg:pb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 max-w-[220px] sm:max-w-[280px]">
              {images.map((_, index) => {
                const isActive = index === current;
                const isPast = index < current;
                return (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    aria-label={`Show image ${index + 1}`}
                    className="group relative flex-1 h-1 sm:h-1.5 overflow-hidden rounded-full bg-white/25 hover:bg-white/40 transition-colors"
                  >
                    <span
                      className={`
                        absolute inset-y-0 left-0 rounded-full
                        ${isPast ? "w-full bg-white/70" : ""}
                        ${isActive ? "bg-white" : ""}
                      `}
                      style={
                        isActive
                          ? {
                              width: "100%",
                              transformOrigin: "left",
                              animation: `fillBar ${SLIDE_DURATION}ms linear forwards`,
                              animationPlayState: isPaused ? "paused" : "running",
                            }
                          : undefined
                      }
                      key={isActive ? progressKey : undefined}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-white">
                <span className="text-[14px] sm:text-[16px] font-semibold tracking-widest tabular-nums">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="w-6 sm:w-8 h-px bg-white/40" />
                <span className="text-[11px] sm:text-[12px] tracking-widest text-white/50 tabular-nums">
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>

              <button
                onClick={() => setIsPaused((v) => !v)}
                aria-label={isPaused ? "Play" : "Pause"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 active:scale-95"
              >
                {isPaused ? <FiPlay size={12} /> : <FiPause size={12} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute z-20 top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <style>{`
        @keyframes fillBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}