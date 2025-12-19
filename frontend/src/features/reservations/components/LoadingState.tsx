export function ReservationLoadingState() {
  return (
    <p className="text-sm text-muted-foreground">
      Loading reservations...
    </p>
  );
}
interface ReservationErrorStateProps {
  error: string | null;
}

export function ReservationErrorState({ error }: ReservationErrorStateProps) {
  return (
    <p className="text-sm text-destructive">{error}</p>
  );
}
export function ReservationEmptyState() {
  return (
    <p className="text-sm text-muted-foreground">
      No reservations found.
    </p>
  );
}