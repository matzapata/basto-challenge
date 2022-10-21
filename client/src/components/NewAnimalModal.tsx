import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import AnimalFormModal from "./AnimalFormModal";
import { useAppDispatch } from "../redux/store";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import { IAnimal } from "../redux/slices/animals";

export default function NewAnimalModal() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (animal: IAnimal) => {
    const res = await fetch(`${process.env.REACT_APP_API}/animals`, {
      method: "POST",
      body: JSON.stringify({ ...animal }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      dispatch(fetchAnimals({}));
      window.alert("Se creo el animal exitosamente");
    } else {
      window.alert("Error en la creacion del animal");
      console.log(res);
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
