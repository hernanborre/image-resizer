import * as dotenv from 'dotenv';
import express, { Request, Response } from "express";
import path from 'path';
import bookRoutes from "./routes/taskRouters";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", bookRoutes);

const __dirname = path.resolve();

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenido a mi image resizer en node.js + TypeScript!!!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});