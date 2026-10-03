import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiStar,
  FiLock,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  submitFeedback,
  resetSubmitState,
} from "../../store/slices/feedbackSlice";

export default function FeedbackForm({ user }) {
  const dispatch = useAppDispatch();
  const { submitting, submitError, submitSuccess } = useAppSelector(
    (s) => s.feedback
  );

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: "",
    rating: 5,
    message: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [touched, setTouched] = useState({});

  // Prefill from Clerk user
  useEffect(() => {
    if (user) {
      setForm((p) => ({
        ...p,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Reset success after 5s
  useEffect(() => {
    if (submitSuccess) {
      setForm((p) => ({ ...p, rating: 5, message: "" }));
      const t = setTimeout(() => dispatch(resetSubmitState()), 5000);
      return () => clearTimeout(t);
    }
  }, [submitSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) setTouched((p) => ({ ...p, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setTouched({ message: !form.message.trim() });
    if (!form.message.trim()) return;

    const avatarUrl = user.photoURL || user.imageUrl || "";

    await dispatch(
      submitFeedback({
        name: user.name,
        email: user.email,
        role: form.role,
        rating: form.rating,
        message: form.message,
        avatar: avatarUrl,
        provider: user.provider || "google",
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-[420px]">
        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-px bg-black" />
            <span className="text-[9px] font-bold tracking-[0.3em] text-gray-500">
              SHARE YOUR EXPERIENCE
            </span>
            <span className="w-6 h-px bg-black" />
          </div>

          <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.04em] leading-tight text-[#111]">
            We'd love your
            <span className="text-gray-400"> feedback.</span>
          </h1>

          <p className="mt-2 text-[12px] text-gray-500 leading-relaxed max-w-xs mx-auto">
            Your feedback is reviewed before appearing publicly.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
          {/* Locked User Info — compact */}
          <div className="mb-4 flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-bold ring-2 ring-white">
                {(user.name || "U")[0].toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <FcGoogle size={10} />
                <p className="text-[10.5px] text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-[8.5px] font-bold uppercase tracking-wider text-green-700">
              <FiLock size={7} />
              Locked
            </span>
          </div>

          {/* Success Banner */}
          {submitSuccess && (
            <div className="mb-3 flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-2.5 animate-[slideDown_0.3s_ease]">
              <FiCheckCircle
                className="text-green-600 shrink-0 mt-0.5"
                size={14}
              />
              <p className="text-[11.5px] text-green-700 font-medium">
                Thanks! Your feedback is pending approval.
              </p>
            </div>
          )}

          {/* Error Banner */}
          {submitError && (
            <div className="mb-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-2.5">
              <FiAlertCircle
                className="text-red-500 shrink-0 mt-0.5"
                size={14}
              />
              <p className="text-[11.5px] text-red-600">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name + Email grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Locked Name */}
              <div>
                <label className="block text-[9.5px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <FiUser
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={12}
                  />
                  <input
                    type="text"
                    value={form.name}
                    readOnly
                    disabled
                    className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-[11.5px] text-gray-500 cursor-not-allowed"
                  />
                  <FiLock
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={11}
                  />
                </div>
              </div>

              {/* Locked Email */}
              <div>
                <label className="block text-[9.5px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={12}
                  />
                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    disabled
                    className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-[11.5px] text-gray-500 cursor-not-allowed"
                  />
                  <FiLock
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={11}
                  />
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-[9.5px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Role
                <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Verified Rider"
                maxLength={40}
                className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[11.5px] outline-none transition-all focus:border-black focus:bg-white"
              />
            </div>

            {/* Rating — compact */}
            <div>
              <label className="block text-[9.5px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Rating *
              </label>
              <div
                className="flex items-center gap-1"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= (hoverRating || form.rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, rating: star }))}
                      onMouseEnter={() => setHoverRating(star)}
                      className="transition-transform duration-150 hover:scale-110 active:scale-95"
                      aria-label={`${star} star`}
                    >
                      <FiStar
                        size={20}
                        style={
                          filled
                            ? { fill: "#fbbf24", color: "#fbbf24" }
                            : undefined
                        }
                        className={filled ? "" : "text-gray-300"}
                      />
                    </button>
                  );
                })}
                <span className="ml-1.5 text-[11.5px] font-semibold text-gray-600">
                  {form.rating}/5
                </span>
              </div>
            </div>

            {/* Message — smaller rows */}
            <div>
              <label className="block text-[9.5px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Feedback *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                placeholder="Share your experience..."
                className={`w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border text-[11.5px] outline-none transition-all resize-none ${
                  touched.message
                    ? "border-red-300"
                    : "border-gray-200 focus:border-black focus:bg-white"
                }`}
              />
              <p className="text-[9.5px] text-gray-400 text-right mt-1">
                {form.message.length}/500
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-black text-white py-2.5 text-[12px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  Submit Feedback
                </>
              )}
            </button>

            <p className="text-[9.5px] text-gray-400 text-center leading-relaxed">
              <FiLock size={9} className="inline mr-1" />
              One feedback per Google account.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}