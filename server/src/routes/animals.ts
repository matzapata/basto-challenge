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
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.page) : 6;

    const findFilterObj: any = {};
    if (search !== undefined) {
      const searchRegex = new RegExp(search as string, "i");
      findFilterObj.$or = [
        { idSenasa: searchRegex },
        { paddockName: searchRegex },
      ];
    }

    // Filter results by name and idSenesa that partially match search string
    const searchResults = await Animal.find(findFilterObj)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await Animal.countDocuments();

    return res.status(200).send({
      animals: searchResults,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
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
