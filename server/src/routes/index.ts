import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).send("Bad request");
});

export default router;
