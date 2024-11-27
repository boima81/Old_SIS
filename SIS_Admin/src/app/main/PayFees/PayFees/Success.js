/* eslint-disable no-nested-ternary */
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ThumbDownIconOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="space-y-32">
      <div className="flex items-center justify-center flex-col h-full">
        <h1>Thank You</h1>

        <>
          <PendingActionsOutlinedIcon color="warning" sx={{ fontSize: 150 }} />
          <h3>
            Your Details is submitted successfully and it's under review. we
            will notify you soon
          </h3>
        </>
      </div>
    </div>
  );
}
