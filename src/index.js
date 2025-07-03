import express from "express";
import { PORT } from "./config.js";
import { pool } from "./db.js";
import userRoutes from "./routes/user.routes.js";

import sectionsRoutes from "./routes/sections.routes.js";
import authRoutes from "./routes/auth.routes.js";
import assessment from "./routes/assessments.routes.js";
import programs from "./routes/programs.routes.js";
import inventory from "./routes/inventory.routes.js";
import subjects from "./routes/subjects.routes.js";
import enrollments from "./routes/enrollments.routes.js";
import cors from "cors"; // <-- Cambia require por import

import morgan from "morgan";

// Inicializa Express
const app = express();

app.use(
  cors({
    origin: ["https://culinary-school11.netlify.app"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.use("/api", sectionsRoutes);
app.use("/api", assessment);
app.use("/api", programs);
app.use("/api", inventory);
app.use("/api", subjects);
app.use("/api", enrollments);

pool
  .connect()
  .then(() => console.log("Conexión exitosa a PostgreSQL"))
  .catch((err) => console.error("Error de conexión a PostgreSQL", err));
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
