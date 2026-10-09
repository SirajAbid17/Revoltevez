const SUPPRESS_PATTERNS = [
  "clerk has been loaded with development keys",
  "development instances have strict usage limits",
  "clerk.com/docs/deployments/overview",
  "clerk: clerk has been loaded",
  "clerk dev warning",
];

function shouldSuppress(args) {
  if (!args.length) return false;

  const text = args
    .map((a) => {
      try {
        if (typeof a === "string") return a;
        if (a instanceof Error) return a.message;
        return JSON.stringify(a);
      } catch {
        return String(a);
      }
    })
    .join(" ")
    .toLowerCase();

  return SUPPRESS_PATTERNS.some((p) => text.includes(p));
}

export function suppressClerkWarnings() {
  if (typeof window === "undefined") return;


  window.__clerk_dev_warning_disabled = true;
  window.CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING = true;
  window.__clerk_internal_disableDevWarning = true;

  
  const wrap = (method) => {
    const original = console[method];
    if (!original || original.__clerkWrapped) return;

    const wrapped = (...args) => {
      if (shouldSuppress(args)) return;
      original.apply(console, args);
    };

    wrapped.__clerkWrapped = true; 
    console[method] = wrapped;
  };

  wrap("warn");
  wrap("error");
  wrap("log");
}


suppressClerkWarnings();