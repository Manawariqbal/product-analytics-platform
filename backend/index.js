import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import eventsRoutes from "./src/routes/events.js";
import projectsRoutes from "./src/routes/projects.js";
import analyticsRoutes from "./src/routes/analytics.js";


dotenv.config();

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    message: "Product Analytics API running"
  });
});

app.use("/events", eventsRoutes);
app.use("/projects", projectsRoutes);
app.use("/analytics", analyticsRoutes);
/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});