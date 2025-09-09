import express from "express";
import { PORT } from "./config.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server" });
});

async function main() {
  app.listen(PORT);
  console.log(`App is listening on PORT ${PORT}`);
}

main();
