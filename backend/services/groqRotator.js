
const COOLDOWN_MS = Number(process.env.GROQ_KEY_COOLDOWN_MS) || 60_000;
const AUTH_COOLDOWN_MS =
  Number(process.env.GROQ_AUTH_COOLDOWN_MS) || 5 * 60_000;


function collectKeys() {
  const keys = [];
  for (let i = 1; i <= 20; i++) {
    const k = process.env[`GROQ_API_KEY_${i}`];
    if (k && k.trim()) keys.push(k.trim());
  }
  
  if (keys.length === 0 && process.env.GROQ_API_KEY) {
    keys.push(process.env.GROQ_API_KEY.trim());
  }
  return keys;
}

const KEYS = collectKeys();

if (KEYS.length === 0) {
  console.warn(
    "[GroqRotator] No API keys found. Set GROQ_API_KEY_1 ... GROQ_API_KEY_N in .env"
  );
} else {
  console.log(`[GroqRotator] Loaded ${KEYS.length} Groq API key(s)`);
}


const state = KEYS.map((key, index) => ({
  index,
  key,
  exhaustedUntil: 0,
  failureCount: 0,
}));

let currentIndex = 0;

const isAvailable = (s) => Date.now() >= s.exhaustedUntil;


function getKey() {
  if (state.length === 0) return null;

  
  for (let i = 0; i < state.length; i++) {
    const idx = (currentIndex + i) % state.length;
    if (isAvailable(state[idx])) {
      currentIndex = idx;
      return state[idx].key;
    }
  }
  return null;
}


function markExhausted(key, customCooldownMs) {
  const s = state.find((x) => x.key === key);
  if (!s) return;

  const cooldown =
    customCooldownMs != null ? customCooldownMs : COOLDOWN_MS;

  s.exhaustedUntil = Date.now() + cooldown;
  s.failureCount++;

  const secs = Math.round(cooldown / 1000);
  console.warn(
    ` [GroqRotator] Key #${s.index + 1} exhausted — cooldown ${secs}s (total failures: ${s.failureCount})`
  );

  
  currentIndex = (currentIndex + 1) % state.length;
}


function resetAll() {
  const now = 0;
  state.forEach((s) => {
    s.exhaustedUntil = now;
    s.failureCount = 0;
  });
  currentIndex = 0;
  console.log("[GroqRotator] All keys reset");
}


function stats() {
  const now = Date.now();
  return {
    total: state.length,
    availableCount: state.filter((s) => now >= s.exhaustedUntil).length,
    keys: state.map((s) => ({
      index: s.index + 1,
      preview: s.key.slice(0, 12) + "…" + s.key.slice(-4),
      available: now >= s.exhaustedUntil,
      cooldownLeftMs: Math.max(0, s.exhaustedUntil - now),
      failureCount: s.failureCount,
    })),
  };
}

module.exports = {
  getKey,
  markExhausted,
  resetAll,
  stats,
  total: state.length,
  COOLDOWN_MS,
  AUTH_COOLDOWN_MS,
};