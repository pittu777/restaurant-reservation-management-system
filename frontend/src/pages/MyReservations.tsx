import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMyReservations } from "@/features/reservations/reservationSlice";
import { ReservationList } from "@/components/reservations/ReservationList";

export default function MyReservations() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector(state => state.reservations);

  useEffect(() => {
    dispatch(fetchMyReservations());
  }, [dispatch]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading reservations...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ReservationList reservations={list} />
    </div>
  );
}
