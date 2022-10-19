import express, { Router } from "express";
import animalsRouter from "./animals";

const router: Router = express.Router();

router.use("/animals", animalsRouter);
router.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).send("Bad request");
});

export default router;
