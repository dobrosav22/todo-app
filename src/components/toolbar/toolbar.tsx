import { styled, Stack, Button } from "@mui/material";
import React from "react";
import SearchBar from "../search-bar/search-bar";
import { TaskData } from "../../types/types";
import { handleSearch, handleCategoryChange } from "../../utils/utils";
import AddIcon from '@mui/icons-material/Add';interface ToolbarProps {
  editData: TaskData | undefined;
  data: TaskData[];
  setEditData: React.Dispatch<React.SetStateAction<TaskData | undefined>>;
  setData: React.Dispatch<React.SetStateAction<TaskData[]>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
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
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Toolbar: React.FC<ToolbarProps> = ({
  editData,
  setEditData,
  data,
  setData,
  selectedCategory,
  setSelectedCategory,
  setSearchTerm,
}) => {
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
        onClick={() => {
          setData([getInitialData(), ...data]);
          setEditData(getInitialData());
        }}
        endIcon={<AddIcon />}
      >
        Add new task
      </StyledButton>

      <SearchBar
        handleSearch={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(event, setSearchTerm)
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
