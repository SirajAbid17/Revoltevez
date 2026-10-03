import React from "react";

export default function MobileNav({
  navItems,
  activeSection,
  setActiveSection,
}) {
  return (
    <div className="lg:hidden w-full bg-white border-b border-gray-100">
      <div className="hide-scrollbar flex items-center gap-1.5 overflow-x-auto px-4 py-3 sm:px-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2.5
                text-[12.5px] font-medium whitespace-nowrap
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2
                ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }
              `}
            >
              <span className="text-[15px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}