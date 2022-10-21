import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import AnimalsTable from "../components/AnimalsTable";
import nock from "nock";
import { apiExampleResponseTable } from "./utils";
import "dotenv/config";

describe("AnimalsTable", () => {
  it("Animals table renders server data", async () => {
    if (process.env.REACT_APP_API === undefined) {
      return console.log("Mising API env variable");
    }
    nock(process.env.REACT_APP_API)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/animals?page=1&search=")
      .reply(200, apiExampleResponseTable);

    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <AnimalsTable />
        </ChakraProvider>
      </Provider>
    );

    await waitFor(() =>
      screen.getByText(apiExampleResponseTable.animals[0].idSenasa)
    );

    for (let i = 0; i < apiExampleResponseTable.animals.length; i++) {
      expect(
        screen.getByText(apiExampleResponseTable.animals[i].idSenasa)
      ).toBeInTheDocument();
      expect(
        screen.getByText(apiExampleResponseTable.animals[i].deviceName)
      ).toBeInTheDocument();
      expect(
        screen.getByText(apiExampleResponseTable.animals[i].deviceNumber)
      ).toBeInTheDocument();
      expect(
        screen.getByText(apiExampleResponseTable.animals[i].paddockName)
      ).toBeInTheDocument();
      expect(
        screen.getByText(apiExampleResponseTable.animals[i].type)
      ).toBeInTheDocument();
      if (apiExampleResponseTable.animals[i].weight !== undefined) {
        expect(
          screen.getByText(String(apiExampleResponseTable.animals[i].weight))
        ).toBeInTheDocument();
      }
    }

    if (apiExampleResponseTable.totalPages === 1) {
      expect(screen.getByText("Prev")).toBeDisabled();
      expect(screen.getByText("Next")).toBeDisabled();
    }
  });
});
