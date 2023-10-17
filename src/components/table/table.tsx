import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import SearchBar from "../search-bar/search-bar";
import { Stack, Checkbox, IconButton } from "@mui/material";

function TasksTable() {
  const [data, setData] = useState([
    { task: "test", category: "cat", id: 1, done: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const columns: GridColDef[] = [
    {
      field: "task",
      headerName: "task",
      flex: 0.6,
      disableColumnMenu: true,
    },
    {
      field: "category",
      headerName: "category",
      flex: 0.2,
      disableColumnMenu: true,
    },
  ];

  function generateActionsRow(item: any) {
    return (
      <Stack>
        <Checkbox
          checked={item.done}
          onChange={() => handleCheckboxChange(item.id)}
        />
        <IconButton />
      </Stack>
    );
  }

  function handleCheckboxChange(id: number) {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      });
    });
  }

  function generateRows(data: any[]) {
    return data.map((item) => {
      const { id, task, category, done } = item;
      return {
        id,
        task,
        category,
        done,
        actions: generateActionsRow(item),
      };
    });
  }

  const filteredData = data.filter((item) =>
    item.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = generateRows(filteredData);

  const handleSearch = (searchTerm: string) => setSearchTerm(searchTerm);

  return (
    <div>
      {/* <SearchBar handleSearch={handleSearch} /> */}
      <DataGrid columns={columns} rows={rows} autoHeight />
    </div>
  );
}

export default TasksTable;
