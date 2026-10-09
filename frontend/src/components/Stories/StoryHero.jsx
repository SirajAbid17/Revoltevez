import React from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiTag,
  FiEye,
  FiClock,
  FiShare2,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import {
  formatDate,
  estimateReadTime,
  getCategoryStyle,
} from "./storyDetailUtils";


export default function StoryHero({ story, onBack, onCopy, copied }) {
  const date = formatDate(story.date);
  const readTime = estimateReadTime(story);
  const categoryStyle = getCategoryStyle(story.category);
  const shareUrl = window.location.href;

  return (
    <div className="relative w-full h-[60vh] min-h-[380px] max-h-[600px] overflow-hidden bg-black">
      <img
        src={story.image}
        alt={story.title}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />

      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.08] blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

    
      <div className="absolute top-5 sm:top-6 left-0 right-0 z-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-white/10 hover:bg-white/20
              backdrop-blur-md border border-white/20 hover:border-white/40
              text-white text-[12px] font-semibold
              transition-all duration-300 active:scale-95
            "
          >
            <FiArrowLeft size={13} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              aria-label="Copy link"
              className={`
                w-9 h-9 rounded-full
                flex items-center justify-center
                backdrop-blur-md border transition-all duration-300 active:scale-90
                ${
                  copied
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white"
                }
              `}
            >
              {copied ? (
                <FiCheck size={14} strokeWidth={3} />
              ) : (
                <FiCopy size={13} />
              )}
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${story.title} — ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="
                w-9 h-9 rounded-full
                flex items-center justify-center
                bg-white/10 hover:bg-white/20
                backdrop-blur-md border border-white/20 hover:border-white/40
                text-white transition-all duration-300 active:scale-90
              "
            >
              <FiShare2 size={13} />
            </a>
          </div>
        </div>
      </div>

      
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 sm:px-8 lg:px-12 pb-10 sm:pb-14">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-full
                border text-[10px] font-bold tracking-widest uppercase
                backdrop-blur-md
                ${categoryStyle}
                bg-white/95
                shadow-lg
              `}
            >
              <FiTag size={10} />
              {story.category}
            </span>

            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/80">
              <FiCalendar size={12} />
              {date}
            </span>

            <span className="w-1 h-1 rounded-full bg-white/40" />

            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/80">
              <FiClock size={12} />
              {readTime} min read
            </span>

            <span className="w-1 h-1 rounded-full bg-white/40" />

            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/80">
              <FiEye size={12} />
              {story.views || 0}
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.05] tracking-[-0.035em] [text-wrap:balance]">
            {story.title}
          </h1>
        </div>
      </div>
    </div>
  );
}