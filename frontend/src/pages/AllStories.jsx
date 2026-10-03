import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPublicStories } from "../store/slices/storySlice";

export default function AllStories() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading } = useAppSelector((s) => s.stories);

  useEffect(() => {
    dispatch(fetchPublicStories());
  }, [dispatch]);

  return (
    <section className="w-full bg-[#f7f7f5] px-5 sm:px-8 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
            All Stories
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950">
            Stories &amp; Insights
          </h1>
          <p className="mt-5 text-gray-500 text-sm sm:text-base max-w-xl leading-7">
            {loading
              ? "Loading..."
              : `${list.length} stor${list.length === 1 ? "y" : "ies"} from the world of electric mobility.`}
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
          </div>
        ) : list.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-500">No stories published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((story) => (
              <article
                key={story._id}
                onClick={() => navigate(`/stories/${story._id}`)}
                className="group cursor-pointer rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400">
                      {story.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] text-gray-400">
                      {new Date(story.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-gray-500 transition-colors mb-2 line-clamp-2">
                    {story.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-gray-900">
                    Read Article
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}