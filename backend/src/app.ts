import expres, { Request, Response } from "express";

const app = expres();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world from app component!");
});

export default app;
