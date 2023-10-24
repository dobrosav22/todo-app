import {
  Checkbox,
  IconButton,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { ActionHandlers } from "../../types/types";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { Colors } from "../../consts/consts";

const InactiveCell = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "column",
})<{ column?: "task" | "actions" }>(({ theme, column }) => ({
  padding: "1rem",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    padding: column === "actions" ? "0.25rem" : "0.85rem",
    "& .MuiSvgIcon-root": { fontSize: "1rem" },

    "& .MuiButtonBase-root": {
      padding: "0.25rem",
    },
  },
}));

const ActiveCell = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "column",
})<{ column?: "task" | "actions" }>(({ theme, column }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: Colors.light,
  paddingLeft: column === "task" ? "1rem" : "0",
  [theme.breakpoints.down("md")]: {
    padding: column === "actions" ? "0.25rem" : "0",
    paddingLeft:
      column === "task" ? "0.5rem" : column === "actions" ? "0.25" : "0",
    "& .MuiSvgIcon-root": { fontSize: "1rem" },
    "& .MuiButtonBase-root": {
      padding: "0.25rem",
    },
  },
}));

const ContentContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isEdit",
})<{ isEdit: boolean }>(({ theme, isEdit }) => ({
  paddingLeft: isEdit ? "2rem" : "1rem",

  [theme.breakpoints.down("md")]: {
    paddingLeft: "0.25rem",
  },
}));

const Dropdown = styled(Select)(({ theme }) => ({
  width: "10rem",
  [theme.breakpoints.down("md")]: {
    width: "6.5rem",
  },
}));

const TextInput = styled(TextField)(({ theme }) => ({
  width: "10rem",
  [theme.breakpoints.down("md")]: {
    width: "6.5rem",
  },
}));

const ActiveActionsCell = (
  handlers: ActionHandlers,
  id: number | undefined,
  disabled: boolean
) => (
  <>
    <IconButton onClick={() => handlers.handleDiscardClick(id)}>
      <ClearIcon color={"error"} />
    </IconButton>
    <IconButton
      onClick={handlers.handleSaveClick}
      disabled={disabled}
      style={{ color: disabled ? "gray" : "green" }}
    >
      <SaveIcon color={"inherit"} />
    </IconButton>
  </>
);

const InactiveActionsCell = (
  handlers: ActionHandlers,
  id: number | undefined,
  done: boolean,
  disabled: boolean
) => (
  <>
    <IconButton
      onClick={() => handlers.handleEditClick(id)}
      disabled={disabled}
      style={{ color: disabled ? "gray" : "white" }}
    >
      <EditIcon color={"inherit"} />
    </IconButton>
    <IconButton onClick={() => handlers.handleDeleteClick(id)}>
      <DeleteIcon color={"error"} />
    </IconButton>
    <Checkbox
      checked={done}
      onChange={(e, checked) => handlers.handleCheckboxChange(id, checked)}
      style={{ color: done ? "green" : "white" }}
    />
  </>
);

export {
  ActiveCell,
  InactiveCell,
  ActiveActionsCell,
  InactiveActionsCell,
  ContentContainer,
  Dropdown,
  TextInput,
};
