import React, { useState } from "react";
import TasksTable from "../table/table";
import { Stack, Typography, styled, Container, Snackbar } from "@mui/material";
import { TaskData } from "../../types/types";
import Toolbar from "../toolbar/toolbar";
import { Colors } from "../../consts/consts";

const Heading = styled(Typography)(() => ({
  fontSize: "3rem",
  color: Colors.light,
  padding: "2rem",
  textAlign: "center",
}));

/**A container component to display the app elements. */
function ContentContainer() {
  //The current data being shown.
  const [data, setData] = useState<TaskData[]>([]);
  //A state for the current data being edited.
  const [editData, setEditData] = useState<TaskData | undefined>(undefined);
  //The search expression for the filtering function.
  const [searchTerm, setSearchTerm] = useState<string>("");
  //Category state for the filtering.
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [message, setMessage] = useState<string>("");

  //Based on the searchTerm and selectedCategory, we filter out the corresponding data.
  const filteredData = data.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory !== "All" ? item.category === selectedCategory : true)
  );

  return (
    <Container maxWidth="lg">
      <Stack alignItems={"center"} gap={2}>
        <Heading>To-do app</Heading>
        <Snackbar
          open={!!message}
          autoHideDuration={3000}
          onClose={() => setMessage("")}
          message={message}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        />
        <Toolbar
          data={data}
          editData={editData}
          selectedCategory={selectedCategory}
          setData={setData}
          setEditData={setEditData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
          setMessage={setMessage}
        />
        <TasksTable
          data={filteredData}
          setData={setData}
          editData={editData}
          setEditData={setEditData}
          setMessage={setMessage}
        />
      </Stack>
    </Container>
  );
}

export default ContentContainer;
