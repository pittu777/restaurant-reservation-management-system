import { Router } from 'express';
import {
  getAllReservations,
  getReservationsByDate,
  cancelAnyReservation,
  deleteReservation,
  getAllTables
} from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/reservations', getAllReservations);
router.get('/reservations/by-date', getReservationsByDate);
router.patch('/reservations/:id/cancel', cancelAnyReservation);
router.delete('/reservations/:id', deleteReservation);
router.get('/tables/all', getAllTables);

export default router;
