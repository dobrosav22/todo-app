import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { styled } from "@mui/material";
import { TaskData } from "../../types/types";
import {
  generateLocalStorage,
  getLocalStorage,
  sortData,
} from "../../utils/utils";
import { Colors } from "../../consts/consts";
import { generateColumns, generateRows, generateHandlers } from "./functions";

interface TasksTableProps {
  data: TaskData[];
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
  editData: TaskData | undefined;
  setEditData: React.Dispatch<React.SetStateAction<TaskData | undefined>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const StyledTable = styled(DataGrid)(() => ({
  fontSize: "12px",
  width: "100%",
  backgroundColor: Colors.dark,
  color: Colors.white,
}));

/**A Table component for displaying the Tasks Data. */
const TasksTable: React.FC<TasksTableProps> = ({
  data,
  setData,
  editData,
  setEditData,
  setMessage,
}) => {
  //Upon rendering the component, we retrieve any values that exist
  //in the localStorage, and creating a mock data set if there is no Data.
  useEffect(() => {
    const localStorageData = getLocalStorage();
    setData(sortData(localStorageData));
    generateLocalStorage();
  }, [setData]);

  //Generating the handlers, rows and columns.
  const handlers = generateHandlers(
    data,
    setData,
    editData,
    setEditData,
    setMessage
  );

  const rows = generateRows(data, editData as TaskData, handlers);

  const columns = generateColumns(
    editData as TaskData,
    setEditData as React.Dispatch<React.SetStateAction<TaskData>>
  );

  return (
    <>
      <StyledTable
        disableRowSelectionOnClick
        columns={columns}
        rows={rows}
        autoHeight
        hideFooter
      />
    </>
  );
};

export default TasksTable;
