import React from "react";
import { ActionHandlers, TaskData } from "../types/types";
import { Stack, IconButton, Select, MenuItem, TextField } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { GridRenderCellParams } from "@mui/x-data-grid";

function handleSearch(
  event: React.ChangeEvent<HTMLInputElement>,
  setSearchTerm: React.Dispatch<React.SetStateAction<String>>
) {
  setSearchTerm(event.target.value);
}

function generateActionsCell(
  id: number,
  editRowId: number,
  handlers: ActionHandlers
) {
  return (
    <Stack direction="row">
      {id === editRowId ? (
        <div>
          <IconButton onClick={handlers.handleSaveClick}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handlers.handleDiscardClick}>
            <ClearIcon />
          </IconButton>
        </div>
      ) : (
        <IconButton onClick={() => handlers.handleEditClick(id)}>
          <EditIcon />
        </IconButton>
      )}
    </Stack>
  );
}

function generateRows(
  data: TaskData[],
  editRowId: number,
  handlers: ActionHandlers
) {
  return data.map((item) => {
    const { id, task, category, done } = item;
    return {
      id,
      task,
      category,
      done,
      actions: generateActionsCell(id, editRowId, handlers),
    };
  });
}

const generateColumns = (
  editRowId: number,
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>
) => [
  {
    field: "task",
    headerName: "Task",
    flex: 0.6,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => {
      const rowData = params.row;
      if (params.row.id === editRowId) {
        return (
          <TextField
            value={rowData.task}
            onChange={(e) =>
              handleChange(rowData.id, "task", e.target.value, setData)
            }
          />
        );
      } else {
        return rowData.task;
      }
    },
  },
  {
    field: "category",
    headerName: "Category",
    flex: 0.2,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => {
      const rowData = params.row;
      if (params.row.id === editRowId) {
        return (
          <Select
            value={rowData.category}
            onChange={(e) =>
              handleChange(rowData.id, "category", e.target.value, setData)
            }
          >
            <MenuItem value="Category A">Category A</MenuItem>
            <MenuItem value="Category B">Category B</MenuItem>
            <MenuItem value="Category C">Category C</MenuItem>
          </Select>
        );
      } else {
        return rowData.category;
      }
    },
  },
  {
    field: "actions",
    headerName: "",
    flex: 0.3,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => params.row.actions,
  },
];

function handleChange(
  id: number,
  property: string,
  newValue: string,
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>
) {
  setData((prevData) => {
    return prevData.map((item) => {
      if (item.id === id) {
        return { ...item, [property]: newValue };
      }
      return item;
    });
  });
}

export { handleSearch, generateRows, generateColumns };
