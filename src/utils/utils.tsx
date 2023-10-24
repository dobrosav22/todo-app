import React from "react";
import { TaskData } from "../types/types";
import { LocalDB, MockData } from "../consts/consts";

function getLocalStorage() {
  return JSON.parse(localStorage.getItem(LocalDB) || MockData);
}

function generateLocalStorage() {
  if (!localStorage.getItem(LocalDB)) localStorage.setItem(LocalDB, MockData);
}

function sortData(data: TaskData[]) {
  return data.sort((a, b) => (b.id as number) - (a.id as number));
}

function handleSearch(
  event: React.ChangeEvent<HTMLInputElement>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
) {
  setSearchTerm(event.target.value);
}

function handleDataChange(
  data: TaskData[],
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>
) {
  localStorage.setItem(
    LocalDB,
    JSON.stringify(data.filter((item) => !item.isNew))
  );
  setData(data);
}

function handleCategoryChange(
  category: string,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
) {
  setSelectedCategory(category);
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
  handleChange,
  handleCategoryChange,
  handleDataChange,
  getLocalStorage,
  sortData,
  generateLocalStorage,
};
