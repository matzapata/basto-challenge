import React from "react";
import {
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IAnimal } from "../redux/slices/animals";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import AnimalsTablePagination from "./AnimalsTablePagination";
import AnimalFormModal from "./AnimalFormModal";

export default function AnimalsTable() {
  const dispatch = useAppDispatch();
  const animals = useAppSelector((state) => state.animals.animals);
  const [currAnimal, setCurrAnimal] = React.useState<IAnimal | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    dispatch(fetchAnimals({}));
  }, []);

  const onEdit = async (animal: IAnimal) => {
    const updatedAnimal = { ...animal };
    delete updatedAnimal.id;
    const res = await fetch(
      `${process.env.REACT_APP_API}/animals/${animal.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ ...updatedAnimal }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      dispatch(fetchAnimals({}));
      window.alert("Se actualizo el animal exitosamente");
    } else {
      window.alert("Error actualizando datos");
      console.log(res);
    }
  };

  const onDelete = async (animal: IAnimal) => {
    if (animal.id === undefined) return;
    if (
      window.confirm(
        `Estas seguro que desea eliminar animal con id ${animal.idSenasa}?`
      )
    ) {
      try {
        await fetch(`${process.env.REACT_APP_API}/animals/${animal.id}`, {
          method: "DELETE",
        });
        dispatch(fetchAnimals({}));
        window.alert("Se elimino el animal exitosamente");
      } catch (e) {
        window.alert("Error eliminando el animal");
        console.log(e);
      }
    }
  };

  return (
    <>
      <Heading mb="2" size="md">
        Lista de animales
      </Heading>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead bg="gray.100">
            <Tr>
              <Th>Id Senasa</Th>
              <Th>Tipo</Th>
              <Th isNumeric>Peso</Th>
              <Th>Protrero</Th>
              <Th>Tipo Dispositivo</Th>
              <Th>Numero Dispositivo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          {animals.length !== 0 ? (
            <Tbody bg="gray.50">
              {animals.map((animal) => (
                <Tr key={animal.id}>
                  <Td>{animal.idSenasa}</Td>
                  <Td>{animal.type}</Td>
                  <Td isNumeric>{animal.weight}</Td>
                  <Td>{animal.paddockName}</Td>
                  <Td>{animal.deviceName}</Td>
                  <Td>{animal.deviceNumber}</Td>
                  <Td>
                    <IconButton
                      onClick={() => {
                        setCurrAnimal(animal);
                        onOpen();
                      }}
                      color="green.600"
                      variant="ghost"
                      aria-label="edit"
                      icon={<EditIcon />}
                    />
                    <IconButton
                      onClick={() => onDelete(animal)}
                      color="red.600"
                      variant="ghost"
                      aria-label="delete"
                      icon={<DeleteIcon />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody my="4" px="6">
              <Tr>
                <Td>No hay animales guardados</Td>
              </Tr>
            </Tbody>
          )}
        </Table>
      </TableContainer>

      {/* Animals pagination connected through redux */}
      <AnimalsTablePagination />

      {/* Edit animal form */}
      <AnimalFormModal
        onFormSubmit={(animal) => onEdit(animal)}
        defaultAnimal={currAnimal}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
