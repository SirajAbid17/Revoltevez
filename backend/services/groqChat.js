
const { ChatGroq } = require("@langchain/groq");
const {
  HumanMessage,
  AIMessage,
  ToolMessage,
} = require("@langchain/core/messages");

const rotator = require("./groqRotator");
const tools = require("./chatTools");


const toolMap = Object.fromEntries(tools.map((t) => [t.name, t]));


const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";


function isRateLimitError(err) {
  if (!err) return false;
  const status = err.status || err.response?.status || err.code;
  const msg = String(err.message || "").toLowerCase();

  return (
    status === 429 ||
    status === "rate_limit_exceeded" ||
    msg.includes("rate limit") ||
    msg.includes("rate_limit") ||
    msg.includes("quota") ||
    msg.includes("too many requests") ||
    msg.includes("tokens per")
  );
}

function isAuthError(err) {
  if (!err) return false;
  const status = err.status || err.response?.status || err.code;
  const msg = String(err.message || "").toLowerCase();

  return (
    status === 401 ||
    status === 403 ||
    msg.includes("invalid api key") ||
    msg.includes("unauthorized") ||
    msg.includes("authentication")
  );
}

function isRetryable(err) {
  return isRateLimitError(err) || isAuthError(err);
}


function buildLLM(apiKey) {
  return new ChatGroq({
    model: MODEL,
    temperature: 0.3,
    maxTokens: 1024,
    apiKey,
    streaming: false,
  });
}


async function runAgentOnce({ apiKey, systemPrompt, history, userMessage }) {
  const llm = buildLLM(apiKey);
  const llmWithTools = llm.bindTools(tools);

  
  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage },
  ];

  const MAX_ITERATIONS = 5;
  let iterations = 0;
  let finalAnswer = "";

  while (iterations < MAX_ITERATIONS) {
    iterations++;

   
    const lcMessages = messages.map(toLcMessage);

    const response = await llmWithTools.invoke(lcMessages);
    messages.push(response);

   
    if (response.tool_calls && response.tool_calls.length > 0) {
      for (const toolCall of response.tool_calls) {
        const tool = toolMap[toolCall.name];

        if (!tool) {
          messages.push(
            new ToolMessage({
              tool_call_id: toolCall.id,
              content: JSON.stringify({
                error: `Unknown tool: ${toolCall.name}`,
              }),
            })
          );
          continue;
        }

        try {
          const result = await tool.invoke(toolCall.args);
          messages.push(
            new ToolMessage({
              tool_call_id: toolCall.id,
              content:
                typeof result === "string"
                  ? result
                  : JSON.stringify(result),
            })
          );
        } catch (toolErr) {
          console.error(`[GroqChat] Tool ${toolCall.name} failed:`, toolErr.message);
          messages.push(
            new ToolMessage({
              tool_call_id: toolCall.id,
              content: JSON.stringify({ error: "Tool execution failed" }),
            })
          );
        }
      }
      continue; 
    }

   
    finalAnswer =
      response.content || "I'm sorry, I couldn't generate a response.";
    break;
  }

  if (!finalAnswer) {
    finalAnswer =
      "I'm sorry, I couldn't complete your request. Please try again.";
  }

  return finalAnswer;
}


function toLcMessage(m) {
  if (m instanceof HumanMessage) return m;
  if (m instanceof AIMessage) return m;
  if (m instanceof ToolMessage) return m;
  if (m?.role === "user") return new HumanMessage(m.content);
  if (m?.role === "assistant") return new AIMessage(m.content);
  if (m?.role === "system") {
    
    const { SystemMessage } = require("@langchain/core/messages");
    return new SystemMessage(m.content);
  }
 
  if (m?.tool_calls || m?.additional_kwargs) return m;
  return new HumanMessage(String(m?.content ?? ""));
}


async function runAgentWithRotation({ systemPrompt, history, userMessage }) {
  const maxAttempts = rotator.total || 1;
  let lastErr;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const key = rotator.getKey();

    if (!key) {
      const err = new Error(
        "All AI assistants are temporarily busy. Please try again in a minute."
      );
      err.code = "ALL_KEYS_EXHAUSTED";
      throw err;
    }

    try {
      const answer = await runAgentOnce({
        apiKey: key,
        systemPrompt,
        history,
        userMessage,
      });
      return answer;
    } catch (err) {
      lastErr = err;

      if (isAuthError(err)) {
        
        rotator.markExhausted(key, rotator.AUTH_COOLDOWN_MS);
        console.error("[GroqChat] Auth failure — rotating:", err.message);
        continue;
      }

      if (isRateLimitError(err)) {
       
        rotator.markExhausted(key, rotator.COOLDOWN_MS);
        console.warn("[GroqChat] Rate-limited — rotating:", err.message);
        continue;
      }

     
      throw err;
    }
  }

  
  if (isRateLimitError(lastErr) || isAuthError(lastErr)) {
    const err = new Error(
      "All AI assistants are temporarily busy. Please try again in a minute."
    );
    err.code = "ALL_KEYS_EXHAUSTED";
    throw err;
  }

  throw lastErr || new Error("AI request failed");
}

module.exports = {
  runAgentWithRotation,
  buildLLM,
  isRateLimitError,
  isAuthError,
  MODEL,
};