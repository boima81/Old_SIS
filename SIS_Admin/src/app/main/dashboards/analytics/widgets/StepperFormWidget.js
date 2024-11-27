import { makeStyles } from "@mui/styles";

import { selectUser } from "app/store/userSlice";
import withRouter from "@fuse/core/withRouter";
import { useParams } from "react-router-dom";
import {
  getApplication,
  selectApplication,
} from "app/store/singleApplicationSlice";
import {
  addApplication,
  uploadFileApplication,
} from "../store/applicationSlice";
import StepperForm from "../../common/Form";

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

function StepperFormWidget({ userType }) {
  const routeParams = useParams();
  const { applicationId } = routeParams;

  return (
    <StepperForm
      adminApplicationId={applicationId !== "add" ? applicationId : null}
      selectUser={selectUser}
      userType={userType}
      addApplication={addApplication}
      getApplication={getApplication}
      selectApplication={selectApplication}
      uploadFileApplication={uploadFileApplication}
    />
  );
}

export default withRouter(StepperFormWidget);
