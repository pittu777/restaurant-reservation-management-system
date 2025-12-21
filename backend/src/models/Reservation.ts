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
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
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
