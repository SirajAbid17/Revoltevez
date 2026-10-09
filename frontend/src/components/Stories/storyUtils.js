

export const CATEGORY_STYLES = {
  "EV INSIGHTS": "bg-emerald-50 text-emerald-700 border-emerald-200",
  NEWS: "bg-blue-50 text-blue-700 border-blue-200",
  TECH: "bg-violet-50 text-violet-700 border-violet-200",
  TIPS: "bg-amber-50 text-amber-700 border-amber-200",
  GUIDES: "bg-sky-50 text-sky-700 border-sky-200",
  REVIEWS: "bg-rose-50 text-rose-700 border-rose-200",
  STORIES: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "CASE STUDIES": "bg-teal-50 text-teal-700 border-teal-200",
};

export const getCategoryStyle = (category) => {
  const key = String(category || "").toUpperCase();
  return CATEGORY_STYLES[key] || "bg-gray-100 text-gray-700 border-gray-200";
};

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const estimateReadTime = (story) => {
  const text = `${story.description || ""} ${story.content || ""}`;
  const words = text.trim().split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
};