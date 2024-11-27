import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Success({ registrationData }) {
  return (
    <div className="space-y-32">
      <div className="flex items-center justify-center flex-col h-full">
        <h1>Thank You</h1>
        {!registrationData?.is_approved ? (
          <>
            <PendingActionsOutlinedIcon
              color="warning"
              sx={{ fontSize: 150 }}
            />
            <h3>
              Your Details is submitted successfully and it's under review. we
              will notify you soon
            </h3>
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 150 }} />
            <h3>
              Registration is completed, download a copy of the receipt from
              Fees Page{" "}
            </h3>
            <Button
              className="mt-24"
              component={Link}
              variant="outlined"
              to="/fees"
              color="inherit"
            >
              Fees Report
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
