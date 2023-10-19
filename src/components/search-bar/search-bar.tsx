import React from "react";
import TextField from '@mui/material/TextField';

interface SearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return <TextField onChange={handleSearch} />;
};

export default SearchBar;
