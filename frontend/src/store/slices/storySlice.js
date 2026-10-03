import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";     // ← ye import karo (baaki slices ki tarah)

// ============================================
// ASYNC THUNKS
// ============================================

export const fetchPublicStories = createAsyncThunk(
  "stories/fetchPublic",
  async ({ limit } = {}, { rejectWithValue }) => {
    try {
      const url = limit ? `/stories?limit=${limit}` : "/stories";
      const { data } = await api.get(url);
      // Backend array return karta hai, lekin defensive check bhi rakho
      return Array.isArray(data) ? data : data?.stories || [];
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || "Failed to fetch");
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  "stories/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/stories/${id}`);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || "Failed to fetch");
    }
  }
);

export const fetchAllStoriesAdmin = createAsyncThunk(
  "stories/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/stories/admin/all");
      return Array.isArray(data) ? data : data?.stories || [];
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || "Failed to fetch");
    }
  }
);

export const createStory = createAsyncThunk(
  "stories/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || "Failed to create");
    }
  }
);

export const updateStory = createAsyncThunk(
  "stories/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/stories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || "Failed to update");
    }
  }
);

export const deleteStory = createAsyncThunk(
  "stories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/stories/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || "Failed to delete");
    }
  }
);

// ============================================
// SLICE
// ============================================

const storySlice = createSlice({
  name: "stories",
  initialState: {
    list: [],
    all: [],
    current: null,
    loading: false,
    allLoading: false,
    currentLoading: false,
    mutating: false,
    error: null,
  },
  reducers: {
    clearCurrent: (s) => {
      s.current = null;
    },
  },
  extraReducers: (b) => {
    b
      // Public list
      .addCase(fetchPublicStories.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchPublicStories.fulfilled, (s, a) => {
        s.loading = false;
        s.list = Array.isArray(a.payload) ? a.payload : [];
      })
      .addCase(fetchPublicStories.rejected, (s, a) => {
        s.loading = false;
        s.list = [];
        s.error = a.payload;
      })

      // Single story
      .addCase(fetchStoryById.pending, (s) => {
        s.currentLoading = true;
        s.current = null;
      })
      .addCase(fetchStoryById.fulfilled, (s, a) => {
        s.currentLoading = false;
        s.current = a.payload;
      })
      .addCase(fetchStoryById.rejected, (s) => {
        s.currentLoading = false;
      })

      // Admin all
      .addCase(fetchAllStoriesAdmin.pending, (s) => {
        s.allLoading = true;
      })
      .addCase(fetchAllStoriesAdmin.fulfilled, (s, a) => {
        s.allLoading = false;
        s.all = Array.isArray(a.payload) ? a.payload : [];
      })
      .addCase(fetchAllStoriesAdmin.rejected, (s) => {
        s.allLoading = false;
      })

      // Create
      .addCase(createStory.pending, (s) => {
        s.mutating = true;
      })
      .addCase(createStory.fulfilled, (s, a) => {
        s.mutating = false;
        if (!Array.isArray(s.all)) s.all = [];
        if (!Array.isArray(s.list)) s.list = [];
        s.all.unshift(a.payload);
        s.list = [a.payload, ...s.list].slice(0, 4);
      })
      .addCase(createStory.rejected, (s) => {
        s.mutating = false;
      })

      // Update
      .addCase(updateStory.pending, (s) => {
        s.mutating = true;
      })
      .addCase(updateStory.fulfilled, (s, a) => {
        s.mutating = false;
        const i = s.all.findIndex((x) => x._id === a.payload._id);
        if (i !== -1) s.all[i] = a.payload;
        const j = s.list.findIndex((x) => x._id === a.payload._id);
        if (j !== -1) s.list[j] = a.payload;
      })
      .addCase(updateStory.rejected, (s) => {
        s.mutating = false;
      })

      // Delete
      .addCase(deleteStory.pending, (s) => {
        s.mutating = true;
      })
      .addCase(deleteStory.fulfilled, (s, a) => {
        s.mutating = false;
        s.all = s.all.filter((x) => x._id !== a.payload);
        s.list = s.list.filter((x) => x._id !== a.payload);
      })
      .addCase(deleteStory.rejected, (s) => {
        s.mutating = false;
      });
  },
});

export const { clearCurrent } = storySlice.actions;
export default storySlice.reducer;