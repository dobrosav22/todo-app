import React from "react";

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return <SearchBar handleSearch={handleSearch} />;
};

export default SearchBar;
