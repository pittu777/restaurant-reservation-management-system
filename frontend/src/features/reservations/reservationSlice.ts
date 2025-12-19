import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import type { Reservation } from "./reservationTypes";

interface ReservationState {
  list: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchMyReservations = createAsyncThunk(
  "reservations/fetchMy",
  async () => {
    const res = await api.get("/reservations/me");
    return res.data as Reservation[];
  }
);

export const createReservation = createAsyncThunk(
  "reservations/create",
  async (data: { date: string; timeSlot: string; guests: number }) => {
    const res = await api.post("/reservations", data);
    return res.data as Reservation;
  }
);

export const cancelReservation = createAsyncThunk(
  "reservations/cancel",
  async (id: string) => {
    await api.delete(`/reservations/${id}`);
    return id;
  }
);

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMyReservations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
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
      .addCase(createReservation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default reservationSlice.reducer;
