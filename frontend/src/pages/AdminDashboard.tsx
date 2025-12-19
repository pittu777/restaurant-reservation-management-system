import { useEffect, useState } from "react";
import api from "./../lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "./../components/ui/card";
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

  const fetchReservations = async () => {
    const url = dateFilter
      ? `/admin/reservations/by-date?date=${dateFilter}`
      : "/admin/reservations";
    const res = await api.get(url);
    setReservations(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const cancelReservation = async (id: string) => {
    await api.delete(`/admin/reservations/${id}`);
    setReservations(prev =>
      prev.map(r =>
        r._id === id ? { ...r, status: "CANCELLED" } : r
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle>All Reservations</CardTitle>

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
              <TableRow key={r._id}>
                <TableCell>{r.user.name}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.timeSlot}</TableCell>
                <TableCell>{r.guests}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      r.status === "ACTIVE" ? "default" : "secondary"
                    }>
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {r.status === "ACTIVE" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => cancelReservation(r._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
