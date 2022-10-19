import mongoose from "mongoose";

export interface IAnimal {
  idSenasa: string;
  type: "Novillo" | "Toro" | "Vaquillona";
  weight: number;
  paddockName: string;
  deviceName: "COLLAR" | "CARAVANA";
  deviceNumber: string;
}

const AnimalSchema = new mongoose.Schema<IAnimal>({
  idSenasa: {
    type: String,
    required: true,
    maxLength: 16,
  },
  type: {
    type: String,
    enum: ["Novillo", "Toro", "Vaquillona"],
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  paddockName: {
    type: String,
    required: true,
    maxLength: 200,
  },
  deviceName: {
    type: String,
    required: true,
    enum: ["COLLAR", "CARAVANA"],
  },
  deviceNumber: {
    type: String,
    required: true,
    maxLength: 8,
  },
});

export const Animal = mongoose.model<IAnimal>("Animal", AnimalSchema);
