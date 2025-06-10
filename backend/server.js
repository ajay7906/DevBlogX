require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const rateLimit = require('express-rate-limit');
const connectDb = require("./config/db");



const app = express();
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:" Too many req from this IP"
});
// connecct db
connectDb();


// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);


// Routes
app.use("/api/auth", authRoutes);

// DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("DB Connected"))
//   .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));