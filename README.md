# Restaurant Reservation Management System

A full-stack web application that enables restaurants to manage table reservations efficiently. The system supports both customer-facing reservation functionality and administrative management of bookings.

## 🎯 Project Overview

This application allows customers to create and manage their reservations while providing administrators with comprehensive oversight and control over all restaurant bookings. The system prevents double bookings and capacity conflicts through intelligent availability logic.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [API Endpoints](#api-endpoints)
- [Key Features Explanation](#key-features-explanation)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

## ✨ Features

### Customer Features
- **User Authentication**: Register and login with email/password
- **Create Reservations**: Book tables for specific dates and time slots
- **View My Reservations**: Browse all personal reservations with status
- **Cancel Reservations**: Cancel active reservations
- **Availability Checking**: Check available tables before making a reservation
- **Visual Table Display**: See available and booked tables with capacity information

### Admin Features
- **View All Reservations**: Complete overview of all restaurant reservations
- **Filter by Date**: View reservations for specific dates
- **Cancel/Update Reservations**: Manage any reservation in the system
- **Manage Tables**: Create and delete restaurant tables
- **Admin Dashboard**: Dedicated admin panel with reservation statistics
- **Role-Based Access**: Restricted access to admin-only endpoints

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (TypeScript)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: Zod for schema validation
- **Additional**: CORS, Cookie Parser

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI
- **Routing**: React Router v7
- **Animations**: GSAP
- **Toast Notifications**: Sonner

## 📁 Project Structure

```
Restaurant Reservation Management System/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express app setup
│   │   ├── server.ts              # Server entry point
│   │   ├── config/
│   │   │   └── db.ts              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts    # Authentication logic
│   │   │   ├── reservation.controller.ts  # Reservation operations
│   │   │   └── admin.controller.ts      # Admin operations
│   │   ├── models/
│   │   │   ├── User.ts            # User schema
│   │   │   ├── Table.ts           # Table schema
│   │   │   └── Reservation.ts     # Reservation schema
│   │   ├── routes/
│   │   │   ├── auth.routes.ts     # Auth endpoints
│   │   │   ├── reservation.routes.ts  # Reservation endpoints
│   │   │   └── admin.routes.ts       # Admin endpoints
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts   # JWT verification
│   │   │   └── role.middleware.ts   # Role-based authorization
│   │   ├── services/
│   │   │   └── availability.service.ts  # Table availability logic
│   │   └── utils/
│   │       ├── jwt.ts             # JWT utilities
│   │       └── seedTables.ts      # Database seeding script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.ts           # Redux store configuration
│   │   │   └── hooks.ts           # Redux hooks
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── authTypes.ts
│   │   │   │   └── components/
│   │   │   ├── reservations/
│   │   │   │   ├── reservationSlice.ts
│   │   │   │   └── components/
│   │   │   └── tables/
│   │   │       └── tableSlice.ts
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── CreateReservation.tsx
│   │   │   ├── MyReservations.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   └── home/
│   │   ├── lib/
│   │   │   └── axios.ts           # API client configuration
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Seed database tables**
   ```bash
   npm run seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file**
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

### Backend `.env`
```env
# Database
MONGO_URI=mongodb://localhost:27017/restaurant-reservation

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-here-change-in-production

# CORS
ALLOWED_ORIGIN=http://localhost:5173
```

### Frontend `.env.local`
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Application runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
npm run build
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

## 🌱 Database Seeding

### Seed Tables

The system comes with a pre-configured table setup:

- **2 tables** with 2-seat capacity (Couple tables)
- **2 tables** with 4-seat capacity (Small group tables)
- **1 table** with 6-seat capacity (Large group table)

To seed the database:

```bash
cd backend
npm run seed
```

The seed script is located at `src/utils/seedTables.ts` and can be customized by modifying the `TABLE_CONFIG` array.

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Create new user account | No |
| POST | `/login` | User login | No |
| GET | `/me` | Get current user info | JWT |
| POST | `/logout` | User logout | JWT |

### Reservation Routes (`/api/reservations`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/` | Create reservation | JWT | User |
| GET | `/me` | Get user's reservations | JWT | User |
| GET | `/available` | Check available tables | JWT | User |
| GET | `/tables-status` | Get table status for date/time | JWT | User |
| DELETE | `/:id` | Cancel user's reservation | JWT | User |
| GET | `/tables/all` | Get all tables | JWT | Admin |
| POST | `/tables` | Create new table | JWT | Admin |
| DELETE | `/tables/:id` | Delete table | JWT | Admin |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/reservations` | Get all reservations | JWT | Admin |
| GET | `/reservations/date/:date` | Get reservations by date | JWT | Admin |
| PUT | `/reservations/:id` | Update reservation | JWT | Admin |
| DELETE | `/reservations/:id` | Cancel reservation | JWT | Admin |
| DELETE | `/reservations/:id/permanent` | Delete reservation permanently | JWT | Admin |

## 🔍 Key Features Explanation

### Reservation & Availability Logic

The system prevents double bookings through intelligent availability checking:

1. **Table Selection Algorithm**
   - Fetches tables that can accommodate the requested number of guests (capacity ≥ guests)
   - Sorts tables by capacity (smallest to largest) for optimal utilization
   - Checks each table for existing reservations at the same date and time slot
   - Assigns the first available table (smallest suitable table)

2. **Conflict Prevention**
   - Each reservation is unique to a specific table, date, and time slot combination
   - Checks for 'ACTIVE' reservations only (cancelled reservations don't block availability)
   - Only one reservation allowed per table per time slot per day

3. **Availability Calculation**
   - Counts total suitable tables for the requested capacity
   - Counts booked tables for the specific date and time
   - Returns available count for UI feedback

**Implementation Location**: `src/services/availability.service.ts`

### Role-Based Access Control

The system implements two distinct roles with appropriate access restrictions:

#### User Role
- Can create reservations for themselves
- Can view only their own reservations
- Can cancel only their own active reservations
- Limited to customer-facing features

#### Admin Role
- Can view all reservations system-wide
- Can filter reservations by date
- Can cancel or update any reservation
- Can manage restaurant tables (create/delete)
- Access to dedicated admin dashboard
- Full system oversight

**Implementation**:
- Authentication: `src/middlewares/auth.middleware.ts` - JWT verification
- Authorization: `src/middlewares/role.middleware.ts` - Role checking

All protected routes enforce role requirements at the route level.

### Data Modeling

#### User Schema
```typescript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: 'user' | 'admin' (default: 'user'),
  timestamps: true
}
```

#### Table Schema
```typescript
{
  tableNumber: Number (required, unique),
  capacity: Number (required, min: 1),
  timestamps: true
}
```

#### Reservation Schema
```typescript
{
  user: ObjectId (ref: User, required),
  table: ObjectId (ref: Table, required),
  date: String (YYYY-MM-DD, required),
  timeSlot: String (HH:MM-HH:MM, required),
  guests: Number (required, min: 1),
  status: 'ACTIVE' | 'CANCELLED' (default: 'ACTIVE'),
  timestamps: true
}
```

## 🚢 Deployment

The application can be deployed on various platforms. Here are common options:

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable: `VITE_API_URL`
4. Vercel automatically builds and deploys

### Backend Deployment (Render or Railway)

1. Connect GitHub repository
2. Configure environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ALLOWED_ORIGIN`
3. Deploy with `npm start`

### Database (MongoDB Atlas)

1. Create free cluster on MongoDB Atlas
2. Generate connection string
3. Add to backend environment variables

## ⚠️ Known Limitations

1. **Time Slots**: Currently uses fixed time slot format (HH:MM-HH:MM) - not dynamically configured
2. **Table Management**: Tables are seeded at startup; runtime table changes don't persist if server restarts without database save
3. **Email Notifications**: No email confirmations for reservations
4. **Real-time Updates**: No real-time synchronization; clients must refresh for updates
5. **Payment Integration**: No payment processing system
6. **Multiple Restaurants**: System assumes single restaurant operation
7. **Peak Hours**: No surge pricing or premium time slots
8. **UI Responsiveness**: Optimized for desktop; mobile experience could be improved
9. **Reservation History**: Cancelled reservations are soft-deleted (status changed); no permanent deletion by users
10. **Concurrent Bookings**: No transaction-level locking; potential race conditions under heavy load

## 🔮 Future Improvements

### Short Term
- [ ] Add email notifications for reservation confirmations
- [ ] Implement real-time availability updates using WebSockets
- [ ] Add time slot configuration in admin panel
- [ ] Improve mobile responsive design
- [ ] Add reservation modification (change date/time/guests)
- [ ] Implement input validation with Zod on frontend

### Medium Term
- [ ] Add payment integration (Stripe/PayPal)
- [ ] Implement user ratings and reviews
- [ ] Add reservation reminders (email/SMS)
- [ ] Multi-language support (i18n)
- [ ] Advanced filtering and search
- [ ] Export reservations to CSV/PDF

### Long Term
- [ ] Support multiple restaurant management
- [ ] AI-powered recommendation engine
- [ ] Loyalty/rewards program
- [ ] Analytics dashboard with insights
- [ ] Mobile native apps (React Native)
- [ ] Integration with calendar services (Google Calendar, Outlook)
- [ ] Queue management for walk-ins
- [ ] Table layout visualization and management

## 📝 Assumptions

1. **Single Restaurant**: The system manages reservations for one restaurant only
2. **Fixed Capacity**: Table capacities are predetermined and don't change dynamically
3. **Time Slots**: Predefined time slots are used (e.g., 18:00-20:00)
4. **Same-Day Reservations**: Users cannot book tables on past dates
5. **No Cancellation Fees**: Cancellations are free without penalties
6. **Working Hours**: Restaurant operates during defined business hours
7. **UTC Time**: All dates/times are stored in YYYY-MM-DD and HH:MM format
8. **Single Login Session**: Users have one active session at a time
9. **Admin Trust**: Admin users are trusted to manage all reservations
10. **No Overbooking**: Table capacity is strictly enforced

## 👥 Author

Created for Fission Infotech Technical Assignment

---

**Last Updated**: December 2025
**Version**: 1.0.0
