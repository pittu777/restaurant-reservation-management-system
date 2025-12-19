import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchAllReservations,
  fetchReservationsByDate,
  cancelReservation,
  deleteReservation,
} from "@/features/reservations/adminReservationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReservationFilters } from "@/features/reservations/components/ReservationFilter";
import { ReservationEmptyState, ReservationErrorState, ReservationLoadingState } from "@/features/reservations/components/LoadingState";
import { ReservationTable } from "@/features/reservations/components/ReservationTable";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { list: reservations, loading, error } = useAppSelector(
    state => state.adminReservations
  );
  const [dateFilter, setDateFilter] = useState("");
  const [appliedDate, setAppliedDate] = useState("");

  useEffect(() => {
    dispatch(fetchAllReservations());
  }, [dispatch]);

  const handleFilter = useCallback(() => {
    if (dateFilter.trim() === "") {
      return;
    }

    if (dateFilter === appliedDate) {
      return;
    }

    dispatch(fetchReservationsByDate(dateFilter));
    setAppliedDate(dateFilter);
  }, [dateFilter, appliedDate, dispatch]);

  const handleCancelReservation = useCallback((id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (confirm) {
      dispatch(cancelReservation(id));
    }
  }, [dispatch]);

  const handleDeleteReservation = useCallback((id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this reservation?"
    );
    if (confirm) {
      dispatch(deleteReservation(id));
    }
  }, [dispatch]);

  const handleResetFilter = useCallback(() => {
    setDateFilter("");
    setAppliedDate("");
    dispatch(fetchAllReservations());
  }, [dispatch]);

  const sortedReservations = useMemo(() => {
    return [...reservations].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [reservations]);

  const showResetButton = useMemo(() => {
    return appliedDate !== "";
  }, [appliedDate]);

  const isFilterDisabled = useMemo(() => {
    return dateFilter.trim() === "";
  }, [dateFilter]);

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Admin – All Reservations</CardTitle>
          <ReservationFilters
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            onFilter={handleFilter}
            onReset={handleResetFilter}
            showResetButton={showResetButton}
            isFilterDisabled={isFilterDisabled}
          />
        </CardHeader>

        <CardContent>
          {loading && <ReservationLoadingState />}
          {error && <ReservationErrorState error={error} />}
          {!loading && reservations.length === 0 && <ReservationEmptyState />}
          {!loading && reservations.length > 0 && (
            <ReservationTable
              reservations={sortedReservations}
              onCancel={handleCancelReservation}
              onDelete={handleDeleteReservation}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}