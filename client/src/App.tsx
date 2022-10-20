import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import AnimalFormModal from "./components/AnimalFormModal";
import AnimalsTable from "./components/AnimalsTable";
import { IAnimal } from "./redux/slices/animals";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { fetchAnimals } from "./redux/slices/animalsThunk";
import axios from "axios";

function App() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");
  const [currAnimal, setCurrAnimal] = React.useState<IAnimal | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const animals = useAppSelector((state) => state.animals.animals);
  const currentPage = useAppSelector((state) => state.animals.currentPage);
  const totalPages = useAppSelector((state) => state.animals.totalPages);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAnimals({ search }));
  };

  React.useEffect(() => {
    dispatch(fetchAnimals({}));
  }, []);

  return (
    <Container maxW="container.lg" my="10">
      <Heading mb="8">Gestion de animales</Heading>

      <Button
        size="sm"
        bg="gray.800"
        color="white"
        _hover={{ backgroundColor: "gray.700" }}
        onClick={() => {
          setCurrAnimal(undefined);
          onOpen();
        }}
      >
        New animal
      </Button>

      <Box my="8">
        <form onSubmit={onSearch}>
          <Heading size="md" mb="2">
            Nombre / ID senasa animal
          </Heading>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Buscar por nombre del potrero, id senasa"
          />
        </form>
      </Box>

      <AnimalsTable
        animals={animals}
        onDelete={async (animal) => {
          console.log(animal);
          const confirmation = window.confirm(
            `Estas seguro que desea eliminar animal con id ${animal.idSenasa}?`
          );
          if (confirmation) {
            await axios.delete(
              `${process.env.REACT_APP_API}/animals/${animal.id}`
            );
            window.alert("Se elimino el animal exitosamente");
            dispatch(fetchAnimals({ search }));
          }
        }}
        onEdit={(animal) => {
          setCurrAnimal(animal);
          onOpen();
        }}
      />

      <Box display="flex" justifyContent="right" mt="8">
        <ButtonGroup isAttached>
          <Button
            disabled={currentPage === 1}
            size="sm"
            onClick={() =>
              dispatch(fetchAnimals({ search, page: currentPage - 1 }))
            }
          >
            Prev
          </Button>
          <Button
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              dispatch(fetchAnimals({ search, page: currentPage + 1 }))
            }
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>

      <AnimalFormModal
        defaultAnimal={currAnimal}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  );
}

export default App;
