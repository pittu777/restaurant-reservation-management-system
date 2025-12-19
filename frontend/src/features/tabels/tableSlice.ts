import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";

interface TableAvailability {
  available: number;
  total: number;
  booked: number;
}

interface TableState {
  availability: TableAvailability | null;
  allTables: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  availability: null,
  allTables: [],
  loading: false,
  error: null,
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

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
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
      .addCase(fetchAllTables.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllTables.fulfilled, (state, action) => {
        state.loading = false;
        state.allTables = action.payload;
      })
      .addCase(fetchAllTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tableSlice.reducer;