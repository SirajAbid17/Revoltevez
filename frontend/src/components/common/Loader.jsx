import React from "react";



const SIZES = {
  xs: { spinner: "w-3.5 h-3.5 border-2", text: "text-[10.5px]", gap: "gap-2" },
  sm: { spinner: "w-5 h-5 border-2", text: "text-[11.5px]", gap: "gap-2" },
  md: { spinner: "w-9 h-9 border-[3px]", text: "text-[12.5px]", gap: "gap-3" },
  lg: { spinner: "w-12 h-12 border-[3px]", text: "text-[13px]", gap: "gap-3.5" },
};

export default function Loader({
  size = "md",
  text,
  fullPage = false,
  inline = false,
  color = "black",
  bg = "#f7f7f5",
  className = "",
}) {
  const cfg = SIZES[size] || SIZES.md;

  const spinnerClasses = `
    ${cfg.spinner}
    rounded-full animate-spin
    border-gray-200
    ${color === "white" ? "border-t-white" : "border-t-black"}
  `;


  if (inline) {
    return (
      <span className={`inline-flex items-center ${cfg.gap} ${className}`}>
        <span className={spinnerClasses} />
        {text && (
          <span className={`${cfg.text} text-gray-500 font-medium`}>
            {text}
          </span>
        )}
      </span>
    );
  }

  
  const content = (
    <div
      className={`
        flex flex-col items-center justify-center text-center
        ${cfg.gap} ${className}
      `}
    >
      <div className={spinnerClasses} />
      {text && (
        <p className={`${cfg.text} text-gray-500 font-medium tracking-tight`}>
          {text}
        </p>
      )}
    </div>
  );


  if (fullPage) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        {content}
      </div>
    );
  }

  return content;
}