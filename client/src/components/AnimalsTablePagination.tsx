import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { fetchAnimals } from "../redux/slices/animalsThunk";
import { useAppDispatch, useAppSelector } from "../redux/store";

export default function Pagination() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.animals.currentPage);
  const totalPages = useAppSelector((state) => state.animals.totalPages);

  return (
    <Box display="flex" justifyContent="right" mt="8">
      <ButtonGroup isAttached>
        <Button
          disabled={currentPage === 1}
          size="sm"
          onClick={() => dispatch(fetchAnimals({ page: currentPage - 1 }))}
        >
          Prev
        </Button>
        <Button
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => dispatch(fetchAnimals({ page: currentPage + 1 }))}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
}
