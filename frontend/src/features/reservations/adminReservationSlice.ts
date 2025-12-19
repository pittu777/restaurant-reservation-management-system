import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import type { Reservation } from "./reservationTypes";

interface AdminReservationState {
  list: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminReservationState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAllReservations = createAsyncThunk(
  "adminReservations/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/reservations");
      return res.data as Reservation[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchReservationsByDate = createAsyncThunk(
  "adminReservations/fetchByDate",
  async (date: string, thunkAPI) => {
    try {
      const res = await api.get(`/admin/reservations/by-date?date=${date}`);
      return res.data as Reservation[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const cancelReservation = createAsyncThunk(
  "adminReservations/cancel",
  async (id: string, thunkAPI) => {
    try {
      await api.patch(`/admin/reservations/${id}/cancel`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteReservation = createAsyncThunk(
  "adminReservations/delete",
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/admin/reservations/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const adminReservationSlice = createSlice({
  name: "adminReservations",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch All
      .addCase(fetchAllReservations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch By Date
      .addCase(fetchReservationsByDate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReservationsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Cancel
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.list = state.list.map(r =>
          r._id === action.payload
            ? { ...r, status: "CANCELLED" }
            : r
        );
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.list = state.list.filter(r => r._id !== action.payload);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default adminReservationSlice.reducer;