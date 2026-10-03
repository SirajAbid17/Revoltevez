import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

// ============================================
// PUBLIC
// ============================================

export const submitFeedback = createAsyncThunk(
  "feedback/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/feedback", payload);
      return data.feedback;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to submit feedback"
      );
    }
  }
);

export const fetchApprovedFeedback = createAsyncThunk(
  "feedback/fetchApproved",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/feedback");
      return data.feedbacks || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load feedback"
      );
    }
  }
);

// ⭐ NEW — Check if user already submitted
export const fetchMyFeedback = createAsyncThunk(
  "feedback/fetchMine",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/feedback/mine?email=${encodeURIComponent(email)}`
      );
      return data; // { hasSubmitted, feedback }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to check feedback"
      );
    }
  }
);

// ============================================
// ADMIN
// ============================================

export const fetchAllFeedback = createAsyncThunk(
  "feedback/fetchAll",
  async (status = "all", { rejectWithValue }) => {
    try {
      const url =
        status && status !== "all"
          ? `/admin/feedback?status=${status}`
          : "/admin/feedback";
      const { data } = await api.get(url);
      return {
        feedbacks: data.feedbacks || [],
        counts: data.counts || { pending: 0, approved: 0, rejected: 0, total: 0 },
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load feedback"
      );
    }
  }
);

export const updateFeedbackStatus = createAsyncThunk(
  "feedback/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/feedback/${id}/status`, {
        status,
      });
      return data.feedback;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update status"
      );
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/feedback/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to delete");
    }
  }
);

// ============================================
// SLICE
// ============================================

const initialState = {
  approved: [],
  approvedLoading: false,
  approvedError: null,

  myFeedback: null,        // ⭐ user's own feedback
  myFeedbackLoading: false, // ⭐ loading state
  myFeedbackChecked: false, // ⭐ true after first check

  all: [],
  counts: { pending: 0, approved: 0, rejected: 0, total: 0 },
  allLoading: false,
  allError: null,

  submitting: false,
  submitError: null,
  submitSuccess: false,

  mutating: false,
};

const recomputeCounts = (list) =>
  list.reduce(
    (acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      acc.total += 1;
      return acc;
    },
    { pending: 0, approved: 0, rejected: 0, total: 0 }
  );

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    resetSubmitState: (state) => {
      state.submitting = false;
      state.submitError = null;
      state.submitSuccess = false;
    },
    resetMyFeedback: (state) => {
      state.myFeedback = null;
      state.myFeedbackChecked = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- SUBMIT -----
      .addCase(submitFeedback.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.submitting = false;
        state.submitSuccess = true;
        state.myFeedback = action.payload; // ⭐ set user's feedback
        state.myFeedbackChecked = true;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload;
      })

      // ----- FETCH MY FEEDBACK -----
      .addCase(fetchMyFeedback.pending, (state) => {
        state.myFeedbackLoading = true;
      })
      .addCase(fetchMyFeedback.fulfilled, (state, action) => {
        state.myFeedbackLoading = false;
        state.myFeedbackChecked = true;
        state.myFeedback = action.payload.hasSubmitted
          ? action.payload.feedback
          : null;
      })
      .addCase(fetchMyFeedback.rejected, (state) => {
        state.myFeedbackLoading = false;
        state.myFeedbackChecked = true;
        state.myFeedback = null;
      })

      // ----- APPROVED (public) -----
      .addCase(fetchApprovedFeedback.pending, (state) => {
        state.approvedLoading = true;
        state.approvedError = null;
      })
      .addCase(fetchApprovedFeedback.fulfilled, (state, action) => {
        state.approvedLoading = false;
        state.approved = action.payload;
      })
      .addCase(fetchApprovedFeedback.rejected, (state, action) => {
        state.approvedLoading = false;
        state.approvedError = action.payload;
      })

      // ----- ALL (admin) -----
      .addCase(fetchAllFeedback.pending, (state) => {
        state.allLoading = true;
        state.allError = null;
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.allLoading = false;
        state.all = action.payload.feedbacks;
        state.counts = action.payload.counts;
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.allLoading = false;
        state.allError = action.payload;
      })

      // ----- UPDATE STATUS -----
      .addCase(updateFeedbackStatus.pending, (state) => {
        state.mutating = true;
      })
      .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
        state.mutating = false;
        const updated = action.payload;

        state.all = state.all.map((f) =>
          f._id === updated._id ? updated : f
        );
        state.counts = recomputeCounts(state.all);

        if (updated.status === "approved") {
          const exists = state.approved.some((f) => f._id === updated._id);
          if (!exists) {
            state.approved = [updated, ...state.approved];
          }
        } else {
          state.approved = state.approved.filter((f) => f._id !== updated._id);
        }
      })
      .addCase(updateFeedbackStatus.rejected, (state) => {
        state.mutating = false;
      })

      // ----- DELETE -----
      .addCase(deleteFeedback.pending, (state) => {
        state.mutating = true;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.mutating = false;
        const id = action.payload;
        state.all = state.all.filter((f) => f._id !== id);
        state.approved = state.approved.filter((f) => f._id !== id);
        state.counts = recomputeCounts(state.all);
      })
      .addCase(deleteFeedback.rejected, (state) => {
        state.mutating = false;
      });
  },
});

export const { resetSubmitState, resetMyFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;