import { Response } from 'express';
import { Reservation } from '../models/Reservation';
import { findAvailableTable, getAvailableTablesCount } from '../services/availability.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Table } from '../models/Table';

export const createReservation = async (
  req: AuthRequest,
  res: Response
) => {
  const { date, timeSlot, guests } = req.body;

  if (!date || !timeSlot || !guests) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const table = await findAvailableTable(date, timeSlot, guests);

  if (!table) {
    return res
      .status(409)
      .json({ message: 'No available table for the selected time slot' });
  }

  const reservation = await Reservation.create({
    user: req.user!.userId,
    table: table._id,
    date,
    timeSlot,
    guests,
  });

  res.status(201).json(reservation);
};

export const getMyReservations = async (
  req: AuthRequest,
  res: Response
) => {
  const reservations = await Reservation.find({
    user: req.user!.userId,
  })
    .populate('table')
    .sort({ createdAt: -1 });

  res.json(reservations);
};

export const cancelMyReservation = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const reservation = await Reservation.findOne({
    _id: id,
    user: req.user!.userId,
    status: 'ACTIVE',
  });

  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

  reservation.status = 'CANCELLED';
  await reservation.save();

  res.json({ message: 'Reservation cancelled successfully' });
};

export const getAvailableTables = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { date, timeSlot, guests } = req.query;

    if (!date || !timeSlot || !guests) {
      return res.status(400).json({ message: 'Missing required parameters: date, timeSlot, guests' });
    }

    const result = await getAvailableTablesCount(
      date as string,
      timeSlot as string,
      parseInt(guests as string)
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTablesWithStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { date, timeSlot } = req.query;

    if (!date || !timeSlot) {
      return res.status(400).json({ message: 'Missing required parameters: date, timeSlot' });
    }

    const allTables = await Table.find().sort({ tableNumber: 1 });

    const bookedReservations = await Reservation.find({
      date: date as string,
      timeSlot: timeSlot as string,
      status: 'ACTIVE',
    }).select('table');

    const bookedTableIds = bookedReservations.map(r => r.table.toString());

    // tables with availability status
    const tablesWithStatus = allTables.map(table => ({
      _id: table._id,
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      isBooked: bookedTableIds.includes(table._id.toString()),
    }));

    res.json(tablesWithStatus);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllTables = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTable = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { capacity } = req.body;

    if (!capacity || capacity <= 0 || capacity > 20) {
      return res.status(400).json({ message: 'Invalid capacity. Must be between 1 and 20.' });
    }

    // Get next table number
    const lastTable = await Table.findOne().sort({ tableNumber: -1 });
    const tableNumber = (lastTable?.tableNumber || 0) + 1;

    const table = await Table.create({ tableNumber, capacity });
    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTable = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if table has active reservations
    const activeReservations = await Reservation.findOne({
      table: id,
      status: 'ACTIVE',
    });

    if (activeReservations) {
      return res.status(409).json({
        message: 'Cannot delete table with active reservations. Cancel all reservations first.',
      });
    }

    const table = await Table.findByIdAndDelete(id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json({ message: 'Table deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
