import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AdminReservation {
  _id: string;
  date: string;
  timeSlot: string;
  guests: number;
  status: "ACTIVE" | "CANCELLED";
  user: { name: string; email: string };
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = dateFilter
        ? `/admin/reservations/by-date?date=${dateFilter}`
        : "/admin/reservations";

      const res = await api.get(url);
      setReservations(res.data);
    } catch {
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const cancelReservation = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (!confirm) return;

    await api.delete(`/admin/reservations/${id}`);

    setReservations(prev =>
      prev.map(r =>
        r._id === id ? { ...r, status: "CANCELLED" } : r
      )
    );
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Admin – All Reservations</CardTitle>

          <div className="flex gap-2">
            <Input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
            />
            <Button onClick={fetchReservations}>Filter</Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading && (
            <p className="text-sm text-muted-foreground">
              Loading reservations...
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {!loading && reservations.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No reservations found.
            </p>
          )}

          {!loading && reservations.length > 0 && (
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
                      {r.status === "ACTIVE" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            cancelReservation(r._id)
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
