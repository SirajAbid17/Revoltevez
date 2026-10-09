import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";


export const sendChatMessage = createAsyncThunk(
  "chat/send",
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/chat", { message, sessionId });
     
      return {
        reply: data.reply,
        fallback: !!data.fallback,
        whatsapp: data.whatsapp || null,
        whatsappNumber: data.whatsappNumber || null,
      };
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


const makeSessionId = () =>
  `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const buildWelcome = (userName) => ({
  role: "assistant",
  content: `Hi${
    userName ? ` ${userName}` : ""
  }! I'm the Revoltevez Assistant. Ask me about our electric bikes, prices, specs, or company info!`,
  fallback: false,
});


const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sessionId: makeSessionId(),
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    initChat: (state, action) => {
      const firstName = action.payload?.split(" ")[0];
      if (state.messages.length === 0) {
        state.messages = [buildWelcome(firstName)];
      }
    },

    pushUserMessage: (state, action) => {
      state.messages.push({ role: "user", content: action.payload });
      state.error = null;
    },

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
     
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: "assistant",
          content: action.payload.reply,
          
          fallback: action.payload.fallback,
          whatsapp: action.payload.whatsapp,
          whatsappNumber: action.payload.whatsappNumber,
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({
          role: "assistant",
          content:
            action.payload || "Something went wrong. Please try again.",
          fallback: true,
          whatsapp: "https://wa.me/923406500029",
          whatsappNumber: "923406500029",
        });
      })

      
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