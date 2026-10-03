import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ============================================================
   CUSTOM RENDERERS — brand-matched typography
   ============================================================ */
const components = {
  /* ---------- HEADINGS ---------- */
  h1: ({ children }) => (
    <h1 className="text-[14.5px] font-bold text-gray-900 mt-1 mb-1.5 leading-snug">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[13.5px] font-bold text-gray-900 mt-1 mb-1.5 leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[13px] font-bold text-gray-900 mt-1 mb-1 leading-snug">
      {children}
    </h3>
  ),

  /* ---------- PARAGRAPHS ---------- */
  p: ({ children }) => (
    <p className="mb-1.5 last:mb-0 leading-[1.55] text-[12.5px]">
      {children}
    </p>
  ),

  /* ---------- BOLD / ITALIC ---------- */
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,

  /* ---------- LISTS ---------- */
  ul: ({ children }) => (
    <ul className="list-none space-y-1 my-1.5 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-none space-y-1 my-1.5 pl-0 counter-reset">{children}</ol>
  ),
  li: ({ children, ordered, index }) => (
    <li className="flex gap-2 items-start leading-[1.5] text-[12.5px]">
      <span className="shrink-0 mt-[5px] w-1 h-1 rounded-full bg-gray-400" />
      <span className="flex-1">{children}</span>
    </li>
  ),

  /* ---------- LINKS ---------- */
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-500 transition-colors font-medium"
    >
      {children}
    </a>
  ),

  /* ---------- CODE ---------- */
  code: ({ inline, children, ...props }) =>
    inline ? (
      <code
        className="px-1.5 py-0.5 rounded-md bg-gray-100 text-[11.5px] font-mono text-pink-600 border border-gray-200"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className="block text-[11.5px] font-mono text-gray-800"
        {...props}
      >
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="my-2 p-2.5 rounded-lg bg-gray-900 text-white text-[11px] overflow-x-auto leading-relaxed">
      {children}
    </pre>
  ),

  /* ---------- BLOCKQUOTE ---------- */
  blockquote: ({ children }) => (
    <blockquote className="my-2 pl-3 border-l-2 border-gray-300 text-gray-600 italic text-[12px]">
      {children}
    </blockquote>
  ),

  /* ---------- TABLES ---------- */
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-[11.5px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-2.5 py-1.5 text-left font-bold text-gray-700 text-[11px] uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2.5 py-1.5 text-gray-700 border-t border-gray-100">
      {children}
    </td>
  ),

  /* ---------- DIVIDER ---------- */
  hr: () => <hr className="my-2 border-gray-200" />,

  /* ---------- IMAGES ---------- */
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="my-2 rounded-lg max-w-full h-auto border border-gray-100"
    />
  ),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function MarkdownMessage({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-body break-words">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}