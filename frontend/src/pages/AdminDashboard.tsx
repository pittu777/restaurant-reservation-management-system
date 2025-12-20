import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchAllReservations,
  fetchReservationsByDate,
  cancelReservation,
  deleteReservation,
} from "@/features/reservations/adminReservationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmationAlert } from "@/components/ui/ConfirmationAlert";
import { ReservationFilters } from "@/features/reservations/components/ReservationFilter";
import { ReservationEmptyState, ReservationErrorState, ReservationLoadingState } from "@/features/reservations/components/LoadingState";
import { ReservationTable } from "@/features/reservations/components/ReservationTable";
import { useConfirmation } from "@/hooks/useConfirmation";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { list: reservations, loading, error } = useAppSelector(
    state => state.adminReservations
  );
  const [dateFilter, setDateFilter] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const confirmation = useConfirmation();
  const [pendingAction, setPendingAction] = useState<{ id: string; type: "cancel" | "delete" } | null>(null);

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
    setPendingAction({ id, type: "cancel" });
    confirmation.openConfirmation(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation? The status will be marked as CANCELLED.",
      {
        confirmText: "Yes, Cancel",
        cancelText: "No, Keep",
        variant: "warning",
      }
    );
  }, [confirmation]);

  const handleDeleteReservation = useCallback((id: string) => {
    setPendingAction({ id, type: "delete" });
    confirmation.openConfirmation(
      "Delete Reservation",
      "Are you sure you want to permanently delete this reservation? This action cannot be undone.",
      {
        confirmText: "Yes, Delete",
        cancelText: "No, Keep",
        variant: "destructive",
      }
    );
  }, [confirmation]);

  const confirmActionHandler = useCallback(() => {
    if (!pendingAction) return;

    if (pendingAction.type === "cancel") {
      dispatch(cancelReservation(pendingAction.id));
    } else if (pendingAction.type === "delete") {
      dispatch(deleteReservation(pendingAction.id));
    }

    setPendingAction(null);
    confirmation.closeConfirmation();
  }, [pendingAction, dispatch, confirmation]);

  const cancelActionHandler = useCallback(() => {
    setPendingAction(null);
    confirmation.closeConfirmation();
  }, [confirmation]);

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

        <CardContent className="space-y-4">
          {/* CONFIRMATION DIALOG */}
          <ConfirmationAlert
            isOpen={confirmation.isOpen}
            title={confirmation.title}
            description={confirmation.description}
            confirmText={confirmation.confirmText}
            cancelText={confirmation.cancelText}
            variant={confirmation.variant as any}
            onConfirm={confirmActionHandler}
            onCancel={cancelActionHandler}
          />

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