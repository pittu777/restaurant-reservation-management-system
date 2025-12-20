import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import reservationRoutes from "./routes/reservation.routes";
import adminRoutes from './routes/admin.routes';
import cookieParser from 'cookie-parser';

const app = express();

// CORS Configuration with environment variables
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",");

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
