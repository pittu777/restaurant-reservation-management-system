import { Schema, model } from 'mongoose';

const tableSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export const Table = model('Table', tableSchema);
