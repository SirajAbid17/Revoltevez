import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";


export const createBooking = createAsyncThunk(
  "booking/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/bookings", payload);
      return data.booking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Booking failed. Please try again."
      );
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAll",
  async (status = "all", { rejectWithValue }) => {
    try {
      const url =
        status && status !== "all"
          ? `/admin/bookings?status=${status}`
          : "/admin/bookings";
      const { data } = await api.get(url);
      return {
        bookings: data.bookings || [],
        counts: data.counts || { pending: 0, contacted: 0, confirmed: 0, cancelled: 0, total: 0 },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load bookings");
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/bookings/${id}/status`, { status });
      return data.booking;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Update failed");
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/bookings/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Delete failed");
    }
  }
);


const initialState = {
 
  submitting: false,
  submitSuccess: false,
  submitError: null,


  all: [],
  counts: { pending: 0, contacted: 0, confirmed: 0, cancelled: 0, total: 0 },
  allLoading: false,
  allError: null,
  mutating: false,
};

const recomputeCounts = (list) =>
  list.reduce(
    (acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      acc.total += 1;
      return acc;
    },
    { pending: 0, contacted: 0, confirmed: 0, cancelled: 0, total: 0 }
  );

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.submitting = false;
      state.submitSuccess = false;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(createBooking.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.submitting = false;
        state.submitSuccess = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload;
      })

     
      .addCase(fetchAllBookings.pending, (state) => {
        state.allLoading = true;
        state.allError = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.allLoading = false;
        state.all = action.payload.bookings;
        state.counts = action.payload.counts;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.allLoading = false;
        state.allError = action.payload;
      })

      
      .addCase(updateBookingStatus.pending, (state) => {
        state.mutating = true;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.mutating = false;
        const updated = action.payload;
        state.all = state.all.map((b) => (b._id === updated._id ? updated : b));
        state.counts = recomputeCounts(state.all);
      })
      .addCase(updateBookingStatus.rejected, (state) => {
        state.mutating = false;
      })

      
      .addCase(deleteBooking.pending, (state) => {
        state.mutating = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.mutating = false;
        state.all = state.all.filter((b) => b._id !== action.payload);
        state.counts = recomputeCounts(state.all);
      })
      .addCase(deleteBooking.rejected, (state) => {
        state.mutating = false;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;