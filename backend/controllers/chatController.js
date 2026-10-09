const {
  HumanMessage,
  AIMessage,
} = require("@langchain/core/messages");

const groqChat = require("../services/groqChat");
const rotator = require("../services/groqRotator");


const FALLBACK_REPLY = `I'm having a little trouble thinking right now. 🛠️

Please try again in a moment — or reach out to our team directly, they'll help you right away!

We're here for you Mon–Sat, 9:00 AM – 7:00 PM.`;

const WHATSAPP_NUMBER = "923406500029";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Revoltevez! I need help with the AI assistant."
)}`;


const SYSTEM_PROMPT = `You are Revoltevez AI Assistant — helpful, friendly assistant for Revoltevez (Private) Limited, an electric vehicle company based in Lahore, Pakistan.

## Your Role
Help customers with products, prices, specs, company info, and general questions.

## Tools Available
- **list_all_products**: Full catalog (for "show all", "list everything")
- **search_products**: Specific search by name, feature, or price
- **get_product_details**: Full details of one product by ID
- **get_catalog_overview**: High-level stats and price range
- **get_company_info**: Contact info, address, hours

## CRITICAL TOOL SELECTION RULES

**User says "show all / list all / what do you have / everything / poori list / saare / sab dikhao / all bikes"**
→ Call **list_all_products** — NEVER search_products

**User says a specific name, feature, or price ("REVOO C35", "bikes under 200000", "long range", "sab se sasti")**
→ Call **search_products**

**User asks "how many products" / "total bikes" / "kitne models hain"**
→ Call **get_catalog_overview**

**User asks about a specific product ID from previous list**
→ Call **get_product_details**

**User asks for company info / address / hours / phone**
→ Call **get_company_info**

## Response Formatting Rules

### ✅ DO:
1. **Bold** product names, prices, and key specs: **REVOO C35**, **279,000 PKR**
2. Use bullet lists for specs
3. Short paragraphs (2-3 lines)
4. Blank line between sections


### ❌ DON'T:
1. Never use markdown tables
2. Never use H1/H2 headings — use **bold** on its own line
3. Never dump raw JSON from tools
4. Never repeat the user's question
5. Never say "Here is" or "Sure!" — go straight to the answer

### Product List Format:
**REVOO C35** — 279,000 PKR
- Top speed: 60 km/h
- Range: 110 km
- Battery: 72V 35Ah

### Company Info Format:
- 📞 Phone: **0340 650 0029**
- 🌐 Website: **revolt.evez.com.pk**
- ✉️ Email: **info@revolt.evez.com.pk**
- 📍 Address: Al Ghani Industrial Area, Iqbal Chowk, Gajumata, Lahore
- 🕐 Hours: Mon–Sat · 9:00 AM – 7:00 PM

## Rules
1. ALWAYS use tools — NEVER invent product data
2. If search returns nothing, politely say so
3. If user speaks Urdu/Roman Urdu, respond in the same language
4. Be warm, concise, and beautiful to read in a small chat bubble

## Company Quick Facts
- Name: Revoltevez (Private) Limited
- Tagline: Think Unlimited
- Phone: 0340 650 0029
- Website: revolt.evez.com.pk
- Address: Al Ghani Industrial Area, Iqbal Chowk, Gajumata, Lahore
- Hours: Mon–Sat, 9:00 AM – 7:00 PM`;


const sessions = new Map();
const MAX_HISTORY = 10;

function getHistory(key) {
  if (!sessions.has(key)) {
    sessions.set(key, []);
  }
  return sessions.get(key);
}

function pushHistory(key, message) {
  const history = getHistory(key);
  history.push(message);
  if (history.length > MAX_HISTORY * 2) {
    history.splice(0, history.length - MAX_HISTORY * 2);
  }
}


exports.handleChat = async (req, res) => {
  try {
   
    if (!req.dbUser) {
      return res.status(401).json({
        success: false,
        error: "Please sign in to use the AI assistant.",
      });
    }

    const userId = req.dbUser._id.toString();
    const { message, sessionId = "default" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const sessionKey = `${userId}::${sessionId}`;
    const history = getHistory(sessionKey);

    
    const finalAnswer = await groqChat.runAgentWithRotation({
      systemPrompt: SYSTEM_PROMPT,
      history,
      userMessage: message.trim(),
    });

    
    pushHistory(sessionKey, new HumanMessage(message.trim()));
    pushHistory(sessionKey, new AIMessage(finalAnswer));

    return res.json({
      success: true,
      reply: finalAnswer,
      sessionId,
      fallback: false,
    });
  } catch (err) {
    console.error("Chat error:", err);

   
    if (err?.code === "ALL_KEYS_EXHAUSTED") {
      return res.status(200).json({
        success: true,
        reply: FALLBACK_REPLY,
        fallback: true,
        whatsapp: WHATSAPP_LINK,
        whatsappNumber: WHATSAPP_NUMBER,
        sessionId: req.body?.sessionId || "default",
      });
    }

    
    if (groqChat.isRateLimitError(err)) {
      return res.status(200).json({
        success: true,
        reply: FALLBACK_REPLY,
        fallback: true,
        whatsapp: WHATSAPP_LINK,
        whatsappNumber: WHATSAPP_NUMBER,
        sessionId: req.body?.sessionId || "default",
      });
    }

   
    return res.status(200).json({
      success: true,
      reply: FALLBACK_REPLY,
      fallback: true,
      whatsapp: WHATSAPP_LINK,
      whatsappNumber: WHATSAPP_NUMBER,
      sessionId: req.body?.sessionId || "default",
    });
  }
};


exports.clearSession = async (req, res) => {
  if (!req.dbUser) {
    return res.status(401).json({
      success: false,
      error: "Please sign in.",
    });
  }

  const userId = req.dbUser._id.toString();
  const { sessionId } = req.params;

  sessions.delete(`${userId}::${sessionId}`);

  res.json({ success: true, message: "Session cleared" });
};


exports.getKeysStats = async (req, res) => {
  try {
    if (!req.dbUser || req.dbUser.role !== "admin") {
      return res.status(403).json({ success: false, error: "Admin only" });
    }
    res.json({ success: true, stats: rotator.stats() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.resetKeys = async (req, res) => {
  try {
    if (!req.dbUser || req.dbUser.role !== "admin") {
      return res.status(403).json({ success: false, error: "Admin only" });
    }
    rotator.resetAll();
    res.json({ success: true, message: "All Groq keys reset" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};