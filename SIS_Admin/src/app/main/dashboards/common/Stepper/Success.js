/* eslint-disable no-nested-ternary */
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ThumbDownIconOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Success({ applicationData }) {
  return (
    <div className="space-y-32">
      <div className="flex items-center justify-center flex-col h-full">
        <h1>Thank You</h1>
        {!applicationData?.is_approved &&
        applicationData?.application_status === "pending" ? (
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
        ) : !applicationData?.is_approved &&
          applicationData?.application_status === "decline" ? (
          <>
            <ThumbDownIconOutlinedIcon color="error" sx={{ fontSize: 150 }} />
            <h3>
              We have reviews your application. Unfortunately your application
              has been decline due to following reason:{" "}
              {applicationData?.comment}
            </h3>
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 150 }} />
            <h3>Your Details are submitted successfully and are approved</h3>
            <Button
              className="mt-24"
              component={Link}
              variant="outlined"
              to="/register"
              color="inherit"
            >
              Begin Registration
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
