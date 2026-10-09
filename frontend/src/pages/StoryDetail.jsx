import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookmark } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchStoryById, clearCurrent } from "../store/slices/storySlice";
import Loader from "../components/common/Loader";
import StoryHero from "../components/Stories/StoryHero";
import StoryBody from "../components/Stories/StoryBody";


export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current, currentLoading } = useAppSelector((s) => s.stories);

  const [descExpanded, setDescExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);

 
  useEffect(() => {
    if (id) dispatch(fetchStoryById(id));
    return () => {
      dispatch(clearCurrent());
    };
  }, [id, dispatch]);

 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);


  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        Math.max(total, 1)
      );
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [current]);

 
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      
    }
  };

  
  if (currentLoading) {
    return <Loader fullPage size="lg" text="Loading story..." />;
  }

  
  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <FiBookmark size={26} className="text-gray-400" />
          </div>
          <h1 className="text-[22px] font-bold text-[#111] mb-2">
            Story not found
          </h1>
          <p className="text-[13.5px] text-gray-500 mb-6">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/stories")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 transition-all"
          >
            <FiArrowLeft size={14} />
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <article className="w-full bg-[#f7f7f5]" ref={contentRef}>
    
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

    
      <StoryHero
        story={current}
        onBack={() => navigate(-1)}
        onCopy={handleCopyLink}
        copied={copied}
      />

      
      <StoryBody
        story={current}
        descExpanded={descExpanded}
        onToggleDesc={() => setDescExpanded((v) => !v)}
        onViewAll={() => navigate("/stories")}
        onBackHome={() => navigate("/")}
      />
    </article>
  );
}