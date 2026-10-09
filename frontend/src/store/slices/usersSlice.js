import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";




export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/all");
      return data.users || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load users"
      );
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "users/changeRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/user/${userId}/role`, { role });
      return data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Role change failed"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/user/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Delete failed"
      );
    }
  }
);



const initialState = {
  list: [],
  loading: false,
  error: null,
  mutating: false,
  mutationError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
      state.mutationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(changeUserRole.pending, (state) => {
        state.mutating = true;
        state.mutationError = null;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.mutating = false;
        const updated = action.payload;
        state.list = state.list.map((u) =>
          u._id === updated._id ? updated : u
        );
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.mutating = false;
        state.mutationError = action.payload;
      })

      
      .addCase(deleteUser.pending, (state) => {
        state.mutating = true;
        state.mutationError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.mutating = false;
        state.list = state.list.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.mutating = false;
        state.mutationError = action.payload;
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;