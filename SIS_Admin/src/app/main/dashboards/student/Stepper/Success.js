import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

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
              Your Registration detail is submitted successfully and it's under
              review. we will notify you soon
            </h3>
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 150 }} />
            <h3>Your Details are submitted successfully and are approved</h3>
          </>
        )}
      </div>
    </div>
  );
}
