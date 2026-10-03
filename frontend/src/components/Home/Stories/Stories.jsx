import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchPublicStories } from "../../../store/slices/storySlice";

/* ------------------------------------------------------------------ */
/*  Shared class helpers (reuse = consistency)                         */
/* ------------------------------------------------------------------ */
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const SECTION =
  "w-full bg-white px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 2xl:px-16 " +
  "py-8 sm:py-12 lg:py-16";

const CONTAINER = "max-w-7xl 2xl:max-w-[90rem] mx-auto";

export default function Stories() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector((s) => s.stories);

  useEffect(() => {
    dispatch(fetchPublicStories({ limit: 4 }));
  }, [dispatch]);

  /* ---------------- defensive ---------------- */
  const safeList = Array.isArray(list) ? list : [];
  const featured = safeList[0];
  const sideStories = safeList.slice(1, 4);

  /* ---------------- a11y: keyboard open ---------------- */
  const openStory = (id) => navigate(`/stories/${id}`);
  const onKeyOpen = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openStory(id);
    }
  };

  /* ================================================================ */
  /*  LOADING — skeleton jo actual layout se match karta hai          */
  /* ================================================================ */
  if (loading) {
    return (
      <section className={SECTION}>
        <div className={CONTAINER}>
          {/* header skeleton */}
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="w-full space-y-4">
              <div className="h-3 w-28 animate-pulse rounded-full bg-gray-100 sm:w-36" />
              <div className="h-9 w-[85%] max-w-sm animate-pulse rounded-2xl bg-gray-100 sm:h-12 lg:h-14" />
              <div className="h-9 w-[60%] max-w-xs animate-pulse rounded-2xl bg-gray-100 sm:h-12 lg:h-14" />
            </div>
            <div className="w-full max-w-md space-y-3">
              <div className="h-3.5 w-full animate-pulse rounded-full bg-gray-100" />
              <div className="h-3.5 w-4/5 animate-pulse rounded-full bg-gray-100" />
            </div>
          </div>

          {/* grid skeleton */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
            <div className="aspect-[4/5] animate-pulse rounded-3xl bg-gray-100 sm:aspect-[16/10] lg:aspect-auto lg:h-[620px] xl:h-[680px]" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 lg:h-[620px] xl:h-[680px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[150px] animate-pulse rounded-3xl bg-gray-100 sm:h-auto sm:aspect-[16/11] lg:aspect-auto lg:h-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ================================================================ */
  /*  EMPTY STATE                                                     */
  /* ================================================================ */
  if (!featured) {
    return (
      <section className={SECTION}>
        <div className={CONTAINER}>
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 sm:mb-4 sm:text-xs">
                Stories at Revoltevez
              </p>
              <h2 className="text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-gray-950">
                Ride. Explore.
                <br />
                <span className="text-gray-400">Stay Inspired.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              Explore stories, guides and insights from the world of electric
              mobility — built for riders who move differently.
            </p>
          </div>

          {/* Empty card */}
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-gray-200 bg-[#f7f7f5] px-5 py-14 text-center sm:px-8 sm:py-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-black/[0.02] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/[0.02] blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] sm:mb-6 sm:h-20 sm:w-20">
                <FiBookOpen size={22} className="text-gray-400 sm:hidden" />
                <FiBookOpen size={26} className="hidden text-gray-400 sm:block" />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-gray-500">
                  Coming Soon
                </span>
              </div>

              <h3 className="mb-3 text-xl font-bold tracking-[-0.03em] text-[#111] sm:text-[28px]">
                No stories yet.
              </h3>

              <p className="mx-auto mb-7 max-w-md text-[13px] leading-relaxed text-gray-500 sm:text-[14px]">
                We're working on bringing you the latest insights, guides and
                stories from the world of electric mobility. Stay tuned — fresh
                stories are on the way.
              </p>

              <button
                onClick={() => navigate("/products")}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-[12.5px] font-semibold text-white transition-all hover:bg-gray-800 sm:w-auto sm:py-3 ${FOCUS_RING}`}
              >
                Explore Products
                <FiArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gray-200 sm:w-10" />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Revoltevez Stories
            </span>
            <span className="h-px w-8 bg-gray-200 sm:w-10" />
          </div>
        </div>
      </section>
    );
  }

  /* ================================================================ */
  /*  NORMAL RENDER                                                   */
  /* ================================================================ */
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        {/* ---------------- Header ---------------- */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 sm:mb-4 sm:text-xs">
              Stories at Revoltevez
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-gray-950 [text-wrap:balance]">
              Ride. Explore.
              <br />
              <span className="text-gray-400">Stay Inspired.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-500 sm:text-base">
            Explore stories, guides and insights from the world of electric
            mobility — built for riders who move differently.
          </p>
        </div>

        {/* ---------------- Grid ---------------- */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          {/* ================= FEATURED ================= */}
          <article
            role="button"
            tabIndex={0}
            aria-label={`Read featured story: ${featured.title}`}
            onClick={() => openStory(featured._id)}
            onKeyDown={(e) => onKeyOpen(e, featured._id)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-black ${FOCUS_RING}
              aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10]
              lg:aspect-auto lg:h-[620px] xl:h-[680px]`}
          >
            {/* ---------- Image ---------- */}
            <img
              src={featured.image}
              alt={featured.title}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />

            {/* ---------- Gradient overlay (top + bottom) ---------- */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90 sm:from-black/60 sm:via-transparent sm:to-black/85" />

            {/* ================= TOP ROW: badge + date ================= */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5 sm:p-7 md:p-9 lg:p-10">
              <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold tracking-widest text-black shadow-sm sm:text-[10px]">
                FEATURED
              </span>
              <span className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
                {new Date(featured.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* ================= BOTTOM: title + desc + CTA ================= */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 md:p-9 lg:p-10">
              <h3 className="max-w-3xl text-[1.4rem] font-bold leading-[1.15] sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl [text-wrap:balance]">
                {featured.title}
              </h3>

              <p className="mt-3 line-clamp-2 max-w-2xl text-[13px] leading-6 text-white/75 sm:mt-5 sm:line-clamp-3 sm:text-sm sm:leading-7 lg:text-base">
                {featured.description}
              </p>

              <span className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-[13px] font-semibold text-black transition-all duration-300 hover:bg-gray-200 sm:mt-8 sm:w-auto sm:text-sm motion-reduce:transition-none">
                Read Story
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </span>
            </div>
          </article>

          {/* ================= SIDE STORIES ================= */}
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3
                       lg:grid-cols-1 lg:grid-rows-3 lg:gap-6 lg:h-[620px] xl:h-[680px]"
          >
            {sideStories.map((story) => (
              <article
                key={story._id}
                role="button"
                tabIndex={0}
                aria-label={`Read story: ${story.title}`}
                onClick={() => openStory(story._id)}
                onKeyDown={(e) => onKeyOpen(e, story._id)}
                className={`group flex cursor-pointer gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-3.5
                  transition-all duration-500 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-xl
                  sm:flex-col sm:gap-4 sm:p-4
                  lg:flex-row lg:gap-5 lg:hover:translate-y-0
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
              >
                {/* ---------- Image ---------- */}
                <div
                  className="relative w-[38%] min-w-[105px] shrink-0 self-stretch overflow-hidden rounded-2xl
                             sm:w-full sm:min-w-0 sm:self-auto sm:aspect-[16/10]
                             lg:w-[38%] lg:min-w-[125px] lg:self-stretch lg:aspect-auto"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                {/* ---------- Content ---------- */}
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div className="min-w-0">
                    {/* category + date */}
                    <div className="mb-2 flex items-center gap-2">
                      <span className="truncate text-[10px] font-bold tracking-widest text-gray-400">
                        {story.category}
                      </span>
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                      <span className="shrink-0 text-[10px] text-gray-400">
                        {new Date(story.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="mb-1.5 line-clamp-2 text-[14.5px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-gray-500 sm:line-clamp-2 sm:text-base lg:line-clamp-1">
                      {story.title}
                    </h3>

                    {/* description */}
                    <p className="line-clamp-2 text-[11.5px] leading-[1.45] text-gray-500 sm:line-clamp-3 lg:line-clamp-3">
                      {story.description}
                    </p>
                  </div>

                  {/* read row */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-900">
                      Read Article
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-[13px] transition-all duration-300 group-hover:bg-black group-hover:text-white motion-reduce:transition-none">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ---------------- View All ---------------- */}
        <div className="mt-10 flex justify-center sm:mt-14">
          <button
            onClick={() => navigate("/stories")}
            className={`w-full rounded-full border border-gray-300 px-7 py-3.5 text-sm font-semibold text-gray-800 transition-all hover:border-black hover:bg-black hover:text-white sm:w-auto sm:py-3 ${FOCUS_RING}`}
          >
            View All Stories
          </button>
        </div>
      </div>
    </section>
  );
}