import React from "react";
import { ActionHandlers, TaskData } from "../types/types";
import {
  Stack,
  IconButton,
  Select,
  MenuItem,
  TextField,
  styled,
  Checkbox,
  Theme,
} from "@mui/material";
import { Categories, LocalDB } from "../consts/consts";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridRenderCellParams } from "@mui/x-data-grid";

function handleSearch(
  event: React.ChangeEvent<HTMLInputElement>,
  setSearchTerm: React.Dispatch<React.SetStateAction<String>>
) {
  setSearchTerm(event.target.value);
}

function handleDataChange(
  data: TaskData[],
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>
) {
  localStorage.setItem(LocalDB, JSON.stringify(data));
  setData(data);
}

function handleCategoryChange(
  category: string,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
) {
  setSelectedCategory(category);
}

function generateActionsCell(
  id: number,
  done: boolean,
  editRowId: number,
  handlers: ActionHandlers
) {
  const ContentContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isEdit",
  })<{ isEdit: boolean }>(({ theme, isEdit }) => ({
    paddingLeft: isEdit ? "2rem" : "1rem",

    [theme.breakpoints.down("md")]: {
      paddingLeft: "0.25rem",
    },
  }));

  return (
    <ContentContainer isEdit={id === editRowId} direction="row">
      {id === editRowId ? (
        <>
          <IconButton onClick={handlers.handleDiscardClick}>
            <ClearIcon />
          </IconButton>
          <IconButton onClick={handlers.handleSaveClick}>
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={() => handlers.handleEditClick(id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handlers.handleDeleteClick(id)}>
            <DeleteIcon />
          </IconButton>
          <Checkbox
            checked={done}
            onChange={(e, checked) =>
              handlers.handleCheckboxChange(id, checked)
            }
          />
        </>
      )}
    </ContentContainer>
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
      actions: generateActionsCell(id as number, done, editRowId, handlers),
    };
  });
}

function generateColumns(
  editRowId: number,
  editData: TaskData,
  setEditedData: React.Dispatch<React.SetStateAction<TaskData>>,
  theme: Theme
) {
  const InactiveCell = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isActions",
  })<{ isActions?: boolean }>(({ theme, isActions }) => ({
    padding: "1rem",
    width: "100%",

    [theme.breakpoints.down("md")]: {
      padding: isActions ? "0.25rem" : "0.85rem",
      "& .MuiSvgIcon-root": { fontSize: "1rem" },

      "& .MuiButtonBase-root": {
        padding: "0.25rem",
      },
    },
  }));

  const ActiveCell = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isActions",
  })<{ isActions?: boolean }>(({ theme, isActions }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    [theme.breakpoints.down("md")]: {
      padding: isActions ? "0.25rem" : "0",
      "& .MuiSvgIcon-root": { fontSize: "1rem" },

      "& .MuiButtonBase-root": {
        padding: "0.25rem",
      },
    },
  }));

  const CellRender = (content: string, isActions?: boolean) => (
    <InactiveCell isActions={isActions} alignItems={"flex-start"}>
      {content}
    </InactiveCell>
  );
  const ActiveCellRender = (children: React.ReactNode, isActions?: boolean) => (
    <ActiveCell
      isActions={isActions}
      alignItems={"flex-start"}
      justifyContent={"center"}
    >
      {children}
    </ActiveCell>
  );

  const ActiveCellStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    [theme.breakpoints.down("md")]: {
      padding: "0.25rem",
      "& .MuiSvgIcon-root": { fontSize: "1rem" },
      "& .MuiButtonBase-root": {
        padding: "0.25rem",
      },
    },
  };

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
          return (
            <Stack
              alignItems={"flex-start"}
              justifyContent={"center"}
              style={ActiveCellStyle}
            >
              <TextField
                className="table-input"
                defaultValue={editData.task}
                onChange={(e) =>
                  handleChange("task", e.target.value, setEditedData)
                }
              />
            </Stack>
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
              className="table-input"
              value={editData.category}
              onChange={(e) =>
                handleChange("category", e.target.value, setEditedData)
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
          return ActiveCellRender(params.row.actions, true);
        } else {
          return CellRender(params.row.actions, true);
        }
      },
    },
  ];
}

function handleChange(
  property: string,
  newValue: string,
  setEditedData: React.Dispatch<React.SetStateAction<TaskData>>
) {
  setEditedData((prevData) => ({ ...prevData, [property]: newValue }));
}

export {
  handleSearch,
  generateRows,
  generateColumns,
  handleCategoryChange,
  handleDataChange,
};
