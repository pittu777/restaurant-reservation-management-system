import { Table } from '../models/Table';
import { Reservation } from '../models/Reservation';

export const findAvailableTable = async (
  date: string,
  timeSlot: string,
  guests: number
) => {
  // Get tables that can seat the guests
  const tables = await Table.find({
    capacity: { $gte: guests },
  }).sort({ capacity: 1 }); // smallest suitable table first

  for (const table of tables) {
    const existingReservation = await Reservation.findOne({
      table: table._id,
      date,
      timeSlot,
      status: 'ACTIVE',
    });

    if (!existingReservation) {
      return table;
    }
  }

  return null;
};
