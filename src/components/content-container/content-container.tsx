import React, { useState } from "react";
import TasksTable from "../table/table";
import { Stack, Typography, styled } from "@mui/material";
import SearchBar from "../search-bar/search-bar";
import { TaskData } from "../../types/types";
import { handleSearch, handleCategoryChange } from "../../utils/utils";
import TaskForm from "../task-form/task-form";

const Heading = styled(Typography)(() => ({
  fontSize: "2rem",
  width: "100%",
  textAlign: "center",
}));

const Container = styled(Stack)(() => ({
  width: "100%",
}));

function ContentContainer() {
  const [data, setData] = useState<TaskData[]>([]);
  const [searchTerm, setSearchTerm] = useState<String>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredData = data.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory !== "All" ? item.category === selectedCategory : true)
  );

  return (
    <Container alignItems={"center"} gap={2}>
      <Heading>To-do app</Heading>
      <Stack
        direction={{ lg: "row", md: "column" }}
        spacing={2}
        style={{ width: "80%" }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
      >
        <SearchBar
          handleSearch={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(event, setSearchTerm)
          }
          handleCategoryChange={(category: string) =>
            handleCategoryChange(
              selectedCategory === category ? "All" : category,
              setSelectedCategory
            )
          }
          selectedCategory={selectedCategory}
        />
        <TaskForm data={data} setData={setData} />
      </Stack>
      <TasksTable data={filteredData} setData={setData} />
    </Container>
  );
}

export default ContentContainer;
