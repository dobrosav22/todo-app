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

/**Multiple functions for the table cell rendering, column definition,
 * action buttons, etc..
 */

//Generating the call with the Action Buttons
function generateActionsCell(
  item: TaskData,
  editItem: TaskData,
  handlers: ActionHandlers
) {
  const { id: editRowId } = editItem ?? {};
  const { id, done } = item;
  const isEdit = id === editRowId;

  //If the currently edited task does not have a category selected
  //or a name entered, the save button is disabled.
  const isSaveDisabled = () => {
    return !editItem.category || editItem.task.length === 0;
  };

  //If there is a task currently being edited, all the other Edit
  //buttons are disabled until the entry is discarded or saved.
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

//The raw Data is being parsed and is attached an actions prop, containing
//the render function for the Action Buttons Cell.
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

// Generating the Columns array, with the render functions and other props
function generateColumns(
  editData: TaskData,
  setEditedData: React.Dispatch<React.SetStateAction<TaskData>>
) {
  const { id: editRowId } = editData ?? {};

  //A method for rendering the Inactive Cells.
  const InactiveCellRender = (content: string, column?: "task" | "actions") => (
    <InactiveCell column={column} alignItems={"flex-start"}>
      {content}
    </InactiveCell>
  );

  //Rendering the Active Cells.
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
      //Based on whether the current entry is being edited,
      //we toggle betweed a display and edit component, in
      //this case, a TextInput.
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
      //The Category column should return a dropdown in edit mode.
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

//An object containing the handlers for every Action button.
const generateHandlers = (
  data: TaskData[],
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>,
  editData: TaskData | undefined,
  setEditData: React.Dispatch<React.SetStateAction<TaskData | undefined>>
): ActionHandlers => ({
  //By clicking on the edit button, we activate the Edit mode, declare the
  //current selection as the EditData and allow for entry of any changes.
  handleEditClick: (id: number | undefined) => {
    setEditData(data.find((item) => item.id === id));
  },
  //On saving we update the current Data and remove the temporary prop
  //isNew, used for differentiating on whether the entry is new or edited.
  handleSaveClick: () => {
    const { isNew, ...rest } = editData ?? {};
    const newData = [...data.filter((item) => item.id !== editData?.id), rest];
    setEditData(undefined);
    handleDataChange(sortData(newData as TaskData[]), setData);
  },
  //By clicking on the discard, all changes are discared and state
  //is reverted to the one before activating the edit mode.
  handleDiscardClick: (id: number | undefined) => {
    let newData = data;
    if (id === editData?.id && editData?.isNew)
      newData = data.filter((item) => item.id !== editData?.id);
    handleDataChange(sortData(newData), setData);
    setEditData(undefined);
  },
  //The delete button removes the task entry from our Data.
  handleDeleteClick: (id: number | undefined) => {
    const newData = data.filter((item) => item.id !== id);
    handleDataChange(newData, setData);
  },
  //The checkbox toggle, used for updating the task 'done' status.
  handleCheckboxChange: (id: number | undefined, checked: boolean) => {
    const newData = data.map((task) => ({
      ...task,
      done: task.id === id ? checked : task.done,
    }));
    handleDataChange(newData, setData);
  },
});

export { generateColumns, generateRows, generateHandlers };
