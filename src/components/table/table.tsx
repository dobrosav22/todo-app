import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import SearchBar from "../search-bar/search-bar";
import {
  Stack,
  Checkbox,
  IconButton,
  styled,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import TaskForm from "../task-form/task-form";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const TableContainer = styled(Stack)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

function TasksTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("formDataArray") || "[]"
    );
    setData(localStorageData);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [editRowId, setEditRowId] = useState(-1);

  const columns: GridColDef[] = [
    {
      field: "task",
      headerName: "Task",
      flex: 0.6,
      disableColumnMenu: true,
      renderCell: (params) => {
        const rowData = params.row;
        if (params.row.id === editRowId) {
          // Render a text field when in edit mode
          return (
            <TextField
              value={rowData.task}
              onChange={(e) => handleTaskChange(rowData.id, e.target.value)}
            />
          );
        } else {
          // Display the task value
          return rowData.task;
        }
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.2,
      disableColumnMenu: true,
      renderCell: (params) => {
        const rowData = params.row;
        if (params.row.id === editRowId) {
          return (
            <Select
              value={rowData.category}
              onChange={(e) => handleCategoryChange(rowData.id, e.target.value)}
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
      flex: 0.2,
      disableColumnMenu: true,
      renderCell: (params) => {
        const rowData = params.row;
        return (
          <Stack direction="row">
            {params.row.id === editRowId ? (
              <IconButton onClick={() => handleSaveClick(rowData.id)}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleEditClick(rowData.id)}>
                <EditIcon />
              </IconButton>
            )}
          </Stack>
        );
      },
    },
  ];

  function handleTaskChange(id: number, newValue: string) {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, task: newValue };
        }
        return item;
      });
    });
  }

  function handleCategoryChange(id: number, newValue: string) {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, category: newValue };
        }
        return item;
      });
    });
  }

  function handleEditClick(id: number) {
    setEditRowId(id);
  }

  function handleSaveClick(id: number) {
    setEditRowId(-1); // Exit edit mode
    localStorage.setItem("formDataArray", JSON.stringify(data));

    // Save data or perform other actions as needed
  }

  function generateRows(data: any[]) {
    return data.map((item) => {
      const { id, task, category, done } = item;
      return {
        id,
        task,
        category,
        done,
      };
    });
  }

  const filteredData = data.filter((item) =>
    item.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = generateRows(filteredData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <div>
      <Stack style={{ width: "100%" }}>
        <TableContainer>
          <DataGrid
            disableRowSelectionOnClick
            columns={columns}
            rows={rows}
            autoHeight
          />
        </TableContainer>
      </Stack>
    </div>
  );
}

export default TasksTable;
