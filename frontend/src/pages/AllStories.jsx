import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiZap } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPublicStories } from "../store/slices/storySlice";
import Loader from "../components/common/Loader";
import FeaturedStory from "../components/Stories/FeaturedStory";
import StoryCard from "../components/Stories/StoryCard";


export default function AllStories() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector((s) => s.stories);

  useEffect(() => {
    dispatch(fetchPublicStories());
  }, [dispatch]);

  const { featured, rest } = useMemo(() => {
    if (!Array.isArray(list) || list.length === 0) {
      return { featured: null, rest: [] };
    }
    return { featured: list[0], rest: list.slice(1) };
  }, [list]);

  return (
    <section className="relative w-full bg-[#f7f7f5] overflow-hidden">
    
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[450px] h-[450px] rounded-full bg-blue-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/[0.04] blur-3xl" />

    
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16">
       
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-gray-500 uppercase">
              The Journal
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
              <FiZap size={9} className="text-amber-500" />
              <span className="text-[9px] font-bold tracking-wider uppercase text-amber-700">
                Fresh
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 lg:gap-12 items-end">
            <div>
              <h1 className="text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.045em] leading-[1] text-[#0a0a0a]">
                Stories &{" "}
                <span className="text-gray-400">Insights.</span>
              </h1>
            </div>

            <p className="text-[13.5px] sm:text-[14px] leading-7 text-gray-500 max-w-md">
              {loading
                ? "Loading stories..."
                : `${list.length} ${
                    list.length === 1 ? "story" : "stories"
                  } from the world of electric mobility — built for riders who move differently.`}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="w-1 h-1 rounded-full bg-gray-300" />
            </span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent" />
          </div>
        </div>

        
        {loading && (
          <Loader size="lg" text="Loading stories..." className="py-24" />
        )}

       
        {!loading && list.length === 0 && (
          <div className="relative overflow-hidden py-20 text-center border border-dashed border-gray-300 rounded-3xl bg-white/50">
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gray-100 blur-3xl" />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
                <FiBookOpen size={26} className="text-gray-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[9.5px] font-bold tracking-[0.25em] text-gray-500 uppercase">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-[20px] font-bold text-[#111] mb-2">
                No stories yet.
              </h3>
              <p className="text-[13.5px] text-gray-500 max-w-sm mx-auto">
                Fresh stories from the world of electric mobility are on the way.
              </p>
            </div>
          </div>
        )}

     
        {!loading && list.length > 0 && (
          <>
           
            <FeaturedStory
              story={featured}
              onOpen={() => navigate(`/stories/${featured._id}`)}
            />

          
            {rest.length > 0 && (
              <div className="flex items-center justify-between mb-6 mt-10">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-px bg-black" />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                    Latest Stories
                  </span>
                </div>
                <span className="text-[11.5px] text-gray-400 font-medium">
                  {rest.length} {rest.length === 1 ? "story" : "stories"}
                </span>
              </div>
            )}

           
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {rest.map((story, i) => (
                  <StoryCard
                    key={story._id}
                    story={story}
                    index={i}
                    onOpen={() => navigate(`/stories/${story._id}`)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}