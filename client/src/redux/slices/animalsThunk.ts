import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchAnimals = createAsyncThunk(
  "animals/fetchAnimals",
  async (payload: { search?: string; page?: number }, { getState }) => {
    const state = getState() as RootState;

    // If search parameter was not provided, take it from local state to allow pagination in search results
    const res = await axios.get(
      `${process.env.REACT_APP_API}/animals?page=${
        payload.page ? payload.page : 1
      }&search=${payload.search ? payload.search : state.animals.search}`
    );

    return {
      search: payload.search,
      currentPage: res.data.currentPage,
      totalPages: res.data.totalPages,
      animals: res.data.animals.map((a: any) => ({
        id: a._id,
        idSenasa: a.idSenasa,
        type: a.type,
        weight: a.weight,
        paddockName: a.paddockName,
        deviceName: a.deviceName,
        deviceNumber: a.deviceNumber,
      })),
    };
  }
);
