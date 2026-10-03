import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiTag, FiEye } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchStoryById, clearCurrent } from "../store/slices/storySlice";

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current, currentLoading } = useAppSelector((s) => s.stories);

  useEffect(() => {
    if (id) dispatch(fetchStoryById(id));
    return () => {
      dispatch(clearCurrent());
    };
  }, [id, dispatch]);

  if (currentLoading) {
    return (
      <div className="py-32 text-center">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!current) {
    return (
      <div className="py-32 text-center px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Story not found</h1>
        <button
          onClick={() => navigate("/stories")}
          className="text-sm font-semibold text-gray-600 hover:text-black underline"
        >
          ← Back to all stories
        </button>
      </div>
    );
  }

  const date = new Date(current.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="w-full bg-white">
      {/* Hero */}
      <div className="relative w-full h-[55vh] min-h-[340px] max-h-[560px] overflow-hidden bg-black">
        <img
          src={current.image}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-5 sm:left-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all"
        >
          <FiArrowLeft size={13} /> Back
        </button>

        <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 lg:px-12 pb-10">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <FiTag size={11} /> {current.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar size={11} /> {date}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="inline-flex items-center gap-1.5">
                <FiEye size={11} /> {current.views || 0}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              {current.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium mb-10 border-l-4 border-black pl-5">
          {current.description}
        </p>

        {current.content ? (
          <div className="text-gray-700 leading-8 whitespace-pre-line text-[15px] sm:text-base">
            {current.content}
          </div>
        ) : (
          <p className="text-gray-500 italic">Full story coming soon…</p>
        )}

        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/stories")}
            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
          >
            ← View all stories
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
          >
            Home →
          </button>
        </div>
      </div>
    </article>
  );
}