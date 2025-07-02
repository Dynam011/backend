import express from "express";
import { PORT } from "./config.js";
import { pool } from "./db.js";
import userRoutes from "./routes/user.routes.js";
import classroomRoutes from "./routes/classroom.routes.js";
import sectionsRoutes from "./routes/sections.routes.js";
import authRoutes from "./routes/auth.routes.js";
import assessment from "./routes/assessments.routes.js";

import morgan from "morgan";

// Inicializa Express
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", classroomRoutes);
app.use("/api", sectionsRoutes);
app.use("/api", assessment);
pool.connect()
  .then(() => console.log("Conexión exitosa a PostgreSQL"))
  .catch(err => console.error("Error de conexión a PostgreSQL", err));
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
