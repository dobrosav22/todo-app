import React from "react";

/**A types file holding the declarations for several data types
 * being used throughout the application.
 */
type TaskData = {
  id: number | undefined;
  task: string;
  category: string | undefined;
  done: boolean;
  isNew?: boolean;
};

type ChangeHandlerType = {
  id: number;
  property: string;
  newValue: string;
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
};

interface ActionHandlers {
  handleEditClick: (id: number | undefined) => void;
  handleSaveClick: () => void;
  handleDiscardClick: (id: number | undefined) => void;
  handleDeleteClick: (id: number | undefined) => void;
  handleCheckboxChange: (id: number | undefined, checked: boolean) => void;
}

interface ColumnHandlers {
  handleTaskChange: (props: ChangeHandlerType) => void;
}

enum CategoryType {
  Groceries,
  Pets,
  Finances,
  Miscelaneous,
}

export type { TaskData, ActionHandlers, ColumnHandlers, CategoryType };
