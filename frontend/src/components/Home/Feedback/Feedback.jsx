import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiStar,
  FiMessageSquare,
  FiChevronRight,
  FiArrowUpRight,
  FiPause,
  FiPlay,
  FiX,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchApprovedFeedback } from "../../../store/slices/feedbackSlice";
import Loader from "../../common/Loader";

export default function Feedback() {
  const dispatch = useAppDispatch();
  const { approved, approvedLoading } = useAppSelector((s) => s.feedback);
  const { user: currentUser } = useAppSelector((s) => s.auth);

  const [isPaused, setIsPaused] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const offsetRef = useRef(0);

  
  useEffect(() => {
    dispatch(fetchApprovedFeedback());
  }, [dispatch]);

  const avgRating =
    approved.length > 0
      ? approved.reduce((sum, f) => sum + f.rating, 0) / approved.length
      : 0;

  const shouldScroll = approved.length > 3;


  useEffect(() => {
    if (!shouldScroll || approved.length === 0) return;
    if (selectedFeedback) return;

    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();
    const speed = 35;

    const step = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      if (!isPaused) {
        offsetRef.current += (speed * dt) / 1000;

        const half = track.scrollWidth / 2;
        if (offsetRef.current >= half) {
          offsetRef.current -= half;
        }

        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldScroll, approved.length, isPaused, selectedFeedback]);

 
  useEffect(() => {
    document.body.style.overflow = selectedFeedback ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedFeedback]);

 
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSelectedFeedback(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const displayList = shouldScroll ? [...approved, ...approved] : approved;

  return (
    <>
      <section className="w-full bg-white py-14 sm:py-16 lg:py-20 overflow-hidden">
       
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-black" />
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
                Trusted by Riders
              </p>
              <span className="w-8 h-px bg-black" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight text-gray-900">
              What Our
              <br className="sm:hidden" />
              <span className="text-gray-400"> Riders Say</span>
            </h2>

            <p className="max-w-2xl mx-auto mt-4 text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">
              Real experiences from riders who chose Revoltevez for their next
              electric ride.
            </p>

            {approved.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      size={13}
                      style={
                        star <= Math.round(avgRating)
                          ? { fill: "#fbbf24", color: "#fbbf24" }
                          : undefined
                      }
                      className={
                        star <= Math.round(avgRating) ? "" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <span className="text-[12.5px] font-semibold text-gray-800">
                  {avgRating.toFixed(1)}
                </span>
                <div className="w-px h-4 bg-gray-200" />
                <span className="text-[11.5px] text-gray-500">
                  {approved.length} review{approved.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                <FcGoogle size={14} />
                <span className="text-[10.5px] font-semibold text-gray-600">
                  Verified via Google
                </span>
              </span>
            </div>
          </div>
        </div>

     
        {approvedLoading ? (
         
          <Loader size="lg" text="Loading reviews..." className="py-16" />
        ) : approved.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <FiMessageSquare size={26} className="text-gray-400" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#111] mb-2">
              No reviews yet
            </h3>
            <p className="text-[12.5px] text-gray-500 leading-relaxed mb-6">
              Be the first to share your experience with Revoltevez!
            </p>
            <Link
              to="/feedback"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 transition-all"
            >
              Write a Review
              <FiArrowUpRight size={13} />
            </Link>
          </div>
        ) : shouldScroll ? (
          <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                <div className="overflow-hidden py-1">
                  <div
                    ref={trackRef}
                    className="flex gap-5"
                    style={{ width: "max-content", willChange: "transform" }}
                  >
                    {displayList.map((fb, idx) => (
                      <div
                        key={`${fb._id}-${idx}`}
                        className="
                          shrink-0
                          w-[calc(100vw-3rem)]
                          sm:w-[calc((100vw-4rem-1.25rem)/2)]
                          lg:w-[calc((min(1280px,100vw)-5rem-2.5rem)/3)]
                        "
                      >
                        <ReviewCard
                          feedback={fb}
                          currentUser={currentUser}
                          onOpen={() => setSelectedFeedback(fb)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {approved.map((fb) => (
                <ReviewCard
                  key={fb._id}
                  feedback={fb}
                  currentUser={currentUser}
                  onOpen={() => setSelectedFeedback(fb)}
                />
              ))}
            </div>
          </div>
        )}

      
        {approved.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            {shouldScroll && (
              <button
                onClick={() => setIsPaused((v) => !v)}
                className="
                  inline-flex items-center gap-2
                  px-5 py-3 rounded-full
                  bg-white border border-gray-200
                  text-[12.5px] font-semibold text-gray-700
                  hover:border-gray-300 hover:bg-gray-50
                  transition-all
                "
              >
                {isPaused ? (
                  <>
                    <FiPlay size={12} />
                    Resume
                  </>
                ) : (
                  <>
                    <FiPause size={12} />
                    Pause
                  </>
                )}
              </button>
            )}

            <Link
              to="/feedback"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[12.5px] font-semibold hover:bg-gray-800 transition-all"
            >
              Share Your Experience
              <FiArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {approved.length > 3 && (
              <Link
                to="/feedback"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                View All
                <FiChevronRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        )}
      </section>

     
      {selectedFeedback && (
        <FeedbackModal
          feedback={selectedFeedback}
          currentUser={currentUser}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </>
  );
}


function ReviewCard({ feedback: fb, currentUser, onOpen }) {
  const initials = (fb.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const provider = fb.provider || "google";

  const isOwnFeedback =
    currentUser?.email &&
    fb.email &&
    currentUser.email.toLowerCase() === fb.email.toLowerCase();

  const avatarUrl =
    (fb.avatar && fb.avatar.trim()) ||
    (isOwnFeedback && currentUser?.photoURL ? currentUser.photoURL : "") ||
    "";

  const hasAvatar = avatarUrl && avatarUrl.trim() !== "";

  return (
    <article
      onClick={onOpen}
      className="
        group relative cursor-pointer
        bg-white border border-gray-100 rounded-2xl
        p-5
        hover:border-gray-200
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]
        hover:-translate-y-1
        transition-all duration-400
        h-full flex flex-col
        overflow-hidden
      "
    >
      <div className="absolute top-4 right-5 text-[42px] leading-none text-gray-100 font-serif select-none pointer-events-none">
        "
      </div>

      <div className="flex items-center gap-0.5 mb-3 relative z-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            size={13}
            style={
              star <= fb.rating
                ? { fill: "#fbbf24", color: "#fbbf24" }
                : undefined
            }
            className={star <= fb.rating ? "" : "text-gray-200"}
          />
        ))}
        <span className="ml-1.5 text-[10.5px] font-bold text-gray-500">
          {fb.rating}.0
        </span>
      </div>

      <p className="text-[13px] text-gray-600 leading-[1.6] mb-4 line-clamp-3 relative z-10 flex-1">
        {fb.message}
      </p>

      <div className="flex items-center gap-2.5 pt-3.5 border-t border-gray-100">
        <div className="relative shrink-0">
          {hasAvatar ? (
            <img
              src={avatarUrl}
              alt={fb.name}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 bg-gray-100"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sib = e.currentTarget.nextElementSibling;
                if (sib) sib.style.display = "flex";
              }}
            />
          ) : null}

          <div
            className={`
              ${hasAvatar ? "hidden" : "flex"}
              w-9 h-9 rounded-full bg-black text-white
              items-center justify-center text-[10.5px] font-bold
              ring-2 ring-gray-100
            `}
          >
            {initials}
          </div>

          {provider === "google" && (
            <span
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] border border-gray-100 z-10"
              title="Verified via Google"
            >
              <FcGoogle size={11} />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[12.5px] font-bold text-gray-900 truncate leading-tight">
              {fb.name}
            </h3>
            {provider === "google" && (
              <FcGoogle size={11} className="shrink-0 opacity-70" />
            )}
          </div>
          <p className="text-[10.5px] text-gray-500 truncate mt-0.5">
            {fb.role || "Verified Rider"}
          </p>
        </div>
      </div>

      <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-[9px] font-semibold text-gray-400 tracking-wider uppercase">
          Tap to read
        </span>
      </div>
    </article>
  );
}


function FeedbackModal({ feedback: fb, currentUser, onClose }) {
  const initials = (fb.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const provider = fb.provider || "google";

  const isOwnFeedback =
    currentUser?.email &&
    fb.email &&
    currentUser.email.toLowerCase() === fb.email.toLowerCase();

  const avatarUrl =
    (fb.avatar && fb.avatar.trim()) ||
    (isOwnFeedback && currentUser?.photoURL ? currentUser.photoURL : "") ||
    "";

  const hasAvatar = avatarUrl && avatarUrl.trim() !== "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md animate-[fadeIn_0.25s_ease]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10 w-full max-w-[380px] my-auto
          bg-white rounded-2xl
          border border-gray-100
          shadow-[0_20px_60px_rgba(0,0,0,0.3)]
          overflow-hidden
          animate-[popIn_0.3s_cubic-bezier(.2,.9,.3,1.2)]
        "
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-3 right-3 z-20
            w-7 h-7 rounded-full
            bg-gray-100 hover:bg-gray-200
            flex items-center justify-center
            text-gray-500 hover:text-black
            transition-all duration-300
            active:scale-95
          "
        >
          <FiX size={13} />
        </button>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative shrink-0">
              {hasAvatar ? (
                <img
                  src={avatarUrl}
                  alt={fb.name}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 bg-gray-100"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const sib = e.currentTarget.nextElementSibling;
                    if (sib) sib.style.display = "flex";
                  }}
                />
              ) : null}

              <div
                className={`
                  ${hasAvatar ? "hidden" : "flex"}
                  w-12 h-12 rounded-full
                  bg-gradient-to-br from-black to-gray-700 text-white
                  items-center justify-center text-[16px] font-bold
                  ring-2 ring-gray-100
                `}
              >
                {initials}
              </div>

              {provider === "google" && (
                <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 z-10">
                  <FcGoogle size={12} />
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold text-[#111] tracking-[-0.02em] truncate">
                {fb.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-gray-500 truncate">
                  {fb.role || "Verified Rider"}
                </span>
                {provider === "google" && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-gray-500">
                      <FcGoogle size={9} />
                      Google
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  size={12}
                  style={
                    star <= fb.rating
                      ? { fill: "#fbbf24", color: "#fbbf24" }
                      : undefined
                  }
                  className={star <= fb.rating ? "" : "text-gray-200"}
                />
              ))}
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
            <div className="absolute top-2 left-3 text-[36px] leading-none text-gray-200 font-serif select-none pointer-events-none">
              "
            </div>
            <p className="relative text-[13px] text-gray-700 leading-[1.6] pt-1">
              {fb.message}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10.5px] text-gray-500">
            <span className="truncate flex-1">{fb.email}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
            <span className="shrink-0">
              {new Date(fb.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9.5px] font-bold text-gray-400 tracking-[0.12em] uppercase">
                Published
              </span>
            </div>

            <button
              onClick={onClose}
              className="
                inline-flex items-center gap-1.5
                px-4 py-1.5 rounded-full
                bg-black text-white
                text-[11px] font-semibold
                hover:bg-gray-800
                active:scale-[0.97]
                transition-all duration-300
              "
            >
              Close
              <FiX size={10} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(15px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}