const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const database = require("./db/Connection");
const userRouter = require("./Routes/UserRouter");
const landlordRouter = require("./Routes/landLordRouter");
const tenantsRouter = require("./Routes/TenantsRouter");
const roomRouter = require("./Routes/RoomRoute");
const adminRouter = require("./Routes/AdminRouter");
const dashboardRouter = require("./Routes/DashboardRoutes");

const frontendUrl =
  process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

app.use(express.json());
// For cross origin to connect frontend and the backend
app.use(
  cors({
    // origin: frontendUrl,
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database connection
database();

// Api to delete user from the database
app.use("/api/admin", userRouter);
// Api to delete landlord from the database
app.use("/api/admin", landlordRouter);
// Api to delete,edit,create and approve a tenants
app.use("/api/admin", tenantsRouter);

// Api to delete,edit,create and approve a room
app.use("/api/admin", roomRouter);

// For admin user creation fetching and deletion
app.use("/api/admin", adminRouter);

// For total users, pending rooms and approved rooms
app.use("/api/admin", dashboardRouter);

// Server
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
