import React, { useEffect, useState } from "react";
import {
  FiPhone,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiTrash2,
  FiCheck,
  FiX,
  FiClock,
  FiBookmark,
  FiMessageCircle,
  FiCopy,
  FiExternalLink,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../store/slices/bookingSlice";


const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    classes: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-500",
  },
  contacted: {
    label: "Contacted",
    classes: "bg-blue-50 text-blue-700 border-blue-100",
    dot: "bg-blue-500",
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-green-50 text-green-700 border-green-100",
    dot: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-50 text-red-700 border-red-100",
    dot: "bg-red-500",
  },
};


export default function BookingsSection() {
  const dispatch = useAppDispatch();
  const { all, counts, allLoading, mutating } = useAppSelector(
    (s) => s.booking
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchAllBookings(filter));
  }, [filter, dispatch]);

  const handleStatus = async (id, status) => {
    await dispatch(updateBookingStatus({ id, status }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking permanently?")) return;
    await dispatch(deleteBooking(id));
  };

  const filters = [
    { id: "all", label: "All", count: counts.total, icon: <FiBookmark size={13} /> },
    { id: "pending", label: "Pending", count: counts.pending, icon: <FiClock size={13} /> },
    { id: "contacted", label: "Contacted", count: counts.contacted, icon: <FiMessageCircle size={13} /> },
    { id: "confirmed", label: "Confirmed", count: counts.confirmed, icon: <FiCheck size={13} /> },
    { id: "cancelled", label: "Cancelled", count: counts.cancelled, icon: <FiX size={13} /> },
  ];

  return (
    <div className="space-y-5">
     
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              BOOKINGS
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-[0.98] text-[#111]">
            Bookings
          </h1>
          <p className="text-[13px] text-gray-500 mt-2">
            Track product booking requests from customers
          </p>
        </div>

        {counts.pending > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11.5px] font-semibold text-amber-700">
              {counts.pending} new
            </span>
          </div>
        )}
      </div>

     
      <div className="flex items-center gap-1.5 bg-white rounded-2xl border border-gray-100 p-1.5 overflow-x-auto hide-scrollbar">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl
                text-[12.5px] font-semibold whitespace-nowrap transition-all
                ${active ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}
              `}
            >
              <span className={active ? "text-white" : "text-gray-400"}>{f.icon}</span>
              {f.label}
              <span
                className={`
                  inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full
                  text-[10px] font-bold
                  ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}
                `}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {allLoading ? (
          <div className="p-16 text-center">
            <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
            <p className="text-[12.5px] text-gray-500 mt-4">Loading bookings...</p>
          </div>
        ) : all.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
              <FiBookmark size={26} className="text-gray-300" />
            </div>
            <h3 className="text-[15px] font-semibold text-[#111]">No bookings yet</h3>
            <p className="text-[12.5px] text-gray-500 mt-1">
              New booking requests will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {all.map((b) => (
              <BookingCard
                key={b._id}
                booking={b}
                onStatus={handleStatus}
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


function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      title={copied ? "Copied!" : `Copy ${label}`}
      className={`
        shrink-0 w-6 h-6 rounded-md
        flex items-center justify-center
        transition-all duration-300 active:scale-90
        ${
          copied
            ? "bg-emerald-500 text-white shadow-[0_4px_12px_-4px_rgba(16,185,129,0.6)]"
            : "bg-white/60 text-gray-400 hover:text-gray-900 hover:bg-white border border-gray-200"
        }
      `}
    >
      {copied ? (
        <FiCheck size={11} strokeWidth={3} />
      ) : (
        <FiCopy size={10} strokeWidth={2.2} />
      )}
    </button>
  );
}


function BookingCard({ booking: b, onStatus, onDelete, disabled }) {
  const status = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;

  const date = new Date(b.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });


  const waNumber = b.whatsapp.replace(/[^\d]/g, "");
  const waLink = `https://wa.me/${waNumber}`;

  
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    b.location || ""
  )}`;

  return (
    <div className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
      <div className="flex gap-4">
        
        <div className="shrink-0">
          {b.productImage ? (
            <img
              src={b.productImage}
              alt={b.productName}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-bold">
              N/A
            </div>
          )}
        </div>

        
        <div className="flex-1 min-w-0">
         
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-[14px] font-bold text-[#111] truncate">
                  {b.productName}
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[9.5px] font-bold uppercase tracking-wider ${status.classes}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
              <p className="text-[11.5px] text-gray-500">
                Price: <strong className="text-gray-700">{b.productPrice}</strong>
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-[10.5px] text-gray-400 shrink-0">
              <FiCalendar size={10} />
              {date}
            </span>
          </div>

   
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
           
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
              <FiUser size={12} className="text-gray-400 shrink-0" />
              <span className="text-[11.5px] font-medium text-gray-700 truncate flex-1">
                {b.userName}
              </span>
            </div>

          
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-green-50 border border-green-100">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-80 transition-opacity"
                title="Open in WhatsApp"
              >
                <FiPhone size={12} className="text-green-600 shrink-0" />
                <span className="text-[11.5px] font-semibold text-green-700 truncate">
                  {b.whatsapp}
                </span>
              </a>
              <CopyButton text={b.whatsapp} label="number" />
            </div>

           
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-80 transition-opacity group/loc"
                title="Open in Google Maps"
              >
                <FiMapPin size={12} className="text-red-500 shrink-0" />
                <span className="text-[11.5px] font-medium text-gray-700 truncate group-hover/loc:text-black transition-colors">
                  {b.location}
                </span>
                <FiExternalLink
                  size={10}
                  className="text-gray-400 shrink-0 opacity-0 group-hover/loc:opacity-100 transition-opacity"
                />
              </a>
              <CopyButton text={b.location} label="location" />
            </div>
          </div>

         
          <div className="flex items-center gap-2 flex-wrap">
            {b.status !== "contacted" && (
              <button
                onClick={() => onStatus(b._id, "contacted")}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold transition-all disabled:opacity-50"
              >
                <FiMessageCircle size={11} />
                Mark Contacted
              </button>
            )}
            {b.status !== "confirmed" && (
              <button
                onClick={() => onStatus(b._id, "confirmed")}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold transition-all disabled:opacity-50"
              >
                <FiCheck size={11} />
                Confirm
              </button>
            )}
            {b.status !== "cancelled" && (
              <button
                onClick={() => onStatus(b._id, "cancelled")}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-[11px] font-bold transition-all disabled:opacity-50"
              >
                <FiX size={11} />
                Cancel
              </button>
            )}
            <button
              onClick={() => onDelete(b._id)}
              disabled={disabled}
              className="ml-auto w-8 h-8 inline-flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all disabled:opacity-50"
              title="Delete"
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}