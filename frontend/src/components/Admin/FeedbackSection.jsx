import React, { useEffect, useState } from "react";
import {
  FiMessageSquare,
  FiStar,
  FiMail,
  FiCheck,
  FiX,
  FiTrash2,
  FiClock,
  FiUser,
  FiCalendar,
  FiTag,
  FiChevronDown,
  FiAward,
  FiInbox,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllFeedback,
  updateFeedbackStatus,
  deleteFeedback,
} from "../../store/slices/feedbackSlice";

export default function FeedbackSection() {
  const dispatch = useAppDispatch();
  const { all, counts, allLoading, mutating } = useAppSelector(
    (s) => s.feedback
  );

  const [filter, setFilter] = useState("pending");


  useEffect(() => {
    dispatch(fetchAllFeedback(filter === "all" ? "all" : filter));
  }, [filter, dispatch]);

  const handleApprove = async (id) => {
    await dispatch(updateFeedbackStatus({ id, status: "approved" }));
  };

  const handleReject = async (id) => {
    await dispatch(updateFeedbackStatus({ id, status: "rejected" }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this feedback permanently?")) return;
    await dispatch(deleteFeedback(id));
  };

  const filters = [
    {
      id: "pending",
      label: "Pending",
      count: counts.pending,
      icon: <FiClock size={13} />,
    },
    {
      id: "approved",
      label: "Approved",
      count: counts.approved,
      icon: <FiCheck size={13} />,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: counts.rejected,
      icon: <FiX size={13} />,
    },
    {
      id: "all",
      label: "All",
      count: counts.total,
      icon: <FiInbox size={13} />,
    },
  ];

  return (
    <div className="space-y-6">
     
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              FEEDBACK
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-[0.98] text-[#111]">
            Customer Feedback
          </h1>
          <p className="text-[13px] text-gray-500 mt-2">
            Review and moderate feedback before it goes public
          </p>
        </div>

        
        {counts.pending > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11.5px] font-semibold text-amber-700">
              {counts.pending} awaiting review
            </span>
          </div>
        )}
      </div>

     
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Pending"
          value={counts.pending}
          icon={<FiClock size={16} />}
          gradient="from-amber-400 to-amber-600"
        />
        <StatCard
          label="Approved"
          value={counts.approved}
          icon={<FiCheck size={16} />}
          gradient="from-green-400 to-green-600"
        />
        <StatCard
          label="Rejected"
          value={counts.rejected}
          icon={<FiX size={16} />}
          gradient="from-red-400 to-red-600"
        />
        <StatCard
          label="Total"
          value={counts.total}
          icon={<FiMessageSquare size={16} />}
          gradient="from-blue-400 to-blue-600"
        />
      </div>

     
      <div className="flex items-center gap-1.5 bg-white rounded-2xl border border-gray-100 p-1.5 overflow-x-auto hide-scrollbar">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`
                group flex items-center gap-2 px-4 py-2.5 rounded-xl
                text-[12.5px] font-semibold whitespace-nowrap
                transition-all duration-300
                ${
                  active
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <span className={active ? "text-white" : "text-gray-400"}>
                {f.icon}
              </span>
              {f.label}
              <span
                className={`
                  inline-flex items-center justify-center
                  min-w-[20px] h-5 px-1.5 rounded-full
                  text-[10px] font-bold
                  ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

    
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiMessageSquare size={14} />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-[#111] capitalize">
                {filter === "all" ? "All Feedback" : `${filter} Feedback`}
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {all.length} {all.length === 1 ? "submission" : "submissions"}
              </p>
            </div>
          </div>

        
          <button
            onClick={() =>
              dispatch(fetchAllFeedback(filter === "all" ? "all" : filter))
            }
            className="
              w-8 h-8 rounded-lg hover:bg-gray-100
              flex items-center justify-center
              text-gray-400 hover:text-black
              transition-all
            "
            title="Refresh"
          >
            <FiChevronDown
              size={14}
              className="group-hover:rotate-180 transition-transform"
            />
          </button>
        </div>

        {allLoading ? (
          <div className="p-16 text-center">
            <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
            <p className="text-[12.5px] text-gray-500 mt-4">
              Loading feedback...
            </p>
          </div>
        ) : all.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
              {filter === "pending" ? (
                <FiInbox size={26} className="text-gray-300" />
              ) : (
                <FiMessageSquare size={26} className="text-gray-300" />
              )}
            </div>
            <h3 className="text-[15px] font-semibold text-[#111]">
              No {filter === "all" ? "" : filter} feedback
            </h3>
            <p className="text-[12.5px] text-gray-500 mt-1 max-w-xs mx-auto">
              {filter === "pending"
                ? "New submissions will appear here for your review."
                : "Nothing here yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {all.map((fb) => (
              <FeedbackAdminCard
                key={fb._id}
                feedback={fb}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                disabled={mutating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function StatCard({ label, value, icon, gradient }) {
  return (
    <div className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-[22px] font-bold tracking-tight text-[#111] leading-none">
        {value}
      </p>
    </div>
  );
}


function FeedbackAdminCard({
  feedback: fb,
  onApprove,
  onReject,
  onDelete,
  disabled,
}) {
  const initials = (fb.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const date = new Date(fb.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const provider = fb.provider || "google";

  const statusConfig = {
    pending: {
      label: "Pending",
      classes: "bg-amber-50 text-amber-700 border-amber-100",
      dot: "bg-amber-500",
    },
    approved: {
      label: "Approved",
      classes: "bg-green-50 text-green-700 border-green-100",
      dot: "bg-green-500",
    },
    rejected: {
      label: "Rejected",
      classes: "bg-red-50 text-red-700 border-red-100",
      dot: "bg-red-500",
    },
  };

  const status = statusConfig[fb.status] || statusConfig.pending;

  const hasAvatar = fb.avatar && fb.avatar.trim() !== "";

  return (
    <div className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
      <div className="flex gap-4">
       
        <div className="shrink-0">
          <div className="relative">
            {hasAvatar ? (
              <img
                src={fb.avatar}
                alt={fb.name}
                referrerPolicy="no-referrer"
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
                w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-700 text-white
                items-center justify-center text-[13px] font-bold
                ring-2 ring-gray-100
              `}
            >
              {initials}
            </div>

           
            {provider === "google" && (
              <span
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center z-10"
                title="Verified via Google"
              >
                <FcGoogle size={13} />
              </span>
            )}
          </div>
        </div>

       
        <div className="flex-1 min-w-0">
         
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-[14px] font-bold text-[#111] truncate">
                  {fb.name}
                </p>
                <span
                  className={`
                    inline-flex items-center gap-1.5 px-2 py-0.5
                    rounded-md border text-[9.5px] font-bold uppercase tracking-wider
                    ${status.classes}
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <FiMail size={10} />
                  {fb.email}
                </span>
                {fb.role && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className="flex items-center gap-1">
                      <FiTag size={10} />
                      {fb.role}
                    </span>
                  </>
                )}
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[10.5px] text-gray-400 shrink-0">
              <FiCalendar size={10} />
              {date}
            </span>
          </div>

        
          <div className="flex items-center gap-1 mb-2.5">
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
            <span className="ml-1.5 inline-flex items-center gap-1 text-[10.5px] font-bold text-gray-600">
              {fb.rating}.0
              <span className="text-gray-400 font-medium">/ 5</span>
            </span>
          </div>

         
          <div className="relative pl-3 mb-3 border-l-2 border-gray-100">
            <p className="text-[12.5px] text-gray-600 leading-relaxed">
              {fb.message}
            </p>
          </div>

         
          {fb.reply && (
            <div className="mb-3 flex items-start gap-2 pl-3 border-l-2 border-blue-300 bg-blue-50/40 rounded-r-lg py-2 pr-3">
              <FiAward size={12} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-0.5">
                  Admin Reply
                </p>
                <p className="text-[12px] text-blue-900 leading-relaxed">
                  {fb.reply}
                </p>
              </div>
            </div>
          )}

        
          <div className="flex items-center gap-2 flex-wrap">
            {fb.status !== "approved" && (
              <button
                onClick={() => onApprove(fb._id)}
                disabled={disabled}
                className="
                  group inline-flex items-center gap-1.5
                  px-3.5 py-1.5 rounded-lg
                  bg-green-500 hover:bg-green-600 text-white
                  text-[11px] font-bold
                  shadow-sm hover:shadow-[0_4px_12px_rgba(34,197,94,0.35)]
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.97]
                "
              >
                <FiCheck
                  size={12}
                  className="transition-transform duration-500 group-hover:rotate-[15deg]"
                />
                Approve
              </button>
            )}

            {fb.status !== "rejected" && (
              <button
                onClick={() => onReject(fb._id)}
                disabled={disabled}
                className="
                  group inline-flex items-center gap-1.5
                  px-3.5 py-1.5 rounded-lg
                  bg-gray-100 hover:bg-red-50 hover:text-red-600
                  text-gray-600
                  text-[11px] font-bold
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.97]
                "
              >
                <FiX
                  size={12}
                  className="transition-transform duration-500 group-hover:rotate-[90deg]"
                />
                Reject
              </button>
            )}

            <button
              onClick={() => onDelete(fb._id)}
              disabled={disabled}
              className="
                group w-8 h-8 ml-auto
                inline-flex items-center justify-center
                rounded-lg bg-gray-50 hover:bg-red-50
                text-gray-400 hover:text-red-600
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-[0.95]
              "
              title="Delete permanently"
            >
              <FiTrash2
                size={13}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}