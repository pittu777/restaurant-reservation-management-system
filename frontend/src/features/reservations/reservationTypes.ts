export interface Reservation {
  _id: string;
  date: string;
  timeSlot: string;
  guests: number;
  status: "ACTIVE" | "CANCELLED";
}
