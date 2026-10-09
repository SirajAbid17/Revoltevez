import React from "react";
import {
  FiArrowUpRight,
  FiStar,
  FiCalendar,
  FiClock,
  FiTrendingUp,
  FiHeart,
} from "react-icons/fi";
import { formatDate, estimateReadTime } from "./storyUtils";


export default function FeaturedStory({ story, onOpen }) {
  if (!story) return null;

  return (
    <article
      onClick={onOpen}
      className="
        group relative overflow-hidden rounded-[28px] bg-black cursor-pointer mb-10
        transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
        hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]
        hover:-translate-y-1
      "
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] lg:min-h-[480px]">
       
        <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.15]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-900/20" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg backdrop-blur-sm">
              <FiStar size={10} className="fill-white" />
              Featured
            </span>
          </div>

          <div className="absolute top-5 right-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold">
              <FiTrendingUp size={10} />
              Trending
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-3 text-white/85 text-[11px] lg:hidden">
            <span className="flex items-center gap-1.5">
              <FiCalendar size={11} />
              {formatDate(story.date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="flex items-center gap-1.5">
              <FiClock size={11} />
              {estimateReadTime(story)} min
            </span>
          </div>
        </div>

      
        <div className="relative flex flex-col justify-between p-7 sm:p-9 lg:p-11 bg-black text-white">
          <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-500/[0.1] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue-500/[0.06] blur-3xl" />

          <div className="relative">
            <div className="mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm bg-white/10 text-white border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {story.category}
              </span>
            </div>

            <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold tracking-[-0.035em] leading-[1.1] mb-5 group-hover:text-white/90 transition-colors duration-500 line-clamp-3">
              {story.title}
            </h2>

            {story.description && (
              <p className="text-[14.5px] sm:text-[15.5px] leading-7 text-white/70 line-clamp-2 mb-5">
                {story.description}
              </p>
            )}

            <div
              className="
                relative overflow-hidden
                rounded-2xl
                bg-gradient-to-br from-emerald-500/[0.12] via-emerald-500/[0.06] to-transparent
                border border-emerald-500/20
                px-4 py-3.5
                backdrop-blur-sm
              "
            >
              <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-emerald-400/20 blur-2xl" />

              <div className="relative flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <FiHeart
                    size={13}
                    className="text-emerald-300 fill-emerald-400/40"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[12px] sm:text-[12.5px] font-bold text-white leading-snug mb-0.5">
                    Thanks for being here
                  </p>
                  <p className="text-[10.5px] sm:text-[11px] text-white/60 leading-relaxed">
                    Your support keeps Revoltevez moving forward.
                    Let's build the future of mobility together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-[11.5px] text-white/50">
              <span className="hidden lg:flex items-center gap-1.5">
                <FiCalendar size={12} />
                {formatDate(story.date)}
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <FiClock size={12} />
                {estimateReadTime(story)} min read
              </span>
            </div>

            <span className="inline-flex items-center gap-2.5 text-[12.5px] font-semibold text-white">
              Read Story
              <span
                className="
                  w-9 h-9 rounded-full bg-white text-black
                  flex items-center justify-center
                  transition-all duration-500
                  group-hover:rotate-45
                "
              >
                <FiArrowUpRight size={14} strokeWidth={2.5} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}