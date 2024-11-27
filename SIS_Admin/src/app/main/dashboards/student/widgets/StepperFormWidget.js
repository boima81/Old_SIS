import withRouter from "@fuse/core/withRouter";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

import StudentStepperForm from "../../common/StudentForm";
// import { getApplication, selectApplication } from "../../analytics/store/applicationSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Admission", "Invoice", "Payment", "Review"];
}

function StudentStepperFormWidget({ userType }) {
  const routeParams = useParams();
  const { registrationId } = routeParams;
  return (
    <StudentStepperForm
      userType={userType}
      adminRegistrationId={registrationId !== "add" ? registrationId : null}
    />
  );
}
export default withRouter(StudentStepperFormWidget);
