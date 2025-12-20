import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMyReservations } from "@/features/reservations/reservationSlice";
import { ReservationList } from "@/features/reservations/components/ReservationList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyReservations() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.reservations);

  useEffect(() => {
    dispatch(fetchMyReservations());
  }, [dispatch]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading reservations...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-muted-foreground">Loading reservations...</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && <ReservationList reservations={list} />}
        </CardContent>
      </Card>
    </div>
  );
}
