import React, { useEffect } from "react";
import {
  FiX,
  FiMail,
  FiUser,
  FiShield,
  FiLogOut,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";
import { useClerk } from "@clerk/clerk-react";
import { useAppSelector } from "../../store/hooks";

export default function ProfileModal({ isOpen, onClose }) {
  const { user } = useAppSelector((s) => s.auth);
  const { signOut } = useClerk();


  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && isOpen && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleSignOut = async () => {
    onClose();
    await signOut({ redirectUrl: "/" });
  };

  const initials = (user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recent";

  return (
  
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
     
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xl animate-[fadeIn_0.25s_ease]"
      />

     
      <div
        className="
          relative z-10 w-full max-w-[380px]
          rounded-2xl bg-white
          border border-gray-100
          shadow-[0_30px_90px_rgba(0,0,0,0.35)]
          max-h-[92vh] overflow-y-auto
          hide-scrollbar
          animate-[popIn_0.35s_cubic-bezier(.2,.9,.3,1.2)]
        "
      >
       
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-3 right-3 z-20
            w-7 h-7 rounded-full
            flex items-center justify-center
            text-gray-400 hover:text-black
            bg-gray-100 hover:bg-gray-200
            transition-all duration-300
          "
        >
          <FiX size={14} />
        </button>

        <div className="px-6 pt-7 pb-5">
        
          <div className="flex flex-col items-center text-center">
           
            <div className="relative mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-[26px] font-bold ring-4 ring-gray-100">
                  {initials}
                </div>
              )}

            
              <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                <FiCheckCircle className="text-green-500" size={18} />
              </span>
            </div>

           
            <h2 className="text-[20px] font-semibold tracking-[-0.03em] leading-tight text-[#111]">
              {user.name || "User"}
            </h2>

            
            <p className="mt-1 text-[12px] text-gray-500 flex items-center gap-1.5">
              <FiMail size={12} />
              {user.email}
            </p>

            
            {user.role === "admin" && (
              <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold tracking-wider uppercase">
                <FiShield size={10} />
                Admin
              </span>
            )}
          </div>

       
          <div className="mt-6 space-y-2">
            <InfoRow
              icon={<FiUser size={13} />}
              label="Provider"
              value={
                user.provider === "google"
                  ? "Google"
                  : user.provider === "email"
                  ? "Email"
                  : "Other"
              }
            />
            <InfoRow
              icon={<FiCalendar size={13} />}
              label="Joined"
              value={joinedDate}
            />
            <InfoRow
              icon={<FiShield size={13} />}
              label="Account Status"
              value="Active"
              valueClass="text-green-600 font-semibold"
            />
          </div>

         
          <button
            onClick={handleSignOut}
            className="
              mt-5 w-full
              inline-flex items-center justify-center gap-2
              rounded-lg border border-red-100
              bg-red-50 text-red-600
              py-2.5 text-[12.5px] font-semibold
              transition-all duration-300
              hover:bg-red-100 hover:border-red-200
              active:scale-[0.98]
            "
          >
            <FiLogOut size={14} />
            Sign Out
          </button>

         
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Secured by Clerk · Development
            </div>
          </div>
        </div>
      </div>

     
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}


function InfoRow({ icon, label, value, valueClass = "text-gray-800" }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-[11.5px] font-medium">{label}</span>
      </div>
      <span className={`text-[12px] font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}