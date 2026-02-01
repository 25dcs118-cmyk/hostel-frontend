# Hostel Backend

Simple Express backend for the hostel frontend.

Install:

```bash
cd backend
npm install
```

Run:

```bash
npm run start
# or for development
npm run dev
```

API endpoints (default host `http://localhost:4000`):
- GET `/api/rooms`
- POST `/api/rooms` {room,cap}
- GET `/api/bookings`
- POST `/api/bookings` {roomId,tenant,from,to}
- GET `/api/complaints`
- POST `/api/complaints` {tenant, text}
- GET `/api/rents`
- POST `/api/rents` {tenant, amount}
- GET `/api/notices`
- POST `/api/notices` {text}

Data persisted to `data.json` in the backend folder.
