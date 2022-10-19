import express, { Router, Request, Response } from "express";
import { Animal } from "../schemas/animal";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const animal = await Animal.findById(id);
  return res.status(200).json(animal);
});

router.get("/", async (req: Request, res: Response) => {
  const allAnimals = await Animal.find();
  return res.status(200).json(allAnimals);
});

router.post("/", async (req: Request, res: Response) => {
  const newAnimal = new Animal({ ...req.body });
  const insertedAnimal = await newAnimal.save();
  return res.status(201).json(insertedAnimal);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Animal.updateOne({ id }, req.body);
  const updatedAnimal = await Animal.findById(id);
  return res.status(200).json(updatedAnimal);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedAnimal = await Animal.findByIdAndDelete(id);
  return res.status(200).json(deletedAnimal);
});

export default router;
