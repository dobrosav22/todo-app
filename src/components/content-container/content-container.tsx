import React, { useState } from "react";
import TasksTable from "../table/table";
import { Stack, Typography, styled, Container } from "@mui/material";
import { TaskData } from "../../types/types";
import Toolbar from "../toolbar/toolbar";
import { Colors } from "../../consts/consts";

const Heading = styled(Typography)(() => ({
  fontSize: "3rem",
  width: "100%",
  color: Colors.light,
  padding: "2rem",
  textAlign: "center",
}));

function ContentContainer() {
  const [data, setData] = useState<TaskData[]>([]);
  const [editData, setEditData] = useState<TaskData | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredData = data.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory !== "All" ? item.category === selectedCategory : true)
  );

  return (
    <Container maxWidth="lg">
      <Stack alignItems={"center"} gap={2}>
        <Heading>To-do app</Heading>
        <Toolbar
          data={data}
          editData={editData}
          selectedCategory={selectedCategory}
          setData={setData}
          setEditData={setEditData}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
        />
        <TasksTable
          data={filteredData}
          setData={setData}
          editData={editData}
          setEditData={setEditData}
        />
      </Stack>
    </Container>
  );
}

export default ContentContainer;
