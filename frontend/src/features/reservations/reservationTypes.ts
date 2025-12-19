export interface Reservation {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  date: string;
  timeSlot: string;
  guests: number;
  table?: {
    _id: string;
    name: string;
    capacity: number;
  };
  status: "ACTIVE" | "CANCELLED";
  createdAt?: string;
  updatedAt?: string;
}