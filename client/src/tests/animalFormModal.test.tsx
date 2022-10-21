import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AnimalFormModal from "../components/AnimalFormModal";
import { Button, ChakraProvider, theme, useDisclosure } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { IAnimal } from "../redux/slices/animals";

const animal: IAnimal = {
  id: "id",
  idSenasa: "idsenasa",
  deviceName: "CARAVANA",
  deviceNumber: "num",
  paddockName: "name",
  type: "Novillo",
  weight: 200,
};

const EditAnimal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Button onClick={onOpen}>Edit</Button>
        <AnimalFormModal
          isOpen={isOpen}
          onClose={onClose}
          defaultAnimal={animal}
          onFormSubmit={(animal) => console.log(animal)}
        />
      </ChakraProvider>
    </Provider>
  );
};

describe("AnimalFormModal edit", () => {
  it("Edit animal modal opens on click and renders all form fields required", async () => {
    render(<EditAnimal />);

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => screen.getByText("Id SENASA"));

    expect(screen.getByText("Id SENASA")).toBeInTheDocument();
    expect(screen.getByText("Tipo de animal")).toBeInTheDocument();
    expect(screen.getByText("Peso")).toBeInTheDocument();
    expect(screen.getByText("Nombre del potrero")).toBeInTheDocument();
    expect(screen.getByText("Tipo de dispositivo")).toBeInTheDocument();
    expect(screen.getByText("Numero de dispositivo")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("Edit animal modal opens on click and prefills all form fields", async () => {
    render(<EditAnimal />);

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => screen.getByText("Id SENASA"));

    expect(screen.getByDisplayValue(animal.idSenasa)).toBeInTheDocument();
    expect(screen.getByDisplayValue(animal.deviceName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(animal.deviceNumber)).toBeInTheDocument();
    expect(screen.getByDisplayValue(animal.type)).toBeInTheDocument();
    expect(screen.getByDisplayValue(animal.paddockName)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(animal.weight as number)
    ).toBeInTheDocument();
  });
});
