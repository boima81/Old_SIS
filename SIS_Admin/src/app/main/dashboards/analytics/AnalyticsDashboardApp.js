import FusePageSimple from "@fuse/core/FusePageSimple";
import _ from "@lodash";
import { selectUser } from "app/store/userSlice";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsDashboardAppHeader from "./AnalyticsDashboardAppHeader";
import reducer from "./store";
import { getProgram, selectProgram } from "./store/studentSlice";
import StepperFormWidget from "./widgets/StepperFormWidget";

function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const programs = useSelector(selectProgram);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getProgram());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<AnalyticsDashboardAppHeader />}
      content={
        <>
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return !_.isEmpty(user?.applicationFee?.applicationAmount) ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={item}
                  className="sm:col-span-2 md:col-span3 lg:col-span-3"
                >
                  <StepperFormWidget />
                </motion.div>
              </motion.div>
            ) : (
              <h1 style={{ color: "red", textAlign: "center" }}>Loading</h1>
            );
          }, [user?.applicationFee?.applicationAmount])}
        </>
      }
    />
  );
}

export default withReducer(
  "analyticsDashboardApp",
  reducer
)(AnalyticsDashboardApp);
