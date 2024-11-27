import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import packageJson from "../../../../../../package.json";

const Root = styled("div")(({ theme }) => ({
  // backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    // boxShadow: `inset 0 0 0 20px ${
    //   theme.palette.mode === "light"
    //     ? "rgba(0, 0, 0, 0.24)"
    //     : "rgba(255, 255, 255, 0.24)"
    // }`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    // boxShadow: `inset 0 0 0 20px ${
    //   theme.palette.mode === "light"
    //     ? "rgba(0, 0, 0, 0.37)"
    //     : "rgba(255, 255, 255, 0.37)"
    // }`,
  },
}));

function Version() {
  return (
    <Root className="relative flex flex-col items-center justify-center p-16 pb-14 shadow-0">
      <Typography
        className="email text-14 whitespace-nowrap font-medium"
        //   color="text.secondary"
      >
        Version: {packageJson?.version}
      </Typography>
    </Root>
  );
}

export default Version;
