import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { Stack, styled } from "@mui/material";
import { TaskData } from "../../types/types";
import { generateColumns, generateRows } from "../../utils/utils";

const TableContainer = styled(Stack)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

interface TasksTableProps {
  data: TaskData[];
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
}

const TasksTable: React.FC<TasksTableProps> = ({ data, setData }) => {
  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("formDataArray") || "[]"
    );
    setData(localStorageData);
  }, [setData]);

  const [editRowId, setEditRowId] = useState(-1);
  const [editedData, setEditedData] = useState<any>([]);

  const handlers = {
    handleEditClick: (id: number) => {
      const editedDataCopy = [...data];
      setEditRowId(id);
      setEditedData([...editedDataCopy]);
    },
    handleSaveClick: () => {
      setEditRowId(-1);
      localStorage.setItem("formDataArray", JSON.stringify(data));
    },
    handleDiscardClick: () => {
      setEditRowId(-1);
      setData([...editedData]);
    },
  };

  const rows = generateRows(data, editRowId, handlers);
  const columns = generateColumns(editRowId, setData);

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
};

export default TasksTable;
