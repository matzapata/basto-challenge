import React from "react";
import {
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IAnimal } from "../redux/slices/animals";

export default function AnimalsTable({
  animals,
  onEdit,
  onDelete,
}: {
  animals: IAnimal[];
  onEdit: (animal: IAnimal) => void;
  onDelete: (animal: IAnimal) => void;
}) {
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
                <Tr key={animal.idSenasa}>
                  <Td>{animal.idSenasa}</Td>
                  <Td>{animal.type}</Td>
                  <Td isNumeric>{animal.weight}</Td>
                  <Td>{animal.paddockName}</Td>
                  <Td>{animal.deviceName}</Td>
                  <Td>{animal.deviceNumber}</Td>
                  <Td>
                    <IconButton
                      onClick={() => onEdit(animal)}
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
            <Text my="4" px="6">
              No hay animales guardados
            </Text>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
