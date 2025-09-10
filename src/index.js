import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import ownerRoutes from "./routes/ownerRoute.js";
import adminRoutes from "./routes/adminRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/owner", ownerRoutes);
app.use("/api/v1/admin", adminRoutes);

async function main() {
  app.listen(PORT);
  console.log(`App is listening on PORT ${PORT}`);
}

main();
