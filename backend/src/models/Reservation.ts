import { Schema, model, Types } from 'mongoose';

export type ReservationStatus = 'ACTIVE' | 'CANCELLED';

const reservationSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    table: {
      type: Types.ObjectId,
      ref: 'Table',
      required: true,
    },
    date: {
      type: String,
      required: true, // YYYY-MM-DD
    },
    timeSlot: {
      type: String,
      required: true, // e.g. "18:00-20:00"
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELLED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

export const Reservation = model('Reservation', reservationSchema);
