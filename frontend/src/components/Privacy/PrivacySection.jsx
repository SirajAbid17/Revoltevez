import React from "react";


export default function PrivacySection({ section, index }) {
  const { Icon } = section; 

  return (
    <section
      className="
        group relative bg-white rounded-2xl border border-gray-100
        p-5 sm:p-6
        hover:border-gray-200
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        transition-all duration-300
      "
    >
     
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-black group-hover:text-white text-gray-700 flex items-center justify-center transition-all duration-300 shrink-0">
          <Icon size={18} />
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[9.5px] font-bold tracking-[0.2em] text-gray-300 tabular-nums shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-[15px] sm:text-[16px] font-semibold text-[#111] tracking-tight truncate">
            {section.title}
          </h2>
        </div>
      </div>

    
      {section.body?.map((p, j) => (
        <p
          key={j}
          className="text-[13px] sm:text-[13.5px] text-gray-600 leading-relaxed mb-3 last:mb-0"
        >
          {p}
        </p>
      ))}

      
      {section.list && (
        <ul className="mt-2 space-y-2.5">
          {section.list.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-[13px] text-gray-600 leading-relaxed"
            >
              <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>
                {item.label && (
                  <strong className="font-semibold text-[#111]">
                    {item.label}:{" "}
                  </strong>
                )}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}