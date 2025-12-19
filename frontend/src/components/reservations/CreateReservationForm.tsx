import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createReservation } from "@/features/reservations/reservationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateReservationForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.reservations);

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createReservation({ date, timeSlot, guests }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Reservation</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />

          <Input
            placeholder="Time slot (e.g. 18:00-20:00)"
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value)}
            required
          />

          <Input
            type="number"
            min={1}
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            required
          />

          {error && (
            <p className="col-span-full text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="col-span-full">
            {loading ? "Booking..." : "Reserve Table"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
