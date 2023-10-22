import React from "react";
import { TextField, Stack, Button } from "@mui/material";
import { Categories } from "../../consts/consts";

interface SearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (category: string) => void;
  selectedCategory: String;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  handleCategoryChange,
  selectedCategory,
}) => {
  return (
    <Stack direction={{ lg: "row", md: "column" }} gap={2}>
      <TextField onChange={handleSearch} placeholder="Search..." />
      {Categories.map((category, index) => (
        <Button
          variant={selectedCategory === category ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleCategoryChange(category)}
          key={`category-button-${index}`}
        >
          {category}
        </Button>
      ))}
    </Stack>
  );
};

export default SearchBar;
