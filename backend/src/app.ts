import express from 'express';
// import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import reservationRoutes from "./routes/reservation.routes";
import adminRoutes from './routes/admin.routes'

const app = express();

// app.use(cors());
app.use(express.json());

app.get('/health', (_req, res)=>{
    res.json({status:'ok'});
});
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);


export default app;
