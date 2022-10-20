import { createSlice } from "@reduxjs/toolkit";

export interface IAnimal {
  idSenasa: string;
  type: "Novillo" | "Toro" | "Vaquillona";
  weight: number;
  paddockName: string;
  deviceName: "COLLAR" | "CARAVANA";
  deviceNumber: string;
}

export interface AnimalsState {
  animals: IAnimal[];
  totalPages: number;
  currentPage: number;
}

const initialState: AnimalsState = {
  animals: [],
  totalPages: 0,
  currentPage: 0,
};

export const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
});

export const {} = animalsSlice.actions;
export default animalsSlice.reducer;
