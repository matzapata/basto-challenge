import { store } from "../redux/store";
import nock from "nock";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import "dotenv/config";
import { apiExampleResponse } from "./utils";

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
      .reply(200, apiExampleResponse);

    await store.dispatch(fetchAnimals({}));
    const state = store.getState();

    expect(state.animals.animals.length).toEqual(
      apiExampleResponse.animals.length
    );
    expect(state.animals.totalPages).toEqual(apiExampleResponse.totalPages);
    expect(state.animals.currentPage).toEqual(apiExampleResponse.currentPage);
  });
});
