import React, { useState, useRef, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RiChatVoiceAiLine } from "react-icons/ri";
import {
  FiX,
  FiSend,
  FiZap,
  FiArrowUpRight,
  FiMapPin,
  FiTruck,
  FiTag,
  FiLock,
  FiLogIn,
} from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  initChat,
  pushUserMessage,
  sendChatMessage,
  resetChat,
} from "../../store/slices/chatSlice";
import { openAuthModal } from "../../utils/authEvents";


const SUGGESTIONS = [
  { label: "Show me all bikes", icon: <FiTruck size={11} /> },
  { label: "Price range?", icon: <FiTag size={11} /> },
  { label: "Fastest model", icon: <FiZap size={11} /> },
  { label: "Factory location", icon: <FiMapPin size={11} /> },
];


const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-[13px] font-bold text-gray-900 mt-1 mb-1 leading-snug">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[12.5px] font-bold text-gray-900 mt-1 mb-1 leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[12px] font-bold text-gray-900 mt-1 mb-1 leading-snug">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-1.5 last:mb-0 leading-[1.5] text-[12px]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-none space-y-1 my-1.5 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-none space-y-1 my-1.5 pl-0">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 items-start leading-[1.5] text-[12px]">
      <span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-300 transition-colors font-medium"
    >
      {children}
    </a>
  ),
  code: ({ inline, children, ...props }) =>
    inline ? (
      <code
        className="px-1 py-0.5 rounded bg-gray-100 text-[10.5px] font-mono text-pink-600 border border-gray-200"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code className="block text-[10.5px] font-mono text-gray-100" {...props}>
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="my-2 p-2.5 rounded-lg bg-gray-900 text-white text-[10.5px] overflow-x-auto leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-1.5 pl-2.5 border-l-2 border-gray-300 text-gray-600 italic text-[11.5px]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-[10.5px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-2 py-1.5 text-left font-bold text-gray-700 text-[9.5px] uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1.5 text-gray-700 border-t border-gray-100">
      {children}
    </td>
  ),
  hr: () => <hr className="my-2 border-gray-200" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="my-1.5 rounded-lg max-w-full h-auto border border-gray-100"
    />
  ),
};


export default function FloatingButtons({ user }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useAppDispatch();
  const { messages, loading, sessionId } = useAppSelector((s) => s.chat);
  const { isLoaded, isSignedIn } = useAuth();

  
  const isLoggedIn = isLoaded && isSignedIn && !!user;

 
  useEffect(() => {
    if (isLoggedIn && user?.name) {
      dispatch(initChat(user.name));
    }
  }, [dispatch, user?.name, isLoggedIn]);

  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      dispatch(resetChat());
    }
  }, [isLoaded, isSignedIn, dispatch]);

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  
  useEffect(() => {
    if (open && isLoggedIn) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, isLoggedIn]);

  const handleSend = (textOverride) => {
    if (!isLoggedIn) {
      setOpen(false);
      openAuthModal("signin");
      return;
    }

    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    dispatch(pushUserMessage(text));
    setInput("");
    dispatch(sendChatMessage({ message: text, sessionId }));
  };

  const showSuggestions = isLoggedIn && messages.length <= 1 && !loading;

  
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[45] flex flex-col items-end gap-2.5">
     
      {open && (
        <div
          className="
            mb-1
            w-[calc(100vw-2rem)] max-w-[300px]
            h-[340px] max-h-[60vh]
            rounded-[18px] overflow-hidden bg-white
            shadow-[0_25px_70px_-10px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.03)]
            flex flex-col
            animate-[chatPop_0.32s_cubic-bezier(.16,1,.3,1)]
            origin-bottom-right
          "
        >
         
          <div className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] text-white px-3 py-2.5 shrink-0 overflow-hidden">
            <div className="absolute -top-14 -right-14 w-32 h-32 rounded-full bg-green-500/15 blur-3xl pointer-events-none" />

            <div className="relative flex items-center gap-2.5">
              <div className="shrink-0">
                <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur flex items-center justify-center ring-1 ring-white/15">
                  <RiChatVoiceAiLine className="text-white" size={14} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[12px] font-semibold tracking-tight truncate">
                    Revoltevez Assistant
                  </h3>
                  <span className="px-1.5 py-px rounded-full bg-white/10 text-[7px] font-bold tracking-wider uppercase text-white/70 shrink-0">
                    AI
                  </span>
                </div>
                <p className="text-[9.5px] text-white/55 mt-px">
                  {isLoggedIn ? "Online · Replies instantly" : "Sign in to chat"}
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="
                  shrink-0 w-7 h-7 rounded-full
                  flex items-center justify-center
                  text-white/60 hover:text-white
                  bg-white/[0.06] hover:bg-white/[0.14]
                  ring-1 ring-white/10 hover:ring-white/20
                  transition-all duration-300
                  active:scale-90
                "
              >
                <FiX size={12} />
              </button>
            </div>
          </div>

          
          {!isLoggedIn ? (
            <div
              className="flex-1 flex flex-col items-center justify-center px-5 text-center"
              style={{
                background:
                  "radial-gradient(circle at top left, #fafafa 0%, #f4f4f5 100%)",
              }}
            >
              <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
                <FiLock size={20} className="text-gray-400" />
              </div>

              <h4 className="text-[13px] font-bold text-gray-900 mb-1">
                Login required
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-4 max-w-[210px]">
                Please sign in to chat with our AI assistant.
              </p>

              <button
                onClick={() => {
                  setOpen(false);
                  openAuthModal("signin");
                }}
                className="
                  inline-flex items-center gap-1.5
                  px-4 py-2 rounded-full
                  bg-black text-white
                  text-[11.5px] font-semibold
                  hover:bg-gray-800 hover:scale-[1.03]
                  active:scale-[0.97]
                  transition-all duration-300
                "
              >
                <FiLogIn size={12} />
                Sign In
              </button>

              <p className="mt-3 text-[9px] text-gray-400 tracking-wide uppercase">
                Secured by Clerk
              </p>
            </div>
          ) : (
            <>
              
              <div
                className="
                  flex-1 overflow-y-auto px-2.5 py-2.5 space-y-2
                  chat-scroll
                "
                style={{
                  background:
                    "radial-gradient(circle at top left, #fafafa 0%, #f4f4f5 100%)",
                }}
              >
                {messages.map((m, i) => {
                  const isUser = m.role === "user";
                  const isFallback = !isUser && m.fallback;

                  return (
                    <div
                      key={i}
                      className={`flex items-end gap-1.5 animate-[msgIn_0.3s_cubic-bezier(.16,1,.3,1)] ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                      style={{ animationDelay: `${Math.min(i * 25, 120)}ms` }}
                    >
                      {!isUser && (
                        <div className="shrink-0 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center ring-1 ring-black/5 mb-0.5 w-5 h-5">
                          <RiChatVoiceAiLine className="text-white" size={10} />
                        </div>
                      )}

                      <div
                        className={`
                          max-w-[82%] px-2.5 py-1.5 rounded-2xl
                          text-[12px] leading-[1.5]
                          ${
                            isUser
                              ? "bg-gradient-to-br from-black to-[#1f1f1f] text-white rounded-br-md shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)] whitespace-pre-wrap"
                              : "bg-white text-gray-800 border border-gray-100/80 rounded-bl-md shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
                          }
                        `}
                      >
                        {isUser ? (
                          m.content
                        ) : (
                          <div className="break-words">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={markdownComponents}
                            >
                              {m.content}
                            </ReactMarkdown>

                           
                            {isFallback && m.whatsapp && (
                              <a
                                href={m.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  group mt-2 flex items-center justify-between gap-2
                                  rounded-xl
                                  bg-gradient-to-br from-[#25D366] to-[#1ea952]
                                  px-2.5 py-1.5
                                  text-white
                                  shadow-[0_6px_18px_-6px_rgba(37,211,102,0.7)]
                                  hover:shadow-[0_8px_24px_-6px_rgba(37,211,102,0.9)]
                                  hover:-translate-y-0.5
                                  active:scale-[0.98]
                                  transition-all duration-300
                                "
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm ring-1 ring-white/30">
                                    <FaWhatsapp size={11} />
                                  </span>
                                  <span className="flex flex-col leading-tight">
                                    <span className="text-[7.5px] font-bold uppercase tracking-[0.14em] text-white/85">
                                      Quick chat
                                    </span>
                                    <span className="text-[10.5px] font-bold">
                                      Message on WhatsApp
                                    </span>
                                  </span>
                                </span>
                                <FiArrowUpRight
                                  size={11}
                                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

               
                {showSuggestions && (
                  <div className="pt-1 animate-[msgIn_0.5s_cubic-bezier(.16,1,.3,1)]">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 px-1 mb-1.5">
                      Try asking
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTIONS.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(s.label)}
                          className="
                            group inline-flex items-center gap-1
                            px-2 py-1 rounded-full
                            bg-white border border-gray-200/80
                            text-[10px] font-medium text-gray-700
                            hover:border-black hover:bg-black hover:text-white
                            active:scale-95
                            transition-all duration-300
                            shadow-sm hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2)]
                          "
                        >
                          <span className="shrink-0">{s.icon}</span>
                          {s.label}
                          <FiArrowUpRight
                            size={8}
                            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                
                {loading && (
                  <div className="flex items-end gap-1.5 animate-[msgIn_0.3s_ease]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center ring-1 ring-black/5 mb-0.5">
                      <RiChatVoiceAiLine className="text-white" size={10} />
                    </div>
                    <div className="bg-white border border-gray-100/80 px-3 py-2 rounded-2xl rounded-bl-md shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]">
                      <div className="flex gap-1 items-center h-2">
                        <span
                          className="w-1 h-1 rounded-full bg-gray-400 animate-typing"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1 h-1 rounded-full bg-gray-400 animate-typing"
                          style={{ animationDelay: "180ms" }}
                        />
                        <span
                          className="w-1 h-1 rounded-full bg-gray-400 animate-typing"
                          style={{ animationDelay: "360ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              
              <div className="p-2 bg-white border-t border-gray-100 shrink-0">
                <div
                  className="
                    flex items-center gap-1
                    rounded-2xl
                    bg-gray-50
                    border border-gray-200/80
                    focus-within:border-black focus-within:bg-white
                    focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]
                    transition-all duration-300
                    pr-1
                  "
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSend()
                    }
                    placeholder="Ask about products..."
                    disabled={loading}
                    className="
                      flex-1 bg-transparent text-[11.5px] text-gray-800
                      px-2.5 py-2 outline-none
                      placeholder:text-gray-400
                      disabled:opacity-50
                    "
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="
                      shrink-0 w-7 h-7 rounded-lg
                      flex items-center justify-center
                      bg-gradient-to-br from-black to-[#1f1f1f]
                      text-white
                      hover:scale-105 active:scale-95
                      disabled:opacity-30 disabled:hover:scale-100
                      shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]
                      transition-all duration-300
                    "
                  >
                    {loading ? (
                      <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <FiSend size={11} />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      
      <a
        href="https://wa.me/923406500029"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          group relative w-10 h-10 sm:w-11 sm:h-11
          rounded-full
          bg-gradient-to-br from-[#25D366] to-[#1ea952]
          text-white
          flex items-center justify-center
          shadow-[0_8px_24px_rgba(37,211,102,0.4)]
          hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)]
          hover:scale-110 active:scale-95
          transition-all duration-300
        "
      >
        <FaWhatsapp className="text-lg sm:text-xl" />
        <span
          className="
            hidden sm:block absolute right-full mr-3
            whitespace-nowrap
            bg-black/95 backdrop-blur text-white text-[11px] font-medium
            px-3 py-1.5 rounded-lg
            opacity-0 group-hover:opacity-100
            translate-x-2 group-hover:translate-x-0
            transition-all duration-300 pointer-events-none shadow-lg
          "
        >
          Chat on WhatsApp
        </span>
      </a>

      
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chatbot"
        className="
          group relative w-10 h-10 sm:w-11 sm:h-11
          rounded-full
          bg-gradient-to-br from-black to-[#1f1f1f]
          text-white
          flex items-center justify-center
          shadow-[0_8px_24px_rgba(0,0,0,0.35)]
          hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]
          hover:scale-110 active:scale-95
          transition-all duration-300
        "
      >
        {open ? (
          <FiX className="text-base sm:text-lg" />
        ) : (
          <RiChatVoiceAiLine className="text-lg sm:text-xl" />
        )}
        <span
          className="
            hidden sm:block absolute right-full mr-3
            whitespace-nowrap
            bg-black/95 backdrop-blur text-white text-[11px] font-medium
            px-3 py-1.5 rounded-lg
            opacity-0 group-hover:opacity-100
            translate-x-2 group-hover:translate-x-0
            transition-all duration-300 pointer-events-none shadow-lg
          "
        >
          {open ? "Close chat" : "Chat with us"}
        </span>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        )}
      </button>

      
      <style>{`
        @keyframes chatPop {
          0%   { opacity: 0; transform: translateY(18px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msgIn {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%           { transform: translateY(-3px); opacity: 1; }
        }
        .animate-typing {
          animation: typing 1.4s ease-in-out infinite;
        }
        .chat-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.15) transparent;
        }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.12);
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.25);
        }
      `}</style>
    </div>
  );
}