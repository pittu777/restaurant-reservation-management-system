import { Table } from '../models/Table';
import { Reservation } from '../models/Reservation';

export const findAvailableTable = async (
  date: string,
  timeSlot: string,
  guests: number
) => {
  const tables = await Table.find({
    capacity: { $gte: guests },
  }).sort({ capacity: 1 });

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

export const getAvailableTablesCount = async (
  date: string,
  timeSlot: string,
  guests: number
) => {
  const suitableTables = await Table.find({
    capacity: { $gte: guests },
  });

  const suitableTableIds = suitableTables.map(t => t._id);

  
  const bookedTables = await Reservation.find({
    date,
    timeSlot,
    status: 'ACTIVE',
    table: { $in: suitableTableIds },
  }).select('table');

  const bookedTableIds = bookedTables.map(r => r.table.toString());

  const availableCount = suitableTables.filter(
    t => !bookedTableIds.includes(t._id.toString())
  ).length;

  return {
    available: availableCount,
    total: suitableTables.length,
    booked: suitableTables.length - availableCount,
  };
};
