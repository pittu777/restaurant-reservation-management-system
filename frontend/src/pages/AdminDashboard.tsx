import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchAllReservations,
  fetchReservationsByDate,
  cancelReservation,
  deleteReservation,
} from "@/features/reservations/adminReservationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
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
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: "cancel" | "delete" } | null>(null);

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
    setConfirmAction({ id, action: "cancel" });
  }, []);

  const handleDeleteReservation = useCallback((id: string) => {
    setConfirmAction({ id, action: "delete" });
  }, []);

  const confirmActionHandler = useCallback(() => {
    if (!confirmAction) return;

    if (confirmAction.action === "cancel") {
      dispatch(cancelReservation(confirmAction.id));
    } else if (confirmAction.action === "delete") {
      dispatch(deleteReservation(confirmAction.id));
    }

    setConfirmAction(null);
  }, [confirmAction, dispatch]);

  const cancelActionHandler = useCallback(() => {
    setConfirmAction(null);
  }, []);

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
          {/* CONFIRMATION ALERT */}
          {confirmAction && (
            <Alert className={`${
              confirmAction.action === "cancel"
                ? "bg-orange-50 border-orange-200"
                : "bg-red-50 border-red-200"
            }`}>
              <AlertCircle className={`h-4 w-4 ${
                confirmAction.action === "cancel"
                  ? "text-orange-600"
                  : "text-red-600"
              }`} />
              <AlertTitle className={confirmAction.action === "cancel" ? "text-orange-800" : "text-red-800"}>
                {confirmAction.action === "cancel" ? "Cancel Reservation" : "Delete Reservation"}
              </AlertTitle>
              <AlertDescription className={`${
                confirmAction.action === "cancel"
                  ? "text-orange-700"
                  : "text-red-700"
              } space-y-3`}>
                <p>
                  {confirmAction.action === "cancel"
                    ? "Are you sure you want to cancel this reservation? The status will be marked as CANCELLED."
                    : "Are you sure you want to permanently delete this reservation? This action cannot be undone."}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={confirmActionHandler}
                    className={confirmAction.action === "cancel"
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                    }
                  >
                    {confirmAction.action === "cancel" ? "Yes, Cancel" : "Yes, Delete"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelActionHandler}
                    className={confirmAction.action === "cancel"
                      ? "border-orange-300"
                      : "border-red-300"
                    }
                  >
                    No, Keep
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

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