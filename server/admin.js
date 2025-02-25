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

app.use(express.json());
// For cross origin to connect frontend and the backend
app.use(cors());

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

// Server
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
