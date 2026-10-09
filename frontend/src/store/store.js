import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import feedbackReducer from "./slices/feedbackSlice"; 
import storyReducer from "./slices/storySlice";
import chatReducer from "./slices/chatSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    feedback: feedbackReducer, 
     stories: storyReducer,
      chat: chatReducer,
       booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});