import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

// ============================================
// ASYNC THUNK
// ============================================

export const sendChatMessage = createAsyncThunk(
  "chat/send",
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/chat", { message, sessionId });
      return data.reply;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error ||
          "Sorry, something went wrong. Please try again."
      );
    }
  }
);

export const clearChatSession = createAsyncThunk(
  "chat/clearSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.delete(`/chat/${sessionId}`);
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to clear session"
      );
    }
  }
);

// ============================================
// HELPERS
// ============================================

const makeSessionId = () =>
  `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const buildWelcome = (userName) => ({
  role: "assistant",
  content: `👋 Hi${
    userName ? ` ${userName}` : ""
  }! I'm the Revoltevez Assistant. Ask me about our electric bikes, prices, specs, or company info!`,
});

// ============================================
// SLICE
// ============================================

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sessionId: makeSessionId(),
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    /** Initialize with welcome message (call once on mount / user change) */
    initChat: (state, action) => {
      const firstName = action.payload?.split(" ")[0];
      if (state.messages.length === 0) {
        state.messages = [buildWelcome(firstName)];
      }
    },

    /** Add user message immediately (optimistic) */
    pushUserMessage: (state, action) => {
      state.messages.push({ role: "user", content: action.payload });
      state.error = null;
    },

    /** Reset everything — new session */
    resetChat: (state) => {
      state.sessionId = makeSessionId();
      state.messages = [];
      state.loading = false;
      state.error = null;
    },

    clearChatError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- SEND MESSAGE -----
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ role: "assistant", content: action.payload });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({
          role: "assistant",
          content: action.payload || "Something went wrong.",
        });
      })

      // ----- CLEAR SESSION -----
      .addCase(clearChatSession.fulfilled, (state) => {
        state.messages = [];
        state.sessionId = makeSessionId();
      });
  },
});

export const {
  initChat,
  pushUserMessage,
  resetChat,
  clearChatError,
} = chatSlice.actions;

export default chatSlice.reducer;