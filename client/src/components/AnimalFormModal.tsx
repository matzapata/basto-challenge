import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { IAnimal } from "../redux/slices/animals";
import axios from "axios";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import { useAppDispatch } from "../redux/store";

interface Animal {
  id?: string;
  idSenasa: string;
  type: "Novillo" | "Toro" | "Vaquillona";
  weight?: number;
  paddockName: string;
  deviceName: "COLLAR" | "CARAVANA";
  deviceNumber: string;
}

const emptyAnimal: Animal = {
  idSenasa: "",
  deviceName: "COLLAR",
  deviceNumber: "",
  type: "Novillo",
  paddockName: "",
  weight: undefined,
};

export default function NewAnimalModal({
  isOpen,
  onClose,
  defaultAnimal,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultAnimal?: IAnimal;
}) {
  const dispatch = useAppDispatch();
  const createAnimal = defaultAnimal === undefined;
  const [animal, setAnimal] = React.useState<Animal>(emptyAnimal);

  React.useEffect(() => {
    if (defaultAnimal) setAnimal(defaultAnimal);
  }, [defaultAnimal]);

  const onChange = (e: any) => {
    setAnimal({
      ...animal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (createAnimal) {
      await axios.post(`${process.env.REACT_APP_API}/animals`, {
        ...animal,
      });
      dispatch(fetchAnimals({}));
      window.alert("Successfully created animal");
    } else {
      const updatedAnimal = { ...animal };
      delete updatedAnimal.id;
      await axios.put(`${process.env.REACT_APP_API}/animals/${animal.id}`, {
        ...updatedAnimal,
      });
      dispatch(fetchAnimals({}));
      window.alert("Successfully updated animal");
    }
    onClose();
  };

  return (
    <Modal
      onClose={() => {
        onClose();
        setAnimal(emptyAnimal);
      }}
      isOpen={isOpen}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent bg="gray.100">
        <ModalHeader>{createAnimal ? "Nuevo" : "Editar"} animal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl isRequired mb="4">
              <FormLabel>Id SENASA</FormLabel>
              <Input
                name="idSenasa"
                onChange={onChange}
                value={animal.idSenasa}
                bg="white"
                type="text"
                required
              />
            </FormControl>
            <FormControl isRequired mb="4">
              <FormLabel>Tipo de animal</FormLabel>
              <Select
                bg="white"
                name="type"
                required
                value={animal.type}
                onChange={onChange}
                placeholder="Selecciona un tipo de animal"
              >
                <option value="Novillo">Novillo</option>
                <option value="Toro">Toro</option>
                <option value="Vaquillona">Vaquillona</option>
              </Select>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Peso</FormLabel>
              <Input
                value={animal.weight === undefined ? animal.weight : 0}
                onChange={onChange}
                bg="white"
                type="number"
              />
            </FormControl>
            <FormControl isRequired mb="4">
              <FormLabel>Nombre del potrero</FormLabel>
              <Input
                value={animal.paddockName}
                onChange={onChange}
                name="paddockName"
                bg="white"
                type="text"
                required
              />
            </FormControl>
            <FormControl isRequired mb="4">
              <FormLabel>Tipo de dispositivo</FormLabel>
              <Select
                required
                bg="white"
                name="deviceName"
                onChange={onChange}
                value={animal.deviceName}
                placeholder="Selecciona un tipo de animal"
              >
                <option value="COLLAR">COLLAR</option>
                <option value="CARVANA">CARVANA</option>
              </Select>
            </FormControl>
            <FormControl isRequired mb="4">
              <FormLabel>Numero de dispositivo</FormLabel>
              <Input
                value={animal.deviceNumber}
                name="deviceNumber"
                onChange={onChange}
                bg="white"
                type="text"
                required
              />
            </FormControl>
            <Button
              bg="gray.800"
              color="white"
              _hover={{ backgroundColor: "gray.700" }}
              type="submit"
              mb="4"
            >
              Guardar
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
