import React from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiStar,
  FiLock,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

export default function FeedbackSubmitted({ feedback, user }) {
  const statusConfig = {
    pending: {
      icon: <FiClock size={28} />,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      title: "Your feedback is pending review.",
      desc: "Our team is reviewing your submission. It will appear on the homepage once approved.",
    },
    approved: {
      icon: <FiCheckCircle size={28} />,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
      title: "Your feedback is live!",
      desc: "Thank you for sharing your experience. Your review is now visible to everyone on the homepage.",
    },
    rejected: {
      icon: <FiXCircle size={28} />,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
      title: "Feedback not approved.",
      desc: "Unfortunately, your submission didn't meet our guidelines. Please contact support for more details.",
    },
  };

  const config = statusConfig[feedback.status] || statusConfig.pending;
  const date = new Date(feedback.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              FEEDBACK RECEIVED
            </span>
            <span className="w-8 h-px bg-black" />
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.04em] leading-tight text-[#111]">
            Thank you for your
            <br />
            <span className="text-gray-400"> feedback.</span>
          </h1>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          {/* Status Banner */}
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl ${config.bg} ${config.border} border mb-6`}
          >
            <div className={`${config.color} shrink-0 mt-0.5`}>
              {config.icon}
            </div>
            <div>
              <p className={`text-[13.5px] font-bold ${config.color}`}>
                {config.title}
              </p>
              <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
                {config.desc}
              </p>
            </div>
          </div>

          {/* Your Submission */}
          <div className="pt-2">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-3">
              Your Submission
            </p>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={14}
                    style={
                      star <= feedback.rating
                        ? { fill: "#fbbf24", color: "#fbbf24" }
                        : undefined
                    }
                    className={
                      star <= feedback.rating ? "" : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-[11px] font-semibold text-gray-500">
                  {feedback.rating}.0
                </span>
              </div>

              {/* Message */}
              <p className="text-[13px] text-gray-700 leading-relaxed mb-4">
                "{feedback.message}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-gray-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    {(user.name || "U")[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-[10.5px] text-gray-500 truncate">
                    Submitted {date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 flex items-start gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <FiLock size={12} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Only one feedback per account is allowed. This submission is
              locked to your Google account.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-[12px] font-semibold text-gray-500 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}