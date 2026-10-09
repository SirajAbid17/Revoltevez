import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiX,
  FiChevronDown,
  FiShield,
  FiArrowUpRight,
  FiPackage,
  FiInfo,
  FiTool,
  FiMapPin,
  FiBookOpen,
  FiStar,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearUser, logoutUser } from "../../store/slices/authSlice";
import { AUTH_MODAL_EVENT } from "../../utils/authEvents";
import AuthModal from "../Auth/AuthModal";
import ProfileModal from "../Auth/ProfileModal";
import MobileDrawer from "./MobileDrawer";
import FloatingButtons from "./FloatingButtons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [logoError, setLogoError] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const isLoggedIn = isLoaded && isSignedIn && !signingOut;

 
  const isAdmin = isLoggedIn && user?.role === "admin";

  const wasSignedInRef = useRef(null);
  const location = useLocation();
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const profileMenuRef = useRef(null);

  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  useEffect(() => {
    const handler = (e) => {
      const mode = e.detail?.mode || "signin";
      setAuthMode(mode);
      setAuthOpen(true);
    };
    window.addEventListener(AUTH_MODAL_EVENT, handler);
    return () => window.removeEventListener(AUTH_MODAL_EVENT, handler);
  }, []);


  useEffect(() => {
    if (!isLoaded) return;
    if (wasSignedInRef.current === null) {
      wasSignedInRef.current = isSignedIn;
      return;
    }
    if (wasSignedInRef.current === true && isSignedIn === false) {
      setProfileOpen(false);
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
      setSigningOut(false);
      dispatch(clearUser());
    }
    wasSignedInRef.current = isSignedIn;
  }, [isSignedIn, isLoaded, dispatch]);

  
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

 
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setProfileMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);


  useEffect(() => {
    const onClick = (e) => {
      if (
        profileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [profileMenuOpen]);

  const showWhite = !scrolled || hovered;

  const openAuth = (mode = "signin") => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileMenuOpen(false);
  };

  const initials = (user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navLinks = [
    { to: "/products", label: "Products", icon: <FiPackage size={15} /> },
    { to: "/stories", label: "Stories", icon: <FiBookOpen size={15} /> },
    { to: "/about", label: "About Us", icon: <FiInfo size={15} /> },
    { to: "/services", label: "Services", icon: <FiTool size={15} /> },
    { to: "/find-a-store", label: "Find a Store", icon: <FiMapPin size={15} /> },
  ];


  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = linkRefs.current[location.pathname];
      if (activeLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      } else {
        setIndicatorStyle({ left: 0, width: 0 });
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  const handleLinkHover = (to) => {
    setHoveredLink(to);
    const link = linkRefs.current[to];
    if (link && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
    const activeLink = linkRefs.current[location.pathname];
    if (activeLink && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    } else {
      setIndicatorStyle({ left: 0, width: 0 });
    }
  };

  
  const handleDesktopSignOut = async () => {
    setProfileMenuOpen(false);
    setSigningOut(true);
    dispatch(clearUser());
    await dispatch(logoutUser());
    await signOut({ redirectUrl: "/" });
  };

  return (
    <>
      
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          fixed top-0 left-0 z-50 w-full
          transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
          ${
            mobileMenuOpen
              ? "bg-white/95 backdrop-blur-2xl text-black border-b border-gray-200/60"
              : showWhite
              ? "bg-white/85 backdrop-blur-2xl text-black border-b border-gray-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
              : "bg-transparent text-white border-b border-white/[0.05]"
          }
        `}
      >
        {!showWhite && !mobileMenuOpen && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none" />
        )}

        <div
          className={`
            absolute top-0 left-0 right-0 h-[1.5px] transition-all duration-1000
            ${
              showWhite || mobileMenuOpen
                ? "opacity-100 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                : "opacity-0"
            }
          `}
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="h-[64px] sm:h-[72px] lg:h-[78px] flex items-center justify-between gap-4 lg:gap-8">
          
            <Link to="/" className="flex items-center gap-0 shrink-0 group relative">
              <div className="relative shrink-0 flex items-center -mr-1">
                {logoError ? (
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center
                      font-black text-[14px] tracking-tighter leading-none
                      transition-transform duration-500 group-hover:scale-105
                      ${
                        showWhite || mobileMenuOpen
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }
                    `}
                  >
                    RZ
                  </div>
                ) : (
                  <img
                    src="/icons.png"
                    alt="Revoltevez"
                    onError={() => setLogoError(true)}
                    onLoad={(e) => {
                      if (!e.target.naturalWidth || !e.target.naturalHeight) {
                        setLogoError(true);
                      }
                    }}
                    className={`
                      w-11 h-16 sm:w-12 sm:h-20 object-contain
                      transition-transform duration-500 group-hover:scale-105
                      ${showWhite || mobileMenuOpen ? "" : "brightness-0 invert"}
                    `}
                  />
                )}
                <div
                  className={`
                    absolute inset-0 rounded-full blur-lg -z-10 transition-opacity duration-500
                    ${
                      showWhite || mobileMenuOpen
                        ? "opacity-0"
                        : "opacity-40 bg-white/40"
                    }
                  `}
                />
              </div>

              <span
                className={`
                  text-[17px] sm:text-[19px] lg:text-[21px]
                  font-bold tracking-[-0.035em] leading-none
                  transition-colors duration-500
                  ${showWhite || mobileMenuOpen ? "text-black" : "text-white"}
                `}
              >
                Revoltevez
              </span>
            </Link>

          
            <nav
              ref={navRef}
              onMouseLeave={handleLinkLeave}
              className="hidden lg:flex items-center relative"
            >
              <div
                className={`
                  absolute top-0 bottom-0 rounded-full
                  transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
                  pointer-events-none
                  ${showWhite ? "bg-gray-100" : "bg-white/[0.10]"}
                  ${!hoveredLink && location.pathname === "/" ? "opacity-0" : ""}
                `}
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />

              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                const isHovered = hoveredLink === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    ref={(el) => (linkRefs.current[link.to] = el)}
                    onMouseEnter={() => handleLinkHover(link.to)}
                    className={`
                      relative z-10 px-4 py-2
                      text-[13px] font-medium tracking-[-0.01em]
                      transition-colors duration-300
                      ${
                        showWhite
                          ? isActive || isHovered
                            ? "text-black"
                            : "text-gray-500"
                          : isActive || isHovered
                          ? "text-white"
                          : "text-white/65"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

           
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className={`
                    group relative overflow-hidden
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-full
                    text-[11.5px] font-bold tracking-[0.05em] uppercase
                    transition-all duration-500
                    ${
                      showWhite
                        ? "bg-black text-white hover:bg-gray-900"
                        : "bg-white text-black hover:bg-gray-100"
                    }
                  `}
                >
                  <FiShield
                    size={12}
                    className="transition-transform duration-700 group-hover:rotate-[20deg]"
                  />
                  Admin
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </Link>
              )}

              {isLoggedIn ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileMenuOpen((v) => !v)}
                    className={`
                      group flex items-center gap-2
                      pl-1 pr-2.5 py-1 rounded-full border
                      transition-all duration-500
                      ${
                        showWhite
                          ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                          : "bg-white/[0.08] border-white/15 hover:bg-white/[0.14] hover:border-white/25"
                      }
                    `}
                  >
                    <div className="relative">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className={`
                            w-7 h-7 rounded-full object-cover ring-2 transition-all duration-500
                            ${
                              showWhite
                                ? "ring-gray-200 group-hover:ring-gray-400"
                                : "ring-white/20 group-hover:ring-white/40"
                            }
                          `}
                        />
                      ) : (
                        <div
                          className={`
                            w-7 h-7 rounded-full flex items-center justify-center
                            text-[10px] font-bold ring-2
                            ${
                              showWhite
                                ? "bg-black text-white ring-gray-200"
                                : "bg-white text-black ring-white/20"
                            }
                          `}
                        >
                          {initials}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-white" />
                      </span>
                    </div>

                    <span
                      className={`
                        text-[12.5px] font-semibold leading-tight tracking-[-0.01em]
                        ${showWhite ? "text-gray-900" : "text-white"}
                      `}
                    >
                      {user?.name?.split(" ")[0] || "User"}
                    </span>

                    <FiChevronDown
                      size={11}
                      className={`
                        opacity-50 group-hover:opacity-100 transition-all duration-300
                        ${profileMenuOpen ? "rotate-180" : ""}
                        ${showWhite ? "text-black" : "text-white"}
                      `}
                    />
                  </button>

                  {profileMenuOpen && (
                    <div
                      className="
                        absolute right-0 top-full mt-2 w-[210px]
                        rounded-2xl border p-1.5 border-gray-100 bg-white
                        shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                        animate-[dropIn_0.2s_ease-out]
                      "
                    >
                      <div className="px-3 py-2.5 mb-1 border-b border-gray-100">
                        <p className="text-[12.5px] font-bold text-[#111] truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-[10.5px] text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setProfileOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiUser size={13} className="text-gray-400" />
                        <span className="flex-1 text-left">My Profile</span>
                      </button>

                      <Link
                        to="/feedback"
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiStar size={13} className="text-gray-400" />
                        <span className="flex-1 text-left">Feedback</span>
                      </Link>

                      <div className="my-1 h-px bg-gray-100" />

                      <button
                        onClick={handleDesktopSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut size={13} />
                        <span className="flex-1 text-left">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuth("signin")}
                  className={`
                    group relative overflow-hidden
                    inline-flex items-center gap-2
                    px-5 py-2 rounded-full
                    text-[12.5px] font-semibold tracking-[-0.01em]
                    transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]
                    ${showWhite ? "bg-black text-white" : "bg-white text-black"}
                    hover:scale-[1.03] active:scale-[0.97]
                  `}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Login
                    <FiArrowUpRight
                      size={12}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </button>
              )}
            </div>

            
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Menu"
              className={`
                lg:hidden relative w-10 h-10 flex items-center justify-center
                rounded-full border transition-all duration-300 active:scale-95
                ${
                  showWhite || mobileMenuOpen
                    ? "border-gray-200 hover:bg-gray-100 bg-white text-black"
                    : "border-white/20 hover:bg-white/10 bg-white/[0.06] text-white"
                }
              `}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`
                    absolute left-0 right-0 h-[1.5px] rounded-full
                    transition-all duration-300
                    ${
                      mobileMenuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45 bg-black"
                        : "top-1 bg-current"
                    }
                  `}
                />
                <span
                  className={`
                    absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] rounded-full
                    transition-all duration-300
                    ${mobileMenuOpen ? "opacity-0 bg-black" : "bg-current"}
                  `}
                />
                <span
                  className={`
                    absolute left-0 right-0 h-[1.5px] rounded-full
                    transition-all duration-300
                    ${
                      mobileMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45 bg-black"
                        : "bottom-1 bg-current"
                    }
                  `}
                />
              </div>

              {!mobileMenuOpen && isLoggedIn && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

     
      <div className="h-[64px] sm:h-[72px] lg:h-[78px]" />

     
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        user={user}
        isLoggedIn={isLoggedIn}
        initials={initials}
        pathname={location.pathname}
        onOpenProfile={() => setProfileOpen(true)}
        onLogin={() => openAuth("signin")}
      />

    
      <FloatingButtons user={user} />

      
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}