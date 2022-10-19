import express, { Router, Request, Response } from "express";
import { Animal } from "../schemas/animal";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    return res.status(200).send(animal);
  } catch (e: any) {
    return res.status(500).send({ msg: e.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    if (search == undefined) {
      // No filter applied, return all animals
      const allAnimals = await Animal.find();
      return res.status(200).send(allAnimals);
    }

    // Filter results by name and idSenesa that partially match search string
    const searchRegex = new RegExp(search as string, "i");
    const searchResults = await Animal.find({
      $or: [{ idSenasa: searchRegex }, { paddockName: searchRegex }],
    });
    return res.status(200).send(searchResults);
  } catch (e: any) {
    return res.status(500).send({ msg: e.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newAnimal = new Animal({ ...req.body });
    const insertedAnimal = await newAnimal.save();
    return res.status(201).send(insertedAnimal);
  } catch (e: any) {
    return res.status(500).send({ msg: e.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Animal.updateOne({ id }, req.body);
    const updatedAnimal = await Animal.findById(id);
    return res.status(200).send(updatedAnimal);
  } catch (e: any) {
    return res.status(500).send({ msg: e.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAnimal = await Animal.findByIdAndDelete(id);
    return res.status(200).send(deletedAnimal);
  } catch (e: any) {
    return res.status(500).send({ msg: e.message });
  }
});

export default router;
