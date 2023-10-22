import React, { useState } from "react";
import TasksTable from "../table/table";
import { Stack, Typography, styled } from "@mui/material";
import SearchBar from "../search-bar/search-bar";
import { TaskData } from "../../types/types";
import { handleSearch, handleCategoryChange } from "../../utils/utils";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  width: "100%",
  textAlign: "center",
}));

const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
}));

function ContentContainer() {
  const [data, setData] = useState<TaskData[]>([]);
  const [searchTerm, setSearchTerm] = useState<String>("");
  const [selectedCategory, setSelectedCategory] = useState<String>("");

  const filteredData = data.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory !== "" ? item.category === selectedCategory : true)
  );

  return (
    <Container>
      <Heading>To-do app</Heading>
      <SearchBar
        handleSearch={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(event, setSearchTerm)
        }
        handleCategoryChange={(category: string) =>
          handleCategoryChange(
            selectedCategory === category ? "" : category,
            setSelectedCategory
          )
        }
        selectedCategory={selectedCategory}
      />
      <TasksTable data={filteredData} setData={setData} />
    </Container>
  );
}

export default ContentContainer;
