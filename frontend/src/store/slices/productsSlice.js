import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";


export const fetchPublicProducts = createAsyncThunk(
  "products/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/products");
      return data.products || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Product not found"
      );
    }
  }
);


export const fetchAdminProducts = createAsyncThunk(
  "products/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/products");
      return data.products || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to add product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to delete product"
      );
    }
  }
);


const initialState = {
 
  publicProducts: [],
  publicLoading: false,
  publicError: null,

  currentProduct: null,
  currentLoading: false,
  currentError: null,

 
  adminProducts: [],
  adminLoading: false,
  adminError: null,

 
  mutating: false,
  mutationError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.currentError = null;
    },
    clearErrors: (state) => {
      state.publicError = null;
      state.currentError = null;
      state.adminError = null;
      state.mutationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchPublicProducts.pending, (state) => {
        state.publicLoading = true;
        state.publicError = null;
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.publicProducts = action.payload;
      })
      .addCase(fetchPublicProducts.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicError = action.payload;
      })

    
      .addCase(fetchProductById.pending, (state) => {
        state.currentLoading = true;
        state.currentError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentLoading = false;
        state.currentError = action.payload;
        state.currentProduct = null;
      })

      
      .addCase(fetchAdminProducts.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminProducts = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })

      
      .addCase(createProduct.pending, (state) => {
        state.mutating = true;
        state.mutationError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.mutating = false;
        state.adminProducts = [action.payload, ...state.adminProducts];
       
        if (action.payload.status === "published") {
          state.publicProducts = [action.payload, ...state.publicProducts];
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.mutating = false;
        state.mutationError = action.payload;
      })

     
      .addCase(updateProduct.pending, (state) => {
        state.mutating = true;
        state.mutationError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.mutating = false;
        const updated = action.payload;

        
        state.adminProducts = state.adminProducts.map((p) =>
          p._id === updated._id ? updated : p
        );

       
        const existsInPublic = state.publicProducts.some(
          (p) => p._id === updated._id
        );

        if (updated.status === "published") {
          if (existsInPublic) {
            state.publicProducts = state.publicProducts.map((p) =>
              p._id === updated._id ? updated : p
            );
          } else {
            state.publicProducts = [updated, ...state.publicProducts];
          }
        } else {
          state.publicProducts = state.publicProducts.filter(
            (p) => p._id !== updated._id
          );
        }

       
        if (state.currentProduct?._id === updated._id) {
          state.currentProduct = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.mutating = false;
        state.mutationError = action.payload;
      })

      
      .addCase(deleteProduct.pending, (state) => {
        state.mutating = true;
        state.mutationError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.mutating = false;
        const id = action.payload;
        state.adminProducts = state.adminProducts.filter((p) => p._id !== id);
        state.publicProducts = state.publicProducts.filter((p) => p._id !== id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.mutating = false;
        state.mutationError = action.payload;
      });
  },
});

export const { clearCurrentProduct, clearErrors } = productsSlice.actions;
export default productsSlice.reducer;