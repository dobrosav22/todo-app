import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { TaskData } from "../../types/types";
import {
  generateColumns,
  generateRows,
  handleDataChange,
} from "../../utils/utils";
import { Colors, LocalDB } from "../../consts/consts";

interface TasksTableProps {
  data: TaskData[];
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
}

const TasksTable: React.FC<TasksTableProps> = ({ data, setData }) => {
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem(LocalDB) || "[]");
    setData(localStorageData);
  }, [setData]);

  const [editRowId, setEditRowId] = useState(-1);
  const [editedData, setEditedData] = useState<TaskData | undefined>(undefined);

  const handlers = {
    handleEditClick: (id: number) => {
      setEditRowId(id);
      setEditedData(data.find((item) => item.id === id));
    },
    handleSaveClick: () => {
      setEditRowId(-1);
      console.log(editedData);
      const newData = [
        ...data.filter((item) => item.id !== editedData?.id),
        editedData,
      ];
      handleDataChange(newData as TaskData[], setData);
    },
    handleDiscardClick: () => {
      setEditRowId(-1);
    },
    handleDeleteClick: (id: number) => {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      handleDataChange(newData, setData);
    },
    handleCheckboxChange: (id: number, checked: boolean) => {
      const newData = data.map((task) => ({
        ...task,
        done: task.id === id ? checked : task.done,
      }));
      console.log(newData);
      handleDataChange(newData, setData);
    },
  };

  const rows = generateRows(data, editRowId, handlers);

  const theme = useTheme();

  const columns = generateColumns(
    editRowId,
    editedData as TaskData,
    setEditedData as React.Dispatch<React.SetStateAction<TaskData>>,
    theme
  );

  return (
    <DataGrid
      disableRowSelectionOnClick
      columns={columns}
      rows={rows}
      autoHeight
      hideFooter
      style={{
        fontSize: "12px",
        minWidth: "90%",
        backgroundColor: Colors.dark,
        color: "white",
      }}
    />
  );
};

export default TasksTable;
