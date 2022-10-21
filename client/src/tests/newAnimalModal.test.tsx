import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import NewAnimalModal from "../components/NewAnimalModal";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("AnimalFormModal New", () => {
  it("New animal modal opens on click and renders all form fields required", async () => {
    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <NewAnimalModal />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("Nuevo animal"));

    await waitFor(() => screen.getByText("Id SENASA"));

    expect(screen.getByText("Id SENASA")).toBeInTheDocument();
    expect(screen.getByText("Tipo de animal")).toBeInTheDocument();
    expect(screen.getByText("Peso")).toBeInTheDocument();
    expect(screen.getByText("Nombre del potrero")).toBeInTheDocument();
    expect(screen.getByText("Tipo de dispositivo")).toBeInTheDocument();
    expect(screen.getByText("Numero de dispositivo")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });
});
