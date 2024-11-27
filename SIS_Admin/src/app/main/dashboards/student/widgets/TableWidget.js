import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import { selectContrastMainTheme } from "app/store/fuse/settingsSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../Shared/Table/Table copy";

const Root = styled(Paper)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

function TableWidget({ columns, rows, subHeading, heading, handleChange=()=>{} }) {
  const theme = useTheme();
  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );

  return (
    // <ThemeProvider theme={contrastTheme}>
    <Table
      heading={heading}
      subHeading={subHeading}
      columns={columns}
      rows={rows}
      handleChange={handleChange}
    />
    // </ThemeProvider>
  );
}

export default TableWidget;
