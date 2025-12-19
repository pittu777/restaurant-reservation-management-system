import { Router } from 'express';
import {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAvailableTables,
} from '../controllers/reservation.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createReservation);
router.get('/me', authenticate, getMyReservations);
router.get('/available', authenticate, getAvailableTables);
router.delete('/:id', authenticate, cancelMyReservation);

export default router;
