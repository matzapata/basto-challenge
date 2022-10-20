import React from "react";
import { Box, Heading, Input } from "@chakra-ui/react";
import { useAppDispatch } from "../redux/store";
import { fetchAnimals } from "../redux/slices/animalsThunk";

export default function SearchForm() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAnimals({ search }));
  };

  return (
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
  );
}
