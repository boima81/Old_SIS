import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import { authRoles } from "src/app/auth";
import reducer from "../store";
import GradHeader from "./GradHeader";
import GradTable from "./GradTable";
import GradTableAdmin from "./GradTableAdmin";

function Grad() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const user = useSelector(selectUser);
  console.log("user?.role", user?.role);
  const currentUserRole = user?.role?.[0];
  const adminRole = authRoles?.instructors.includes(currentUserRole);
  const selectComponent = adminRole ? <GradTableAdmin /> : <GradTable />;
  return (
    <FusePageCarded
      header={<GradHeader />}
      content={selectComponent}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("grades", reducer)(Grad);
