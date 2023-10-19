import React, { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Select,
  Checkbox,
  MenuItem,
  Button,
} from "@mui/material";

function TaskForm() {
  const [formData, setFormData] = useState({
    task: "",
    category: "",
    done: false,
  });

  const [localStorageData, setLocalStorageData] = useState<any[]>([]);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const localStorageData = JSON.parse(localStorage.getItem("formDataArray") || "[]");
    setLocalStorageData(localStorageData);
  }, []);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e:any) => {
    setFormData({
      ...formData,
      done: e.target.checked,
    });
  };

  const handleSubmit = () => {
    // Update the local state with the new form data
    const newFormData = {
      ...formData,
      id: localStorageData.length + 1, // Set the id
    };
    setLocalStorageData([...localStorageData, newFormData]);

    // Update local storage with the updated data
    localStorage.setItem("formDataArray", JSON.stringify([...localStorageData, newFormData]));

    // Reset the form fields
    setFormData({
      task: "",
      category: "",
      done: false,
    });
  };

  return (
    <Stack spacing={2}>
      <TextField
        name="task"
        label="Task"
        variant="outlined"
        value={formData.task}
        onChange={handleInputChange}
      />
      <Select
        name="category"
        label="Category"
        variant="outlined"
        value={formData.category}
        onChange={handleInputChange}
      >
        <MenuItem value="Category A">Category A</MenuItem>
        <MenuItem value="Category B">Category B</MenuItem>
        <MenuItem value="Category C">Category C</MenuItem>
      </Select>
      <Checkbox
        name="done"
        checked={formData.done}
        onChange={handleCheckboxChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update
      </Button>
    </Stack>
  );
}

export default TaskForm;
