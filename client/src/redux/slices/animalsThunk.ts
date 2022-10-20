import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnimals = createAsyncThunk(
  "animals/fetchAnimals",
  async (payload: { search?: string }) => {
    const getUrl = payload.search
      ? `${process.env.REACT_APP_API}/animals?search=${payload.search}`
      : `${process.env.REACT_APP_API}/animals`;
    const res = await axios.get(getUrl);

    return {
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
