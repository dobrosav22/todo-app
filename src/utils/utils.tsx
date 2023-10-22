import React from "react";
import { ActionHandlers, TaskData } from "../types/types";
import { Stack, IconButton, Select, MenuItem, TextField } from "@mui/material";
import { Categories } from "../consts/consts";
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

function handleCategoryChange(
  category: String,
  setSelectedCategory: React.Dispatch<React.SetStateAction<String>>
) {
  setSelectedCategory(category);
}

function generateActionsCell(
  id: number,
  editRowId: number,
  handlers: ActionHandlers
) {
  return (
    <>
      {id === editRowId ? (
        <Stack direction="row" style={{ paddingLeft: "15px" }}>
          <IconButton onClick={handlers.handleSaveClick}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handlers.handleDiscardClick}>
            <ClearIcon />
          </IconButton>
        </Stack>
      ) : (
        <IconButton onClick={() => handlers.handleEditClick(id)}>
          <EditIcon />
        </IconButton>
      )}
    </>
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

function generateColumns(
  editRowId: number,
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>
) {
  const CellRender = (content: string) => (
    <Stack style={{ padding: "15px", width: "100%" }} alignItems={"flex-start"}>
      {content}
    </Stack>
  );
  const ActiveCellRender = (children: React.ReactNode) => (
    <Stack
      style={{ backgroundColor: "red", width: "100%", height: "100%" }}
      alignItems={"flex-start"}
      justifyContent={"center"}
    >
      {children}
    </Stack>
  );
  return [
    {
      field: "task",
      headerName: "Task",
      flex: 0.3,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const rowData = params.row;
        if (params.row.id === editRowId) {
          return ActiveCellRender(
            <TextField
              value={rowData.task}
              onChange={(e) =>
                handleChange(rowData.id, "task", e.target.value, setData)
              }
            />
          );
        } else {
          return CellRender(rowData.task);
        }
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.2,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const rowData = params.row;
        if (params.row.id === editRowId) {
          return ActiveCellRender(
            <Select
              value={rowData.category}
              onChange={(e) =>
                handleChange(rowData.id, "category", e.target.value, setData)
              }
            >
              {Categories.map((category, index) => (
                <MenuItem value={category} key={`category-item-${index}`}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          );
        } else {
          return CellRender(rowData.category);
        }
      },
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.2,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.id === editRowId) {
          return ActiveCellRender(params.row.actions);
        } else {
          return CellRender(params.row.actions);
        }
      },
    },
  ];
}

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

export { handleSearch, generateRows, generateColumns, handleCategoryChange };
