import React from "react";
import {
  TextField,
  styled,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Categories } from "../../consts/consts";
import Toolbar from "../toolbar/toolbar";

interface SearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const SearchInput = styled(TextField)(() => ({
  width: "15rem",
}));

const Dropdown = styled(Select)(({ theme }) => ({
  textAlign: "start",
  width: "15rem",
}));

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  handleCategoryChange,
  selectedCategory,
}) => {
  const options = ["All", ...Categories];
  return (
    <Toolbar title={"Search and filter"}>
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
    </Toolbar>
  );
};

export default SearchBar;
