const { ChatGroq } = require("@langchain/groq");
const { HumanMessage, SystemMessage, AIMessage, ToolMessage } = require("@langchain/core/messages");
const tools = require("../services/chatTools");

// ============ LLM INSTANCE ============
const llm = new ChatGroq({
  model: "openai/gpt-oss-120b", // free & powerful
  temperature: 0.3,
  maxTokens: 1024,
  apiKey: process.env.GROQ_API_KEY,
  streaming: false,
});

// Bind tools so LLM can call them
const llmWithTools = llm.bindTools(tools);

// Map for quick tool lookup
const toolMap = Object.fromEntries(tools.map((t) => [t.name, t]));

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
5. Emojis sparingly: 📞 📍 ⚡ 💰

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

**REVOO X20** — 189,000 PKR
- Top speed: 45 km/h
- Range: 80 km

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

// ============ IN-MEMORY SESSION STORE ============
// Production mein isko Redis ya MongoDB mein store karein
const sessions = new Map();
const MAX_HISTORY = 10; // last 10 messages per session

function getHistory(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  return sessions.get(sessionId);
}

function pushHistory(sessionId, message) {
  const history = getHistory(sessionId);
  history.push(message);
  if (history.length > MAX_HISTORY * 2) {
    history.splice(0, history.length - MAX_HISTORY * 2);
  }
}

// ============ MAIN CHAT HANDLER ============
exports.handleChat = async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    // Build message chain
    const history = getHistory(sessionId);
    const messages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...history,
      new HumanMessage(message.trim()),
    ];

    // ============ AGENT LOOP (max 5 iterations) ============
    let finalAnswer = "";
    let iterations = 0;
    const MAX_ITERATIONS = 5;

    while (iterations < MAX_ITERATIONS) {
      iterations++;

      const response = await llmWithTools.invoke(messages);
      messages.push(response);

      // Check if LLM wants to call tools
      if (response.tool_calls && response.tool_calls.length > 0) {
        // Execute each tool call
        for (const toolCall of response.tool_calls) {
          const tool = toolMap[toolCall.name];

          if (!tool) {
            messages.push(
              new ToolMessage({
                tool_call_id: toolCall.id,
                content: JSON.stringify({ error: `Unknown tool: ${toolCall.name}` }),
              })
            );
            continue;
          }

          try {
            const result = await tool.invoke(toolCall.args);
            messages.push(
              new ToolMessage({
                tool_call_id: toolCall.id,
                content: typeof result === "string" ? result : JSON.stringify(result),
              })
            );
          } catch (toolErr) {
            console.error(`Tool ${toolCall.name} failed:`, toolErr);
            messages.push(
              new ToolMessage({
                tool_call_id: toolCall.id,
                content: JSON.stringify({ error: "Tool execution failed" }),
              })
            );
          }
        }
        // Loop again so LLM can process tool results
        continue;
      }

      // No tool calls — this is the final answer
      finalAnswer = response.content || "I'm sorry, I couldn't generate a response.";
      break;
    }

    if (!finalAnswer) {
      finalAnswer = "I'm sorry, I couldn't complete your request. Please try again.";
    }

    // Save to history
    pushHistory(sessionId, new HumanMessage(message.trim()));
    pushHistory(sessionId, new AIMessage(finalAnswer));

    res.json({
      success: true,
      reply: finalAnswer,
      sessionId,
    });
  } catch (err) {
    console.error("Chat error:", err);

    if (err?.message?.includes("rate limit") || err?.status === 429) {
      return res.status(429).json({
        success: false,
        error: "I'm a bit busy right now. Please try again in a few seconds.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
};

// ============ CLEAR SESSION ============
exports.clearSession = async (req, res) => {
  const { sessionId } = req.params;
  sessions.delete(sessionId);
  res.json({ success: true, message: "Session cleared" });
};