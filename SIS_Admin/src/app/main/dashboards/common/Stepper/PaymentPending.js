import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

export default function PaymentPending({ applicationData }) {
  return (
    <div className="space-y-32">
      <div className="flex items-center justify-center flex-col h-full">
        <h1>Thank You</h1>
        {!applicationData?.isPaymentApprove && (
          <>
            <PendingActionsOutlinedIcon
              color="warning"
              sx={{ fontSize: 150 }}
            />
            <h3>Waiting on Finance to Approve your payment</h3>
          </>
        )}
      </div>
    </div>
  );
}
