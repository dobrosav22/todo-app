import React from "react";
import { TaskData } from "../types/types";
import { LocalDB, MockData } from "../consts/consts";

/**A utils file holding several commonly used functions
 * throughout the application.
 */

//Retrieving the localStorage value if there is any saved.
function getLocalStorage() {
  return JSON.parse(localStorage.getItem(LocalDB) || MockData);
}

//A function to store some mock Data in the localStorage if none exists.
function generateLocalStorage() {
  if (!localStorage.getItem(LocalDB)) localStorage.setItem(LocalDB, MockData);
}

//Sorting function that results in having the newest entries at the top.
function sortData(data: TaskData[]) {
  return data.sort((a, b) => (b.id as number) - (a.id as number));
}

//Search handler, updating the searchTerm state.
function handleSearch(
  event: React.ChangeEvent<HTMLInputElement>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
) {
  setSearchTerm(event.target.value);
}

//Once any change is confirmed, this function updates our
//Data state, as well as the localStorage.
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

//Updating the selectedCategory state.
function handleCategoryChange(
  category: string,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
) {
  setSelectedCategory(category);
}

//A handler function for editing that updates the editedData with any change.
function handleChange(
  property: string,
  newValue: string,
  setEditedData: React.Dispatch<React.SetStateAction<TaskData>>
) {
  setEditedData((prevData) => ({ ...prevData, [property]: newValue }));
}

//A copy function.
function copyToClipboard(data: TaskData[]) {
  let text = "";

  data.forEach((task, index) => {
    const status = task.done ? "done" : "to do";
    text += `${index + 1}. ${task.task} (${status}) \n`;
  });

  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);

  tempInput.select();
  tempInput.setSelectionRange(0, 99999);

  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

export {
  handleSearch,
  handleChange,
  handleCategoryChange,
  handleDataChange,
  getLocalStorage,
  sortData,
  generateLocalStorage,
  copyToClipboard,
};
