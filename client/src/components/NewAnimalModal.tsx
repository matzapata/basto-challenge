import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import AnimalFormModal from "./AnimalFormModal";
import { useAppDispatch } from "../redux/store";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import { IAnimal } from "../redux/slices/animals";
import axios from "axios";

export default function NewAnimalModal() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (animal: IAnimal) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/animals`, {
        ...animal,
      });
      dispatch(fetchAnimals({}));
      window.alert("Se creo el animal exitosamente");
    } catch (e) {
      window.alert("Error en la creacion del animal");
      console.log(e);
    }
  };

  return (
    <>
      <Button
        size="sm"
        bg="gray.800"
        color="white"
        _hover={{ backgroundColor: "gray.700" }}
        onClick={onOpen}
      >
        New animal
      </Button>
      <AnimalFormModal
        onFormSubmit={(animal) => onSubmit(animal)}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
