import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMyReservations } from "@/features/reservations/reservationSlice";
import { CreateReservationForm } from "@/components/reservations/CreateReservationForm";
import { ReservationList } from "@/components/reservations/ReservationList";


export default function UserDashboard() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector(
    state => state.reservations
  );

  useEffect(() => {
    dispatch(fetchMyReservations());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <CreateReservationForm />

      {loading ? (
        <p>Loading reservations...</p>
      ) : (
        <ReservationList reservations={list} />
      )}
    </div>
  );
}
