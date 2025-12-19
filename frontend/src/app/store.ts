import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import reservationReducer from "@/features/reservations/reservationSlice";
import adminReservationReducer from "@/features/reservations/adminReservationSlice";
import tableReducer from "@/features/tabels/tableSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservations: reservationReducer,
    adminReservations: adminReservationReducer,
    tables: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
