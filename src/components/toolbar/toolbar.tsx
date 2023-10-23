import { styled, Stack, Typography } from "@mui/material";
import React from "react";

interface ToolbarProps {
  title: string;
  children: React.ReactNode;
}

const Container = styled(Stack)(() => ({
  width: "100%",
  border: "1px solid gray",
  borderRadius: "0.5rem",
  padding: "1rem",
}));

const Toolbar: React.FC<ToolbarProps> = ({ title, children }) => {
  return (
    <Container
      justifyContent={"center"}
      alignItems={{ md: "start", xs: "center" }}
      gap={2}
    >
      <Stack gap={2}>
        <Typography textAlign={"start"}>{title}</Typography>
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          {children}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Toolbar;
