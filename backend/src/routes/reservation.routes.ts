import { Router } from 'express';
import {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAvailableTables,
  getTablesWithStatus,
  getAllTables,
  createTable,
  deleteTable,
} from '../controllers/reservation.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, createReservation);
router.get('/me', authenticate, getMyReservations);
router.get('/available', authenticate, getAvailableTables);
router.get('/tables-status', authenticate, getTablesWithStatus);
router.get('/tables/all', authenticate, authorize('admin'), getAllTables);
router.post('/tables', authenticate, authorize('admin'), createTable);
router.delete('/tables/:id', authenticate, authorize('admin'), deleteTable);
router.delete('/:id', authenticate, cancelMyReservation);

export default router;
