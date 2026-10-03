import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import feedbackReducer from "./slices/feedbackSlice"; // ← NEW
import storyReducer from "./slices/storySlice";
import chatReducer from "./slices/chatSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    feedback: feedbackReducer, 
     stories: storyReducer,
      chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});