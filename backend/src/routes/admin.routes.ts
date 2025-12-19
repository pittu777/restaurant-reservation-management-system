import { Router } from 'express';
import {
  getAllReservations,
  getReservationsByDate,
  cancelAnyReservation,
} from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/reservations', getAllReservations);
router.get('/reservations/by-date', getReservationsByDate);
router.delete('/reservations/:id', cancelAnyReservation);

export default router;
