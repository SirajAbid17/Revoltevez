import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const syncSession = createAsyncThunk(
  "auth/syncSession",
  async (clerkToken, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/auth/session",
        {},
        { headers: { Authorization: `Bearer ${clerkToken}` } }
      );
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Session sync failed"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me");
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Not authenticated");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Logout failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/user/me", payload);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Update failed");
    }
  }
);


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  synced: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.synced = true;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAll: () => initialState,
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(syncSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.synced = true;
      })
      .addCase(syncSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.synced = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.synced = true;
      })

    
      .addCase(logoutUser.pending, (state) => {
       
        state.user = null;
        state.isAuthenticated = false;
        state.synced = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.synced = true;
        state.error = null;
      })

      
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearUser, clearError, resetAll } = authSlice.actions;
export default authSlice.reducer;