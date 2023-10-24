import React from "react";
import {
  TextField,
  styled,
  MenuItem,
  Select,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import { Categories } from "../../consts/consts";

interface SearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const Container = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const SearchInput = styled(TextField)(() => ({
  width: "9rem",
}));

const Dropdown = styled(Select)(({ theme }) => ({
  textAlign: "start",
  width: "9rem",
}));

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  handleCategoryChange,
  selectedCategory,
}) => {
  const options = ["All", ...Categories];
  return (
    <Container
      justifyContent={{ md: "end", xs: "space-between" }}
      alignItems={"center"}
      direction={"row"}
      gap={2}
    >
      <SearchInput onChange={handleSearch} placeholder="Type here..." />
      <Dropdown
        renderValue={() =>
          selectedCategory === "All" ? "Category" : selectedCategory
        }
        value={selectedCategory}
        onChange={(e: SelectChangeEvent<unknown>) => {
          handleCategoryChange(e.target.value as string);
        }}
      >
        {options.map((category, index) => (
          <MenuItem value={category} key={`category-item-${index}`}>
            {category}
          </MenuItem>
        ))}
      </Dropdown>
    </Container>
  );
};

export default SearchBar;
