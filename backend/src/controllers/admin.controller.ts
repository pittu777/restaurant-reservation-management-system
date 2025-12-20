import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { Table } from '../models/Table';

export const getAllReservations = async (
  _req: Request,
  res: Response
) => {
  const reservations = await Reservation.find()
    .populate('user')
    .populate('table')
    .sort({ createdAt: -1 });

  res.json(reservations);
};

export const getReservationsByDate = async (
  req: Request,
  res: Response
) => {
  const { date } = req.query;

  const reservations = await Reservation.find({ date })
    .populate('user')
    .populate('table');

  res.json(reservations);
};

export const cancelAnyReservation = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

  reservation.status = 'CANCELLED';
  await reservation.save();

  res.json({ message: 'Reservation cancelled by admin' });
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};