import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReservationFiltersProps {
  dateFilter: string;
  onDateChange: (date: string) => void;
  onFilter: () => void;
  onReset: () => void;
  showResetButton: boolean;
  isFilterDisabled: boolean;
}

export function ReservationFilters({
  dateFilter,
  onDateChange,
  onFilter,
  onReset,
  showResetButton,
  isFilterDisabled,
}: ReservationFiltersProps) {
  return (
    <div className="flex gap-2">
      <Input
        type="date"
        value={dateFilter}
        onChange={e => onDateChange(e.target.value)}
        placeholder="Select date"
      />
      <Button 
        onClick={onFilter}
        disabled={isFilterDisabled}
      >
        Filter
      </Button>
      {showResetButton && (
        <Button variant="outline" onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
}