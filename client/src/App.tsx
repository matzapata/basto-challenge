import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import AnimalsTable from "./components/AnimalsTable";
import NewAnimalModal from "./components/NewAnimalModal";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <Container maxW="container.lg" my="10">
      <Heading mb="8">Gestion de animales</Heading>
      <NewAnimalModal />
      <SearchForm />
      <AnimalsTable />
    </Container>
  );
}

export default App;
