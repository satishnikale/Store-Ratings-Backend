import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);

async function main() {
  app.listen(PORT);
  console.log(`App is listening on PORT ${PORT}`);
}

main();
