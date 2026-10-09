import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiCode,
  FiX,
  FiCopy,
  FiCheck,
  FiZap,
  FiUser,
  FiSmartphone,
  FiArrowUpRight,
  FiLayout,
  FiServer,
  FiSmartphone as FiMobile,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiTerminal,
  FiPenTool,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { DEVELOPER } from "./footerData";


function AvatarImage({ src, alt, iconSize = 26 }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
        <FiUser size={iconSize} strokeWidth={1.8} className="text-white/70" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover object-center"
      onError={() => setFailed(true)}
    />
  );
}


export default function DeveloperModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(null);
  const [coverFailed, setCoverFailed] = useState(false);


  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

 
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
    
    }
  };

  if (!isOpen) return null;

  
  const contacts = [
    {
      key: "phone",
      label: "Mobile",
      value: DEVELOPER.phone,
      href: `tel:+${DEVELOPER.whatsapp}`,
      external: false,
      icon: <FiSmartphone size={13} strokeWidth={2.2} />,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "sirajabid17",
      href: DEVELOPER.linkedin,
      external: true,
      icon: <FiLinkedin size={13} strokeWidth={2.2} />,
      gradient: "from-sky-400 to-blue-600",
    },
    {
      key: "email",
      label: "Gmail",
      value: DEVELOPER.email,
      href: `mailto:${DEVELOPER.email}`,
      external: false,
      icon: <FiMail size={13} strokeWidth={2.2} />,
      gradient: "from-rose-400 to-red-600",
    },
  ];

  
  const socials = [
    {
      label: "GitHub",
      href: DEVELOPER.github,
      icon: <FiGithub size={13} strokeWidth={2.2} />,
      gradient: "from-gray-600 to-gray-900",
    },
    {
      label: "Instagram",
      href: DEVELOPER.instagram,
      icon: <FiInstagram size={13} strokeWidth={2.2} />,
      gradient: "from-pink-500 via-fuchsia-500 to-orange-500",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${DEVELOPER.whatsapp}`,
      icon: <FaWhatsapp size={13} />,
      gradient: "from-[#25D366] to-[#1ea952]",
    },
  ];

  
  const skillsData = [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Angular", "Tailwind", "Bootstrap", "Material UI"],
      icon: <FiLayout size={12} strokeWidth={2.2} />,
      gradient: "from-sky-400 to-blue-600",
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Firebase", "REST APIs"],
      icon: <FiServer size={12} strokeWidth={2.2} />,
      gradient: "from-emerald-400 to-green-600",
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo"],
      icon: <FiMobile size={12} strokeWidth={2.2} />,
      gradient: "from-purple-400 to-fuchsia-600",
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL", "Redis"],
      icon: <FiDatabase size={12} strokeWidth={2.2} />,
      gradient: "from-amber-400 to-orange-600",
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "AWS", "Nginx", "Microservices", "Git"],
      icon: <FiCloud size={12} strokeWidth={2.2} />,
      gradient: "from-cyan-400 to-teal-600",
    },
    {
      category: "AI & LLMs",
      items: ["LangChain", "LangGraph", "RAG", "Gemini", "Groq API"],
      icon: <FiCpu size={12} strokeWidth={2.2} />,
      gradient: "from-rose-400 to-pink-600",
    },
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python"],
      icon: <FiTerminal size={12} strokeWidth={2.2} />,
      gradient: "from-yellow-400 to-amber-600",
    },
    {
      category: "Styling",
      items: ["CSS3", "SCSS", "Tailwind CSS", "Styled Components", "Framer Motion"],
      icon: <FiPenTool size={12} strokeWidth={2.2} />,
      gradient: "from-indigo-400 to-violet-600",
    },
  ];

  return (
    <div className="fixed inset-0 z-[300] overflow-hidden animate-[fadeIn_0.4s_ease]">
   
      {coverFailed ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a]" />
      ) : (
        <img
          src={DEVELOPER.coverImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setCoverFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

    
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/85" />

     
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

    
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/[0.08] blur-3xl" />

     
      <div className="relative z-10 h-full w-full flex flex-col px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-5">

       
        <div className="flex items-start justify-between shrink-0 w-full">
          <button
            onClick={onClose}
            aria-label="Close"
            className="
              w-8 h-8 rounded-full
              bg-black/40 hover:bg-black/60
              ring-1 ring-white/20 hover:ring-white/40
              flex items-center justify-center
              text-white/90 hover:text-white
              transition-all duration-300
              active:scale-90
              backdrop-blur-md
              hover:rotate-90
            "
          >
            <FiX size={15} strokeWidth={2.4} />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-100">
              Available
            </span>
          </div>
        </div>

        
        <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-6 xl:gap-8 lg:items-center py-2.5 sm:py-3 w-full">

         
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2.5 sm:gap-3">
         
            <div className="relative shrink-0">
              <span className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-emerald-400 via-white/50 to-blue-500 opacity-90 blur-md animate-[spin_10s_linear_infinite]" />

              <div className="relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lg:w-[86px] lg:h-[86px] rounded-full p-[3px] bg-black/70 backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 ring-2 ring-white/20">
                  <AvatarImage
                    src={DEVELOPER.avatar}
                    alt={DEVELOPER.name}
                    iconSize={24}
                  />
                </div>
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-[3px] border-black/80 shadow-[0_0_0_3px_rgba(16,185,129,0.35)]" />
              </div>
            </div>

           
            <div className="min-w-0 w-full">
              <h2 className="text-[19px] sm:text-[23px] lg:text-[27px] font-bold tracking-[-0.03em] text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {DEVELOPER.name}
              </h2>

              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/25 backdrop-blur-md">
                <FiCode size={9} className="text-white/95" strokeWidth={2.4} />
                <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.15em] text-white/95">
                  {DEVELOPER.role}
                </span>
              </div>

              <p className="mt-2 text-[11px] sm:text-[12px] leading-snug text-white/75 italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                "{DEVELOPER.tagline}"
              </p>

              <div className="mt-1.5 flex items-center justify-center lg:justify-start gap-1.5 text-[10px] text-white/60">
                <FiMapPin size={9.5} className="text-white/70" />
                <span>{DEVELOPER.location}</span>
              </div>
            </div>

           
            <div className="grid grid-cols-4 gap-1.5 w-full max-w-[400px]">
              {DEVELOPER.stats.map((s, i) => (
                <div
                  key={i}
                  className="
                    flex flex-col items-center text-center
                    rounded-lg bg-black/40 backdrop-blur-md
                    border border-white/15 p-2
                  "
                >
                  <span className="text-white/60 mb-0.5">{s.icon}</span>
                  <p className="text-[11.5px] sm:text-[12.5px] font-bold text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                    {s.value}
                  </p>
                  <p className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-[0.08em] text-white/55 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

          
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-[400px]">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    group relative overflow-hidden
                    flex items-center justify-center gap-1.5
                    rounded-lg border border-white/15 bg-black/40
                    backdrop-blur-md px-2 py-2
                    transition-all duration-300
                    hover:border-white/40 hover:bg-black/60
                    hover:-translate-y-0.5
                  "
                >
                  <span
                    className={`
                      absolute inset-0 opacity-0 group-hover:opacity-40
                      bg-gradient-to-br ${s.gradient}
                      transition-opacity duration-300
                    `}
                  />

                  <span className="relative flex items-center gap-1 text-white">
                    <span className="text-white/90">{s.icon}</span>
                    <span className="text-[9.5px] font-bold tracking-wide">
                      {s.label}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

        
          <div className="min-h-0 w-full mt-3 lg:mt-0">
            <div className="rounded-xl bg-black/45 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-2.5 sm:p-3">
              <div className="flex items-center justify-between mb-2 px-0.5">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/75">
                  Tech Stack
                </p>
                <span className="flex items-center gap-1 text-[9px] font-bold tracking-[0.15em] text-white/70">
                  <FiZap size={9.5} className="fill-amber-400 text-amber-400" />
                  {DEVELOPER.availability.split("·")[0].trim()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skillsData.map((s, i) => (
                  <div
                    key={i}
                    className="
                      flex items-start gap-2
                      rounded-lg bg-white/[0.05] border border-white/10
                      p-2
                      transition-all duration-300
                      hover:bg-white/[0.1] hover:border-white/25
                    "
                  >
                    <div
                      className={`
                        shrink-0 w-7 h-7 rounded-md
                        bg-gradient-to-br ${s.gradient}
                        flex items-center justify-center text-white
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_10px_-2px_rgba(0,0,0,0.4)]
                      `}
                    >
                      {s.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-white/55 mb-0.5">
                        {s.category}
                      </p>
                      <p className="text-[10px] sm:text-[10.5px] leading-tight text-white/90 font-medium">
                        {s.items.join(" · ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

       
        <div className="shrink-0 w-full">
          <div className="rounded-xl bg-black/45 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-2.5 sm:p-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {contacts.map((c) => {
                const isCopied = copied === c.key;
                return (
                  <div
                    key={c.key}
                    className="
                      group relative flex items-center gap-2
                      rounded-lg border border-white/15 bg-black/30
                      backdrop-blur-md p-2
                      transition-all duration-300
                      hover:border-white/35 hover:bg-black/50
                      hover:-translate-y-0.5
                    "
                  >
                    <div
                      className={`
                        shrink-0 w-7 h-7 rounded-md
                        bg-gradient-to-br ${c.gradient}
                        flex items-center justify-center text-white
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_16px_-4px_rgba(0,0,0,0.5)]
                      `}
                    >
                      {c.icon}
                    </div>

                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="min-w-0 flex-1 block focus:outline-none"
                    >
                      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/60">
                        {c.label}
                      </p>
                      <p className="text-[10.5px] font-semibold text-white truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                        {c.value}
                      </p>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(c.value, c.key)}
                      aria-label={`Copy ${c.label}`}
                      className={`
                        shrink-0 w-6 h-6 rounded-md
                        flex items-center justify-center
                        transition-all duration-300 active:scale-90
                        ${
                          isCopied
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/15"
                        }
                      `}
                    >
                      {isCopied ? (
                        <FiCheck size={10} strokeWidth={3} />
                      ) : (
                        <FiCopy size={9.5} strokeWidth={2.2} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            
            <a
              href={`https://wa.me/${DEVELOPER.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group mt-2 flex items-center justify-between
                rounded-lg
                bg-gradient-to-br from-[#25D366] via-[#1ebe5d] to-[#1ea952]
                px-3.5 py-2
                text-white
                shadow-[0_12px_32px_-12px_rgba(37,211,102,0.75)]
                hover:shadow-[0_16px_40px_-12px_rgba(37,211,102,0.9)]
                hover:-translate-y-0.5
                transition-all duration-300
                overflow-hidden relative
              "
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="relative flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm ring-1 ring-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  <FaWhatsapp size={13} />
                </span>
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/85">
                    Quick chat
                  </span>
                  <span className="text-[11px] font-bold">
                    Message on WhatsApp
                  </span>
                </span>
              </span>

              <span className="relative flex h-5.5 w-5.5 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm ring-1 ring-white/25 transition-transform duration-300 group-hover:translate-x-0.5">
                <FiArrowUpRight size={11} strokeWidth={2.4} />
              </span>
            </a>
          </div>
        </div>
      </div>

     
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}