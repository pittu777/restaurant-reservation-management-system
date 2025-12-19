import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/app/hooks";
import { cancelReservation } from "@/features/reservations/reservationSlice";
import type { Reservation } from "@/features/reservations/reservationTypes";

interface Props {
  reservations: Reservation[];
}

export function ReservationList({ reservations }: Props) {
  const dispatch = useAppDispatch();

  if (reservations.length === 0) {
    return <p className="text-muted-foreground">No reservations yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reservations.map(r => (
          <TableRow key={r._id}>
            <TableCell>{r.date}</TableCell>
            <TableCell>{r.timeSlot}</TableCell>
            <TableCell>{r.guests}</TableCell>
            <TableCell>
              <Badge variant={r.status === "ACTIVE" ? "default" : "secondary"}>
                {r.status}
              </Badge>
            </TableCell>
            <TableCell>
              {r.status === "ACTIVE" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(cancelReservation(r._id))}
                >
                  Cancel
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
