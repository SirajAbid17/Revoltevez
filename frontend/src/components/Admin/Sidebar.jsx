import React from "react";
import { FiChevronRight, FiLogOut, FiShield } from "react-icons/fi";

export default function Sidebar({
  user,
  initials,
  navItems,
  activeSection,
  setActiveSection,
  onSignOut,
}) {
  return (
    <aside className="hidden lg:flex w-[260px] xl:w-[280px] shrink-0">
     
      <div
        className="
          fixed
          top-24
          bottom-6
          w-[260px] xl:w-[280px]
          flex flex-col gap-3
          overflow-hidden
        "
      >
       
        <div className="bg-black rounded-2xl p-5 text-white relative overflow-hidden shrink-0">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/[0.08] blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-4 relative">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-bold ring-2 ring-white/20">
                {initials(user.name)}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-[13px] font-semibold truncate">
                {user.name?.split(" ")[0]}
              </p>
              <p className="flex items-center gap-1 text-[9.5px] font-bold tracking-[0.12em] uppercase text-amber-400">
                <FiShield size={9} />
                Admin
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <p className="text-[10.5px] text-white/50 truncate">
              {user.email}
            </p>
          </div>
        </div>

        
        <nav
          className="
            bg-white rounded-2xl border border-gray-100 p-2.5
            flex-1 min-h-0 overflow-y-auto hide-scrollbar
          "
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                w-full flex items-center gap-3
                px-3.5 py-2.5 rounded-lg
                text-[13px] font-medium
                transition-all duration-200
                ${
                  activeSection === item.id
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }
              `}
            >
              <span className="text-[15px]">{item.icon}</span>
              <span>{item.label}</span>
              {activeSection === item.id && (
                <FiChevronRight size={12} className="ml-auto" />
              )}
            </button>
          ))}
        </nav>

       
        <button
          onClick={onSignOut}
          className="
            shrink-0
            w-full flex items-center gap-3
            px-4 py-2.5 rounded-2xl
            bg-white border border-gray-100
            text-[13px] font-medium text-red-600
            hover:bg-red-50 hover:border-red-100
            transition-all
          "
        >
          <FiLogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}