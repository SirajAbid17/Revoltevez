import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchPublicStories } from "../../../store/slices/storySlice";
import Loader from "../../common/Loader";

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const SECTION =
  "w-full bg-white px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 2xl:px-16 " +
  "pt-2 sm:pt-3 lg:pt-4 pb-6 sm:pb-8 lg:pb-10";

const CONTAINER = "max-w-7xl 2xl:max-w-[90rem] mx-auto";

export default function Stories() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list, loading } = useAppSelector((s) => s.stories);

  useEffect(() => {
    dispatch(fetchPublicStories({ limit: 4 }));
  }, [dispatch]);

  const safeList = Array.isArray(list) ? list : [];
  const featured = safeList[0];
  const sideStories = safeList.slice(1, 4);

  const openStory = (id) => navigate(`/stories/${id}`);

  const onKeyOpen = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openStory(id);
    }
  };

  
  if (loading) {
    return (
      <section className={SECTION}>
        <div className={CONTAINER}>
          <Loader
            size="lg"
            text="Loading stories..."
            className="py-12"
          />
        </div>
      </section>
    );
  }


  if (!featured) {
    return (
      <section className={SECTION}>
        <div className={CONTAINER}>
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
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

          <div className="relative overflow-hidden rounded-3xl border border-dashed border-gray-200 bg-[#f7f7f5] px-5 py-10 text-center sm:px-8 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-black/[0.02] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/[0.02] blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] sm:h-16 sm:w-16">
                <FiBookOpen size={24} className="text-gray-400" />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />

                <span className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-gray-500">
                  Coming Soon
                </span>
              </div>

              <h3 className="mb-3 text-xl font-bold tracking-[-0.03em] text-[#111] sm:text-2xl">
                No stories yet.
              </h3>

              <p className="mx-auto mb-6 max-w-md text-[13px] leading-relaxed text-gray-500 sm:text-sm">
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
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </button>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
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

  
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
       
        <div className="mb-5 flex flex-col gap-3 sm:mb-7 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 sm:mb-3 sm:text-xs">
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

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6">
         
          <article
            role="button"
            tabIndex={0}
            aria-label={`Read featured story: ${featured.title}`}
            onClick={() => openStory(featured._id)}
            onKeyDown={(e) => onKeyOpen(e, featured._id)}
            className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl bg-black sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:h-[440px] xl:h-[480px] ${FOCUS_RING}`}
          >
            <img
              src={featured.image}
              alt={featured.title}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/90" />

            
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 sm:p-6 lg:p-7">
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

           
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6 lg:p-7">
              <h3 className="max-w-3xl text-[1.4rem] font-bold leading-[1.15] [text-wrap:balance] sm:text-3xl lg:text-4xl">
                {featured.title}
              </h3>

              <p className="mt-2 line-clamp-2 max-w-2xl text-[12px] leading-5 text-white/75 sm:mt-3 sm:text-sm sm:leading-6">
                {featured.description}
              </p>

              <span className="mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-[12px] font-semibold text-black transition-colors duration-300 group-hover:bg-gray-200 sm:mt-5 sm:text-sm motion-reduce:transition-none">
                Read Story

                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </div>
          </article>

          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:h-[440px] lg:grid-cols-1 lg:grid-rows-3 lg:gap-4 xl:h-[480px]">
            {sideStories.map((story) => (
              <article
                key={story._id}
                role="button"
                tabIndex={0}
                aria-label={`Read story: ${story.title}`}
                onClick={() => openStory(story._id)}
                onKeyDown={(e) => onKeyOpen(e, story._id)}
                className={`group flex min-h-[135px] cursor-pointer gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg sm:flex-col sm:gap-3 sm:rounded-3xl sm:p-3 lg:min-h-0 lg:flex-row lg:items-center lg:gap-4 lg:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
              >
                
                <div className="relative min-h-[110px] w-[38%] min-w-[100px] shrink-0 self-stretch overflow-hidden rounded-xl sm:h-32 sm:min-h-0 sm:w-full sm:min-w-0 sm:self-auto lg:h-full lg:w-[38%] lg:min-w-[110px]">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="truncate text-[9px] font-bold uppercase tracking-widest text-gray-400 sm:text-[10px]">
                        {story.category}
                      </span>

                      <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />

                      <span className="shrink-0 text-[9px] text-gray-400 sm:text-[10px]">
                        {new Date(story.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="mb-1.5 line-clamp-2 text-[13px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-gray-500 sm:text-sm lg:line-clamp-2">
                      {story.title}
                    </h3>

                    <p className="line-clamp-2 text-[11px] leading-[1.5] text-gray-500 sm:text-xs lg:line-clamp-2">
                      {story.description}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-900 sm:text-[11px]">
                      Read Article
                    </span>

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 text-xs transition-all duration-300 group-hover:bg-black group-hover:text-white sm:h-7 sm:w-7">
                      <FiArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <button
            onClick={() => navigate("/stories")}
            className={`w-full rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-800 transition-all hover:border-black hover:bg-black hover:text-white sm:w-auto ${FOCUS_RING}`}
          >
            View All Stories
          </button>
        </div>
      </div>
    </section>
  );
}