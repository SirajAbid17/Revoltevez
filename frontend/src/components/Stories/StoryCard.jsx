import React from "react";
import {
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import {
  getCategoryStyle,
  formatDate,
  estimateReadTime,
} from "./storyUtils";


export default function StoryCard({ story, index = 0, onOpen }) {
  const categoryStyle = getCategoryStyle(story.category);
  const readTime = estimateReadTime(story);

  return (
    <article
      onClick={onOpen}
      style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
      className="
        group relative cursor-pointer
        flex flex-col
        rounded-[20px] overflow-hidden
        bg-white border border-gray-200/80
        transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
        hover:-translate-y-1.5
        hover:border-gray-300
        hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.18)]
        animate-[fadeInUp_0.6s_ease-out_both]
      "
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.12]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3.5 left-3.5">
          <span
            className={`
              inline-flex items-center gap-1.5
              px-2.5 py-1 rounded-full
              border text-[9px] font-bold tracking-widest uppercase
              backdrop-blur-md bg-white/95
              ${categoryStyle}
              shadow-sm
            `}
          >
            {story.category}
          </span>
        </div>

        <div className="absolute top-3.5 right-3.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold">
            <FiClock size={8} />
            {readTime} min
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-1.5 mb-3 text-[10.5px] font-medium text-gray-400">
          <FiCalendar size={11} />
          <span>{formatDate(story.date)}</span>
        </div>

        <h3
          className="
            text-[16px] sm:text-[17px]
            font-bold leading-[1.3]
            tracking-[-0.015em]
            text-[#0a0a0a]
            mb-3
            line-clamp-2
            transition-colors duration-300
            group-hover:text-gray-600
          "
        >
          {story.title}
        </h3>

        {story.description && (
          <p className="text-[13px] leading-[1.6] text-gray-500 line-clamp-2 mb-5">
            {story.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-gray-900 group-hover:text-black transition-colors">
            Read Article
            <FiChevronRight
              size={11}
              className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </span>

          <span
            className="
              w-8 h-8 rounded-full
              bg-gray-100 text-gray-600
              flex items-center justify-center
              transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
              group-hover:bg-black group-hover:text-white group-hover:rotate-45
            "
          >
            <FiArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      <span className="pointer-events-none absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-500/[0.06] to-transparent" />
      </span>

      <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]" />
    </article>
  );
}