//express server setup
import express from 'express';
//importing dotenv to use environment variables
import dotenv from 'dotenv';
//importing cors to handle cross-origin requests
import cors from 'cors';
//importing cookie-parser to parse cookies in requests
import cookieParser from 'cookie-parser';

import {router} from './routes/userRoutes.js';

import connectDB from './utills/db.js';

import {PropertyRouter} from './routes/propertyRouter.js';
import { bookingRouter } from './routes/bookingRouter.js';
 import { tripRouter } from './routes/tripRouter.js';
dotenv.config();
const app = express();

// Parse allowed CORS origins
const allowedOrigins = process.env.ORIGIN_ACCESS_URL
  ? process.env.ORIGIN_ACCESS_URL.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile, server-to-server, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      // Allow any Netlify deploy preview or production
      if (origin.endsWith('.netlify.app') || origin.includes('localhost')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

// express.json() middleware to parse incoming JSON requests
app.use(express.json({ limit: "100mb" }));
// urlencoded middleware to parse incoming URL-encoded requests
app.use(express.urlencoded({ limit: "100mb", extended: true }));
// cookie-parser middleware to parse cookies in requests
app.use(cookieParser());

const port = process.env.PORT || process.env.Port || 8000;

app.get("/", (req, res) => {
  res.send("HomlyHub Backend is running!");
});

// Health check endpoint for Render and ping services
app.get(["/api/health", "/health"], (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listings", PropertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);
app.use("/api/v1/rent/trip", tripRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to database or start server:", err);
  }
};

startServer();