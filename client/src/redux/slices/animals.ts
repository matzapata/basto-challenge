import { createSlice } from "@reduxjs/toolkit";
import { fetchAnimals } from "./animalsThunk";

export interface IAnimal {
  id?: string;
  idSenasa: string;
  type: "Novillo" | "Toro" | "Vaquillona";
  weight?: number;
  paddockName: string;
  deviceName: "COLLAR" | "CARAVANA";
  deviceNumber: string;
}

export interface AnimalsState {
  search: string;
  animals: IAnimal[];
  totalPages: number;
  currentPage: number;
}

const initialState: AnimalsState = {
  search: "",
  animals: [],
  totalPages: 0,
  currentPage: 0,
};

export const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAnimals.fulfilled, (state, { payload }) => {
      state.search = payload.search !== undefined ? payload.search : "";
      state.animals = payload.animals;
      state.currentPage = payload.currentPage;
      state.totalPages = payload.totalPages;
    });
  },
});

export const {} = animalsSlice.actions;
export default animalsSlice.reducer;
