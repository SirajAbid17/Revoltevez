import React from "react";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLinkedin,
  FiHeart,
  FiSmartphone,
  FiAward,
  FiUsers,
  FiLayers,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiMonitor,
  FiTerminal,
} from "react-icons/fi";


export const DEVELOPER = {
  name: "Siraj Abid",
  role: "Full-Stack Engineer",
  avatar: "/siraj.webp",
  coverImage:
    "https://plus.unsplash.com/premium_photo-1701860973839-50283472d9fc?w=600&auto=format&fit=crop&q=60",
  phone: "03287303593",
  whatsapp: "923287303593",
  email: "sirajabid641@gmail.com",
  linkedin: "https://www.linkedin.com/in/sirajabid17",
  github: "https://github.com/SirajAbid17",
  instagram: "https://www.instagram.com/sirajabid17",
  location: "Muzaffargarh, Punjab, Pakistan",
  company: "Freelance | Self-Employed",
  tagline: "Crafting digital experiences that feel effortless.",
  availability: "Open to Work · Remote · Hybrid · On-site",

  stats: [
    { label: "Experience", value: "2+ Yrs", icon: <FiAward /> },
    { label: "Connections", value: "500+", icon: <FiUsers /> },
    { label: "Followers", value: "14K+", icon: <FiHeart /> },
    { label: "Projects", value: "10+", icon: <FiLayers /> },
  ],

  skills: [
    {
      category: "Frontend",
      icon: <FiMonitor />,
      gradient: "from-sky-400 to-blue-600",
      items: ["React.js", "Next.js", "Angular", "Tailwind", "Bootstrap", "Material UI"],
    },
    {
      category: "Backend",
      icon: <FiTerminal />,
      gradient: "from-emerald-400 to-emerald-600",
      items: ["Node.js", "Express.js", "Firebase", "REST APIs"],
    },
    {
      category: "Mobile",
      icon: <FiSmartphone />,
      gradient: "from-violet-400 to-purple-600",
      items: ["React Native", "Expo"],
    },
    {
      category: "Databases",
      icon: <FiDatabase />,
      gradient: "from-amber-400 to-orange-600",
      items: ["MongoDB", "MySQL", "Redis"],
    },
    {
      category: "DevOps & Cloud",
      icon: <FiCloud />,
      gradient: "from-cyan-400 to-teal-600",
      items: ["Docker", "AWS", "Nginx", "Microservices", "Git"],
    },
    {
      category: "AI & LLMs",
      icon: <FiCpu />,
      gradient: "from-rose-400 to-pink-600",
      items: ["LangChain", "LangGraph", "RAG", "Gemini", "Groq API"],
    },
  ],
};


export const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Our Bikes", to: "/products" },
  { label: "Stories", to: "/stories" },
  { label: "About Us", to: "/about" },
 
];

export const COMPANY_LINKS = [
 
  { label: "Services", to: "/services" },
  { label: "Feedback", to: "/feedback" },
  { label: "Privacy Policy", to: "/privacy" },
    { label: "Find a Store", to: "/find-a-store" },
];




export const LINK_CLASS =
  "group inline-flex items-center gap-2 text-[13.5px] sm:text-sm text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-white/40";

export const ICON_LINK_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/45 transition-all duration-300 hover:border-white hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]";