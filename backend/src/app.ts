import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import reservationRoutes from "./routes/reservation.routes";
import adminRoutes from './routes/admin.routes';
import cookieParser from 'cookie-parser';

const app = express();

// CORS Configuration with environment variables
const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.get('/health', (_req, res)=>{
    res.json({status:'ok'});
});
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);


export default app;
