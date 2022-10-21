import { store } from "../redux/store";
import nock from "nock";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import "dotenv/config";

const exampleResponse = {
  animals: [
    {
      _id: "63504a0718f7f58f3a53570c",
      idSenasa: "1",
      type: "Vaquillona",
      weight: 120,
      paddockName: "paddock",
      deviceName: "COLLAR",
      deviceNumber: "155a",
      __v: 0,
    },
    {
      _id: "63504a0718f7f58f3a53570e",
      idSenasa: "2",
      type: "Novillo",
      weight: 120,
      paddockName: "paddockName",
      deviceName: "COLLAR",
      deviceNumber: "123",
      __v: 0,
    },
    {
      _id: "63504a0818f7f58f3a535710",
      idSenasa: "abc",
      type: "Novillo",
      weight: 120,
      paddockName: "paddockName",
      deviceName: "COLLAR",
      deviceNumber: "123",
      __v: 0,
    },
    {
      _id: "63504a0918f7f58f3a535712",
      idSenasa: "abc",
      type: "Novillo",
      weight: 120,
      paddockName: "paddockName",
      deviceName: "COLLAR",
      deviceNumber: "123",
      __v: 0,
    },
    {
      _id: "635181ae547a3de111a1cff9",
      idSenasa: "ddd",
      type: "Vaquillona",
      paddockName: "asas",
      deviceName: "COLLAR",
      deviceNumber: "155a",
      __v: 0,
    },
  ],
  totalPages: 1,
  currentPage: 1,
};

describe("Actions", () => {
  it("Fetch animals", async () => {
    if (process.env.REACT_APP_API === undefined) {
      return console.log("Mising API env variable");
    }

    nock(process.env.REACT_APP_API)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/animals?page=1&search=")
      .reply(200, exampleResponse);

    await store.dispatch(fetchAnimals({}));
    const state = store.getState();

    expect(state.animals.animals.length).toEqual(
      exampleResponse.animals.length
    );
    expect(state.animals.totalPages).toEqual(exampleResponse.totalPages);
    expect(state.animals.currentPage).toEqual(exampleResponse.currentPage);
  });
});
