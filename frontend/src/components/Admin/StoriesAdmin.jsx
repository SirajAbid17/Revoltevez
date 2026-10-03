import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiEye } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllStoriesAdmin,
  deleteStory,
} from "../../store/slices/storySlice";
import AddStoryModal from "./AddStoryModal";

export default function StoriesAdmin() {
  const dispatch = useAppDispatch();
  const { all, allLoading, mutating } = useAppSelector((s) => s.stories);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchAllStoriesAdmin());
  }, [dispatch]);

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (story) => {
    setEditing(story);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this story permanently?")) return;
    await dispatch(deleteStory(id));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              STORIES
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-[0.98] text-[#111]">
            Manage Stories
          </h1>
          <p className="text-[13px] text-gray-500 mt-2">
            {allLoading
              ? "Loading..."
              : `${all.length} stor${all.length === 1 ? "y" : "ies"} total`}
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-2.5 rounded-full bg-black text-white text-[12.5px] font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 w-fit"
        >
          <FiPlus size={14} />
          Add Story
        </button>
      </div>

      {/* Content */}
      {allLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
        </div>
      ) : all.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiBookOpen size={22} className="text-gray-400" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#111]">
            No stories yet
          </h2>
          <p className="text-[13px] text-gray-500 mt-1">
            Publish your first story to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {all.map((story) => (
            <article
              key={story._id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  {story.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/95 text-white text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                  {story.status === "published" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/95 text-white text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Published
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-gray-700/95 text-white text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      Draft
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9.5px] font-semibold inline-flex items-center gap-1">
                  <FiEye size={10} /> {story.views || 0}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
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

                <h3 className="text-[15px] font-bold text-[#111] tracking-tight line-clamp-2 mb-2">
                  {story.title}
                </h3>

                <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
                  {story.description}
                </p>

                <div className="flex items-center gap-1.5 pt-3 mt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(story)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-black hover:text-white text-[11.5px] font-semibold text-gray-700 transition-all"
                  >
                    <FiEdit2 size={11} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(story._id)}
                    disabled={mutating}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 transition-all disabled:opacity-50"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <AddStoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingStory={editing}
      />
    </div>
  );
}