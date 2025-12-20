import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

interface TableAvailability {
  available: number;
  total: number;
  booked: number;
}

interface TableWithStatus {
  _id: string;
  tableNumber: number;
  capacity: number;
  isBooked: boolean;
}

interface TableState {
  availability: TableAvailability | null;
  allTables: any[];
  tablesWithStatus: TableWithStatus[];
  loading: boolean;
  error: string | null;
  message: string | null;
  actionLoading: boolean;
}

const initialState: TableState = {
  availability: null,
  allTables: [],
  tablesWithStatus: [],
  loading: false,
  error: null,
  message: null,
  actionLoading: false,
};

export const fetchAvailableTables = createAsyncThunk(
  "tables/fetchAvailable",
  async (
    params: { date: string; timeSlot: string; guests: number },
    thunkAPI
  ) => {
    try {
      const res = await api.get("/reservations/available", { params });
      return res.data as TableAvailability;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchTablesWithStatus = createAsyncThunk(
  "tables/fetchTablesWithStatus",
  async (
    params: { date: string; timeSlot: string },
    thunkAPI
  ) => {
    try {
      const res = await api.get("/reservations/tables-status", { params });
      return res.data as TableWithStatus[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchAllTables = createAsyncThunk(
  "tables/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/reservations/tables/all");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createTable = createAsyncThunk(
  "tables/create",
  async (capacity: number, thunkAPI) => {
    try {
      const res = await api.post("/reservations/tables", { capacity });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteTable = createAsyncThunk(
  "tables/delete",
  async (tableId: string, thunkAPI) => {
    try {
      await api.delete(`/reservations/tables/${tableId}`);
      return tableId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAvailableTables.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTables.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
      })
      .addCase(fetchAvailableTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTablesWithStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTablesWithStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.tablesWithStatus = action.payload;
      })
      .addCase(fetchTablesWithStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllTables.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTables.fulfilled, (state, action) => {
        state.loading = false;
        state.allTables = action.payload;
      })
      .addCase(fetchAllTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Table Cases
      .addCase(createTable.pending, state => {
        state.actionLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.message = "Table created successfully!";
        state.allTables.push(action.payload);
      })
      .addCase(createTable.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      // Delete Table Cases
      .addCase(deleteTable.pending, state => {
        state.actionLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.message = "Table deleted successfully!";
        state.allTables = state.allTables.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessage, clearError } = tableSlice.actions;
export default tableSlice.reducer;