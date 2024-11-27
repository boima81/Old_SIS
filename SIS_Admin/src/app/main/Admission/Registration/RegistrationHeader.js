/* eslint-disable jsx-a11y/aria-role */
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { getCourses, selectCourses } from "app/store/coursesSlice";
import { getSemester, selectSemester } from "app/store/semesterSlice";
import { getProgram, selectProgram } from "app/store/studentSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainSelect from "../../dashboards/Shared/Select";
import { getRegistrations } from "../store/registrationsSlice";

// import { selectRegistrationSearchText, setRegistrationSearchText } from '../store/RegistrationSlice';

function RegistrationHeader({ showSearchAddButton = true, isHomePage = true }) {
  const courses = useSelector(selectCourses);
  const semesters = useSelector(selectSemester);
  const programs = useSelector(selectProgram);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    semester: "",
    registrationState: "",
    course: "",
    program: "",
  });
  // const searchText = useSelector(selectRegistrationSearchText);
  const theme = useTheme();

  const _handleKeyDown = (e) => {
    console.log("e.target.value", e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(getCourses({}));
    dispatch(getSemester());
    dispatch(getProgram({}));
  }, []);

  useEffect(() => {
    dispatch(getRegistrations({ ...filter, search: search }));
  }, [filter]);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(getRegistrations({ ...filter, search: search }));
    }, 300);
    return () => clearTimeout(getData);
  }, [search]);

  const handleFilter = () => {};
  console.log("programs", programs);
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight flex gap-5 items-center"
        component={!isHomePage ? Link : motion.span}
        role={`${!isHomePage && "button"}`}
        to={`${!isHomePage && "/admission/registration"}`}
      >
        {!isHomePage && (
          <FuseSvgIcon size={20}>
            {theme.direction === "ltr"
              ? "heroicons-outline:arrow-sm-left"
              : "heroicons-outline:arrow-sm-right"}
          </FuseSvgIcon>
        )}
        Registration
      </Typography>
      {showSearchAddButton && (
        <div className="flex flex-col">
          <div className="flex gap-5">
            <div className="w-[200px]">
              <MainSelect
                // id={fieldData?.fieldName?.selectStudent}
                label="Program"
                options={programs?.map((program) => ({
                  id: program?.id,
                  value: program?.id,
                  label: program?.name,
                }))}
                data={{
                  value: filter.program,
                  onChange: (e, extra) => {
                    setFilter({ ...filter, program: e.target.value });
                  },
                }}
                // errorMessage={fieldData?.errorMessage?.selectStudent}
              />
            </div>
            <div className="w-[200px]">
              <MainSelect
                // id={fieldData?.fieldName?.selectStudent}
                label="Semester"
                options={semesters?.map((semester) => ({
                  id: semester?.id,
                  value: semester?.id,
                  label: semester?.name,
                }))}
                data={{
                  value: filter.semester,
                  onChange: (e, extra) => {
                    setFilter({ ...filter, semester: e.target.value });
                  },
                }}
                // errorMessage={fieldData?.errorMessage?.selectStudent}
              />
            </div>
            <div className="w-[200px]">
              <MainSelect
                // id={fieldData?.fieldName?.selectStudent}
                label="Course"
                options={courses?.map((course) => ({
                  id: course?.id,
                  value: course?.id,
                  label: course?.name,
                }))}
                data={{
                  value: filter.course,
                  onChange: (e, extra) => {
                    setFilter({ ...filter, course: e.target.value });
                  },
                }}
                // errorMessage={fieldData?.errorMessage?.selectStudent}
              />
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
            <div className="w-[200px]">
              <MainSelect
                // id={fieldData?.fieldName?.selectStudent}
                label="Registration Status"
                options={[
                  {
                    label: "Pending",
                    value: "pending",
                  },
                  {
                    label: "Approved",
                    value: "approved",
                  },
                  {
                    label: "Feedback",
                    value: "feedback",
                  },
                  {
                    label: "Decline",
                    value: "decline",
                  },
                ]}
                data={{
                  value: filter.registrationState,
                  onChange: (e, extra) => {
                    setFilter({ ...filter, registrationState: e.target.value });
                  },
                }}
                // errorMessage={fieldData?.errorMessage?.selectStudent}
              />
            </div>
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
            >
              <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

              <Input
                placeholder="Search Registration"
                className="flex flex-1"
                disableUnderline
                fullWidth
                // value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Paper>
            <Button
              className=""
              // component={Link}
              // to="/admission/registration/add"
              variant="contained"
              color="secondary"
              // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              onClick={() => {
                setSearch("");
                setFilter({
                  semester: "",
                  registrationState: "",
                  course: "",
                  program: "",
                });
              }}
            >
              Clear
            </Button>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
              <Button
                className=""
                // component={Link}
                // to="/admission/registration/add"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                onClick={() => {
                  window.location.href = "/admission/registration/add";
                }}
              >
                Add
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationHeader;
