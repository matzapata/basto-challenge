import request from "supertest-session";
import app from "../src/app";
import mongoose from "mongoose";
import { Animal } from "../src/schemas/animal";

const seedAnimals = [
  {
    idSenasa: "idSenasa",
    deviceName: "CARAVANA",
    paddockName: "paddockName",
    type: "Novillo",
    weight: 120,
    deviceNumber: "1",
  },
  {
    idSenasa: "idSenasa_1",
    deviceName: "CARAVANA",
    paddockName: "paddockName_1",
    type: "Novillo",
    weight: 120,
    deviceNumber: "2",
  },
];

const server = request(app);

describe("Animals routes", () => {
  beforeAll(async () => {
    if (process.env.TEST_DB_URI === undefined) {
      console.error("Missing DB_URI env variable");
      process.exit(1);
    }

    try {
      mongoose.connect(process.env.TEST_DB_URI);
      await Animal.remove({});
      for (const animal of seedAnimals) {
        const newAnimal = new Animal(animal);
        await newAnimal.save();
      }
    } catch (e) {
      console.error("Unable to connect to the database:");
      console.error(e);
      process.exit(1);
    }
  });

  describe("GET /api/animals", () => {
    it("GET /api/animals should respond with all the animals for page 1", async () => {
      const res = await server.get("/api/animals");

      expect(res.statusCode).toBe(200);
      expect(res.body.currentPage).toBe(1);
      expect(res.body.totalPages).toBe(1);
      expect(res.body.animals.length).toBe(seedAnimals.length);
      expect(res.body.animals[0]).toHaveProperty("_id");
      expect(res.body.animals[0]).toHaveProperty("idSenasa");
      expect(res.body.animals[0]).toHaveProperty("deviceName");
      expect(res.body.animals[0]).toHaveProperty("paddockName");
      expect(res.body.animals[0]).toHaveProperty("type");
      expect(res.body.animals[0]).toHaveProperty("deviceNumber");
    });

    it("GET /api/animals should filter results based on query", async () => {
      const res = await server.get("/api/animals?search=idSenasa_1");

      expect(res.statusCode).toBe(200);
      expect(res.body.currentPage).toBe(1);
      expect(res.body.totalPages).toBe(1);
      expect(res.body.animals.length).toBe(1);
      expect(res.body.animals[0].idSenasa).toEqual("idSenasa_1");
      expect(res.body.animals[0]).toHaveProperty("_id");
      expect(res.body.animals[0]).toHaveProperty("idSenasa");
      expect(res.body.animals[0]).toHaveProperty("deviceName");
      expect(res.body.animals[0]).toHaveProperty("paddockName");
      expect(res.body.animals[0]).toHaveProperty("type");
      expect(res.body.animals[0]).toHaveProperty("deviceNumber");
    });
  });

  describe("POST /api/animals", () => {
    it("POST /api/animals should create animal and return the db instance", async () => {
      const res = await server.post("/api/animals").send({
        ...seedAnimals[0],
        idSenasa: "POST",
      });
      const animals = await Animal.find({});

      expect(animals.find((a) => a.idSenasa === "POST")).not.toBe(undefined);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("idSenasa");
      expect(res.body).toHaveProperty("deviceName");
      expect(res.body).toHaveProperty("paddockName");
      expect(res.body).toHaveProperty("type");
      expect(res.body).toHaveProperty("deviceNumber");
    });
    it("POST /api/animals should respond with 500 on error", async () => {
      const res = await server.post(`/api/animals`).send({});
      expect(res.statusCode).toBe(500);
    });
  });

  describe("PUT /api/animals", () => {
    it("POST /api/animals should update animal and return the db instance", async () => {
      let animals = await Animal.find({});
      const res = await server.put(`/api/animals/${animals[0]._id}`).send({
        idSenasa: "PUT",
      });
      animals = await Animal.find({});

      expect(animals.find((a) => a.idSenasa === "PUT")).not.toBe(undefined);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("idSenasa");
      expect(res.body).toHaveProperty("deviceName");
      expect(res.body).toHaveProperty("paddockName");
      expect(res.body).toHaveProperty("type");
      expect(res.body).toHaveProperty("deviceNumber");
    });
    it("PUT /api/animals should respond with 500 on error", async () => {
      const res = await server.put(`/api/animals/errorId`);
      expect(res.statusCode).toBe(500);
    });
  });

  describe("DELETE /api/animals", () => {
    it("DELETE /api/animals should delete animal and return the db instance", async () => {
      let animals = await Animal.find({});
      const deletedAnimalId = animals[0]._id;
      const res = await server.delete(`/api/animals/${deletedAnimalId}`);
      animals = await Animal.find({});

      expect(animals.find((a) => a._id === deletedAnimalId)).toBe(undefined);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("idSenasa");
      expect(res.body).toHaveProperty("deviceName");
      expect(res.body).toHaveProperty("paddockName");
      expect(res.body).toHaveProperty("type");
      expect(res.body).toHaveProperty("deviceNumber");
    });
    it("DELETE /api/animals should respond with 500 on error", async () => {
      const res = await server.delete(`/api/animals/errorId`);
      expect(res.statusCode).toBe(500);
    });
  });
});
