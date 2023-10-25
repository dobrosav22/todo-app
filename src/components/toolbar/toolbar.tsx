import { styled, Stack, Button } from "@mui/material";
import React from "react";
import SearchBar from "../search-bar/search-bar";
import { TaskData } from "../../types/types";
import {
  handleSearch,
  handleCategoryChange,
  copyToClipboard,
  getLocalStorage,
} from "../../utils/utils";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { Colors } from "../../consts/consts";
interface ToolbarProps {
  editData: TaskData | undefined;
  data: TaskData[];
  setEditData: React.Dispatch<React.SetStateAction<TaskData | undefined>>;
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled(Stack)(() => ({
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "10rem",
  height: "2rem",
  borderRadius: "15px",
  textTransform: "none",
  fontSize: "12px",
  backgroundColor: Colors.lighter,
  border: `0.5px solid ${Colors.light}`,
  "&.Mui-disabled": {
    backgroundColor: Colors.light,
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

/**A Toolbar component holding the Button for adding new Tasks,
 * as well as the SearchBar.
 */
const Toolbar: React.FC<ToolbarProps> = ({
  editData,
  setEditData,
  data,
  setData,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  setMessage,
}) => {
  //Creating the initial data for a new entry with an id and
  //an isNew prop, as to be able to differentiate it from
  //existing entries.
  const getInitialData = (): TaskData => ({
    task: "",
    category: undefined,
    id: (data[0]?.id ?? 0) + 1,
    done: false,
    isNew: true,
  });

  return (
    <Container
      justifyContent={"end"}
      alignItems={{ md: "center", xs: "flex-end" }}
      direction={{ md: "row", xs: "column-reverse" }}
      gap={2}
    >
      <StyledButton
        variant="contained"
        disabled={editData !== undefined}
        //A function that updated the Data state, adding
        //a row with no data and activating it for edit,
        //allowing for the user to create a new Task.
        onClick={() => {
          setData([getInitialData(), ...data]);
          setEditData(getInitialData());
          handleSearch("", setSearchTerm);
        }}
        endIcon={<AddIcon />}
      >
        Add new task
      </StyledButton>

      <StyledButton
        variant="contained"
        //A function that copies the localStorage data to clipboard.
        onClick={() => {
          setMessage("Copied!");
          copyToClipboard(getLocalStorage());
        }}
        endIcon={<ContentCopyIcon />}
      >
        Copy to clipboard
      </StyledButton>

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(event.target.value, setSearchTerm)
        }
        handleCategoryChange={(category: string) =>
          handleCategoryChange(
            selectedCategory === category ? "All" : category,
            setSelectedCategory
          )
        }
        selectedCategory={selectedCategory}
      />
    </Container>
  );
};

export default Toolbar;
