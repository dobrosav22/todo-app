import React, { useState } from "react";
import { TextField, MenuItem, Select, Button, styled } from "@mui/material";
import { Categories } from "../../consts/consts";
import { handleDataChange } from "../../utils/utils";
import { TaskData } from "../../types/types";
import Toolbar from "../toolbar/toolbar";

const TextInput = styled(TextField)(() => ({
  width: "15rem",
}));

const Dropdown = styled(Select)(({ theme }) => ({
  textAlign: "start",
  width: "15rem",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "15rem",
  height: "3.4rem",
}));

interface TaskFormProps {
  data: TaskData[];
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ data, setData }) => {
  const initialData: TaskData = {
    task: "",
    category: undefined,
    done: false,
    id: undefined,
  };

  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const newData = [
      ...data,
      {
        ...formData,
        id: data.length + 1,
      },
    ];

    handleDataChange(newData, setData);
    setFormData(initialData);
  };

  const isFormDisabled = () => {
    return !formData.category || !formData.task.length;
  };

  return (
    <Toolbar title={"Add new task"}>
      <TextInput
        name="task"
        placeholder="Task name"
        value={formData.task}
        onChange={handleInputChange}
      />
      <Dropdown
        key={data.length}
        displayEmpty
        name="category"
        renderValue={() => formData.category ?? "Category"}
        value={formData.category ?? ""}
        onChange={handleInputChange}
      >
        {Categories.map((category, index) => (
          <MenuItem value={category} key={`category-item-${index}`}>
            {category}
          </MenuItem>
        ))}
      </Dropdown>

      <StyledButton
        disabled={isFormDisabled()}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Create
      </StyledButton>
    </Toolbar>
  );
};

export default TaskForm;
