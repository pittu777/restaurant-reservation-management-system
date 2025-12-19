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
