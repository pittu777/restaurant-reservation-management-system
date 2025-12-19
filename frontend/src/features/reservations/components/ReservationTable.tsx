import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Reservation } from "@/features/reservations/reservationTypes";

interface ReservationTableProps {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ReservationTable({
  reservations,
  onCancel,
  onDelete,
}: ReservationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reservations.map(r => (
          <TableRow
            key={r._id}
            className={
              r.status === "CANCELLED"
                ? "opacity-60"
                : ""
            }
          >
            <TableCell>
              <div className="font-medium">{r.user.name}</div>
              <div className="text-xs text-muted-foreground">
                {r.user.email}
              </div>
            </TableCell>

            <TableCell>{r.date}</TableCell>
            <TableCell>{r.timeSlot}</TableCell>
            <TableCell>{r.guests}</TableCell>

            <TableCell>
              <Badge
                variant={
                  r.status === "ACTIVE"
                    ? "default"
                    : "secondary"
                }
              >
                {r.status}
              </Badge>
            </TableCell>

            <TableCell>
              {r.status === "ACTIVE" ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancel(r._id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(r._id)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(r._id)}
                >
                  Remove
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}