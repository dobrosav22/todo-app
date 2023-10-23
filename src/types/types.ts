import React from "react";

type TaskData = {
  id: number | undefined;
  task: string;
  category: string | undefined;
  done: boolean;
};

type ChangeHandlerType = {
  id: number;
  property: string;
  newValue: string;
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
};

interface ActionHandlers {
  handleEditClick: (id: number) => void;
  handleSaveClick: () => void;
  handleDiscardClick: () => void;
  handleDeleteClick: (id: number) => void;
  handleCheckboxChange: (id: number, checked: boolean) => void;
}

interface ColumnHandlers {
  handleTaskChange: (props: ChangeHandlerType) => void;
}

enum CategoryType {
  Groceries,
  Pets,
  Finance,
  Miscelaneous,
}

export type { TaskData, ActionHandlers, ColumnHandlers, CategoryType };
