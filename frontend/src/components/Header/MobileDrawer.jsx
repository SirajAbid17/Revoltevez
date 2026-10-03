import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiX,
  FiShield,
  FiArrowUpRight,
  FiChevronRight,
  FiStar,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useClerk } from "@clerk/clerk-react";

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
  user,
  isLoggedIn,
  initials,
  pathname,
  onOpenProfile,
  onLogin,
}) {
  const { signOut } = useClerk();

  /* ============ LOCK BODY SCROLL WHEN OPEN ============ */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ============ ESC CLOSE ============ */
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  const handleSignOut = async () => {
    onClose();
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div
      className={`
        fixed inset-0 z-[55] lg:hidden
        transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer panel */}
      <div
        className={`
          absolute top-0 right-0 bottom-0
          w-full max-w-[340px]
          bg-white shadow-[0_0_80px_rgba(0,0,0,0.35)]
          flex flex-col
          transition-transform duration-400 ease-[cubic-bezier(.2,.9,.3,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* ============ DRAWER HEADER ============ */}
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-gray-100 shrink-0">
          <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all"
          >
            <FiX size={15} />
          </button>
        </div>

        {/* ============ USER CARD ============ */}
        {isLoggedIn && user && (
          <div className="px-4 pt-4 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenProfile();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all text-left"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-[13px] font-bold shrink-0">
                  {initials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-bold text-[#111] truncate">
                  {user.name || "User"}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
              <FiChevronRight size={14} className="text-gray-400 shrink-0" />
            </button>
          </div>
        )}

        {/* ============ NAV LINKS ============ */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 hide-scrollbar">
          <p className="px-3 mb-2 text-[9.5px] font-bold tracking-[0.25em] text-gray-400 uppercase">
            Navigate
          </p>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-3
                    px-3.5 py-3 rounded-xl
                    text-[13.5px] font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <span
                    className={`text-[16px] ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ============ ADMIN LINK ============ */}
          {user?.role === "admin" && (
            <>
              <p className="px-3 mt-6 mb-2 text-[9.5px] font-bold tracking-[0.25em] text-gray-400 uppercase">
                Admin
              </p>
              <Link
                to="/admin/dashboard"
                onClick={onClose}
                className="
                  group flex items-center gap-3
                  px-3.5 py-3 rounded-xl
                  bg-amber-50 border border-amber-100
                  text-[13.5px] font-semibold text-amber-800
                  hover:bg-amber-100 transition-all
                "
              >
                <span className="text-[16px] text-amber-600">
                  <FiShield size={15} />
                </span>
                <span className="flex-1">Admin Dashboard</span>
                <FiArrowUpRight size={13} className="text-amber-600" />
              </Link>
            </>
          )}

          {/* ============ ACCOUNT ============ */}
          {isLoggedIn && (
            <>
              <p className="px-3 mt-6 mb-2 text-[9.5px] font-bold tracking-[0.25em] text-gray-400 uppercase">
                Account
              </p>

              <button
                onClick={() => {
                  onClose();
                  onOpenProfile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <span className="text-[16px] text-gray-400">
                  <FiUser size={15} />
                </span>
                <span className="flex-1 text-left">My Profile</span>
                <FiChevronRight size={14} className="text-gray-400" />
              </button>

              <Link
                to="/feedback"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <span className="text-[16px] text-gray-400">
                  <FiStar size={15} />
                </span>
                <span className="flex-1 text-left">Feedback</span>
                <FiChevronRight size={14} className="text-gray-400" />
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <span className="text-[16px]">
                  <FiLogOut size={15} />
                </span>
                <span className="flex-1 text-left">Sign Out</span>
              </button>
            </>
          )}
        </nav>

        {/* ============ LOGIN FOOTER ============ */}
        {!isLoggedIn && (
          <div className="p-4 border-t border-gray-100 shrink-0">
            <button
              onClick={onLogin}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all"
            >
              Login
              <FiArrowUpRight size={13} />
            </button>
            <p className="mt-2.5 text-center text-[10.5px] text-gray-400">
              Secured by Clerk
            </p>
          </div>
        )}

        <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
      </div>
    </div>
  );
}