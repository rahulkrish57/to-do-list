import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
const port = process.env.PORT || 4000;
import db from "./db";
import listRoute from "./routes/list.route";

// configure the .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database connection
db();

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "API UP" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Health Check Success" });
});

// Routes
app.use("/api/v1", listRoute);

// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  (error as any).status = 404;
  next(error);
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
