import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
