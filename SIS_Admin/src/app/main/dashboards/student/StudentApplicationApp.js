import FusePageSimple from "@fuse/core/FusePageSimple";
import _ from "@lodash";
import {
  getApplications,
  selectApplications,
} from "app/store/applicationSlice";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsDashboardAppHeader from "./AnalyticsDashboardAppHeader";
import reducer from "./store";
import ApplicationWidget from "./widgets/Student/ApplicationWidget";

function StudentApplicationApp() {
  const dispatch = useDispatch();
  const applications = useSelector(selectApplications);
  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);
  return (
    <FusePageSimple
      header={
        <AnalyticsDashboardAppHeader
          title="Application"
          subTitle="under maintenance"
        />
      }
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

            return (
              !_.isEmpty(applications) && (
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
                    <ApplicationWidget />
                  </motion.div>
                </motion.div>
              )
            );
          }, [applications])}
        </>
      }
    />
  );
}

export default withReducer(
  "analyticsDashboardApp",
  reducer
)(StudentApplicationApp);
