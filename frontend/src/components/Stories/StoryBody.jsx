import React from "react";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";
import AuthorAvatar from "./AuthorAvatar";


export default function StoryBody({
  story,
  descExpanded,
  onToggleDesc,
  onViewAll,
  onBackHome,
}) {
  const showDescToggle = (story.description?.length || 0) > 140;

  return (
    <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
    
      <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-200">
        <AuthorAvatar author={story.author} />

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-0.5">
            Written by
          </p>
          <p className="text-[14px] font-bold text-[#111] truncate">
            {story.author?.name || "Revoltevez Team"}
          </p>
        </div>
      </div>

 
      {story.description && (
        <div className="relative mb-10">
          <div className="relative pl-5 border-l-[3px] border-black">
            <p
              className={`
                text-[16px] sm:text-[18px] leading-[1.65] text-gray-700 font-medium
                transition-all duration-500
                ${!descExpanded ? "line-clamp-2" : ""}
              `}
            >
              {story.description}
            </p>

            {!descExpanded && showDescToggle && (
              <span
                className="
                  pointer-events-none absolute bottom-0 right-0
                  w-32 h-[1.65em]
                  bg-gradient-to-l from-[#f7f7f5] to-transparent
                "
              />
            )}
          </div>

          {showDescToggle && (
            <button
              onClick={onToggleDesc}
              className="
                group mt-3 ml-5 inline-flex items-center gap-1.5
                text-[12px] font-bold uppercase tracking-[0.1em]
                text-black hover:text-gray-600
                transition-colors duration-300
              "
            >
              {descExpanded ? "Show Less" : "Read More"}
              <FiChevronDown
                size={12}
                className={`
                  transition-transform duration-500
                  ${descExpanded ? "rotate-180" : ""}
                `}
              />
            </button>
          )}
        </div>
      )}

    
      {story.content ? (
        <div
          className="
            prose-content
            text-[15.5px] sm:text-[16.5px]
            leading-[1.85]
            text-gray-700
            whitespace-pre-line
            [&>*+*]:mt-6
          "
        >
          {story.content}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-white border border-dashed border-gray-300 py-14 px-6 text-center">
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gray-100 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
                Coming Soon
              </span>
            </div>
            <p className="text-[14px] text-gray-500 italic">
              Full story coming soon…
            </p>
          </div>
        </div>
      )}

     
      <div className="mt-14 mb-10 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300" />
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300" />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onViewAll}
          className="
            group inline-flex items-center justify-center gap-2
            px-6 py-4 rounded-2xl
            bg-white border border-gray-200
            text-[13px] font-semibold text-[#111]
            hover:border-black hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
            transition-all duration-300 active:scale-[0.98]
          "
        >
          <FiArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          View All Stories
        </button>

        <button
          onClick={onBackHome}
          className="
            group inline-flex items-center justify-center gap-2
            px-6 py-4 rounded-2xl
            bg-black text-white
            text-[13px] font-semibold
            hover:bg-gray-900
            shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]
            transition-all duration-300 active:scale-[0.98]
          "
        >
          Back to Home
          <FiArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </div>
  );
}