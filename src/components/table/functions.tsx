import { MenuItem } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Categories } from "../../consts/consts";
import { TaskData, ActionHandlers } from "../../types/types";
import { handleChange, handleDataChange, sortData } from "../../utils/utils";

import {
  InactiveCell,
  ActiveCell,
  ActiveActionsCell,
  InactiveActionsCell,
  ContentContainer,
  Dropdown,
  TextInput,
} from "./components";

const TableFunctions = () => {};

function generateActionsCell(
  item: TaskData,
  editItem: TaskData,
  handlers: ActionHandlers
) {
  const { id: editRowId } = editItem ?? {};
  const { id, done } = item;
  const isEdit = id === editRowId;

  const isSaveDisabled = () => {
    return !editItem.category || editItem.task.length === 0;
  };

  const isEditDisabled = () => {
    return editItem !== undefined;
  };

  return (
    <ContentContainer isEdit={isEdit} direction="row">
      {isEdit
        ? ActiveActionsCell(handlers, id, isSaveDisabled())
        : InactiveActionsCell(handlers, id, done, isEditDisabled())}
    </ContentContainer>
  );
}

function generateRows(
  data: TaskData[],
  editData: TaskData,
  handlers: ActionHandlers
) {
  return data.map((item) => {
    return {
      ...item,
      actions: generateActionsCell(item, editData, handlers),
    };
  });
}

function generateColumns(
  editData: TaskData,
  setEditedData: React.Dispatch<React.SetStateAction<TaskData>>
) {
  const { id: editRowId } = editData ?? {};

  const InactiveCellRender = (content: string, column?: "task" | "actions") => (
    <InactiveCell column={column} alignItems={"flex-start"}>
      {content}
    </InactiveCell>
  );

  const ActiveCellRender = (
    children: React.ReactNode,
    column?: "task" | "actions"
  ) => (
    <ActiveCell
      column={column}
      alignItems={"flex-start"}
      justifyContent={"center"}
    >
      {children}
    </ActiveCell>
  );

  return [
    {
      field: "task",
      headerName: "Task",
      flex: 0.25,
      disableColumnMenu: true,
      sortable: false,
      headerClassName: "first-column",
      renderCell: (params: GridRenderCellParams) => {
        const rowData = params.row;
        if (params.row.id === editRowId) {
          return ActiveCellRender(
            <TextInput
              className="table-input"
              defaultValue={editData.task}
              onChange={(e) =>
                handleChange("task", e.target.value, setEditedData)
              }
            />,
            "task"
          );
        } else {
          return InactiveCellRender(rowData.task, "task");
        }
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.25,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const rowData = params.row;
        if (params.row.id === editRowId) {
          return ActiveCellRender(
            <Dropdown
              className="table-input"
              displayEmpty
              renderValue={() => editData.category ?? "Category"}
              value={editData.category ?? ""}
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value as string,
                  setEditedData
                )
              }
            >
              {Categories.map((category, index) => (
                <MenuItem value={category} key={`category-item-${index}`}>
                  {category}
                </MenuItem>
              ))}
            </Dropdown>
          );
        } else {
          return InactiveCellRender(rowData.category);
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
          return ActiveCellRender(params.row.actions, "actions");
        } else {
          return InactiveCellRender(params.row.actions, "actions");
        }
      },
    },
  ];
}

const generateHandlers = (
  data: TaskData[],
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>,
  editData: TaskData | undefined,
  setEditData: React.Dispatch<React.SetStateAction<TaskData | undefined>>
): ActionHandlers => ({
  handleEditClick: (id: number | undefined) => {
    setEditData(data.find((item) => item.id === id));
  },
  handleSaveClick: () => {
    const { isNew, ...rest } = editData ?? {};
    const newData = [...data.filter((item) => item.id !== editData?.id), rest];
    setEditData(undefined);
    handleDataChange(sortData(newData as TaskData[]), setData);
  },
  handleDiscardClick: (id: number | undefined) => {
    let newData = data;
    if (id === editData?.id && editData?.isNew)
      newData = data.filter((item) => item.id !== editData?.id);
    handleDataChange(sortData(newData), setData);
    setEditData(undefined);
  },
  handleDeleteClick: (id: number | undefined) => {
    const newData = data.filter((item) => item.id !== id);
    handleDataChange(newData, setData);
  },
  handleCheckboxChange: (id: number | undefined, checked: boolean) => {
    const newData = data.map((task) => ({
      ...task,
      done: task.id === id ? checked : task.done,
    }));
    handleDataChange(newData, setData);
  },
});

export { generateColumns, generateRows, TableFunctions, generateHandlers };
