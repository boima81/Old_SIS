import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { getStudents } from "../store/studentsSlice";
import MainSelect from "../../dashboards/Shared/Select";
import { getCourses, selectCourses } from "app/store/coursesSlice";
import { getSemester, selectSemester } from "app/store/semesterSlice";
import { getProgram, selectProgram } from "app/store/studentSlice";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import MainCheckBox from "../../dashboards/Shared/Checkbox";

// import { selectProductsSearchText, setProductsSearchText } from '../store/productsSlice';

function StudentsHeader(props) {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const semesters = useSelector(selectSemester);
  const programs = useSelector(selectProgram);

  const [dates, setDates] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    type: "registrationFees",
    semester: "",
    course: "",
    program: "",
    startDate: "",
    endDate: "",
    balance: false,
    paidFull: false,
  });

  // const searchText = useSelector(selectProductsSearchText);
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(
        getStudents({ search: e.target.value, type: "registrationFees" })
      );
    }
  };

  useEffect(() => {
    dispatch(getCourses({}));
    dispatch(getSemester());
    dispatch(getProgram({}));
  }, []);

  useEffect(() => {
    if (filter.startDate && filter.endDate) {
      dispatch(getStudents({ ...filter, search: search }));
    } else {
      delete filter?.startDate;
      delete filter?.endDate;
      dispatch(getStudents({ ...filter, search: search }));
    }
  }, [filter]);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(getStudents({ ...filter, search: search }));
    }, 300);
    return () => clearTimeout(getData);
  }, [search]);

  const handleDateRangeChange = (newValues) => {
    // Assuming the first item in the array is the start date and the second item is the end date
    let startDate = newValues?.[0]?.format();
    let endDate = newValues?.[1]?.format();

    console.log("startDate", startDate);
    console.log("endDate", endDate);

    if (endDate) {
      setFilter({
        ...filter,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      });
    }

    // Update the state
    setDates(newValues);
  };
  console.log("filter", filter);
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Billing
      </Typography>
      <div className="flex flex-col gap-10">
        <div className="flex gap-5  justify-end">
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

          <DatePicker
            className="h-full border"
            style={{
              height: "auto",
              padding: "16.5px 14px",
              background: "transparent",
              margin: "0px",
              color: "#6b7280",
            }}
            placeholder="Select Date"
            range
            onChange={handleDateRangeChange}
            value={dates}
          />
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
          <div className="w-1/8">
            <MainCheckBox
              id="balance"
              handleChange={(e) => {
                setFilter({
                  ...filter,
                  balance: e.target.checked,
                });
              }}
              label="Students with Balances"
              checked={filter?.balance}
            />
          </div>
          <div className="w-1/8">
            <MainCheckBox
              id="paid_full"
              handleChange={(e) => {
                setFilter({
                  ...filter,
                  paidFull: e.target.checked,
                });
              }}
              label="Students with full payment"
              checked={filter?.paidFull}
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
              placeholder="Search Student"
              className="flex flex-1"
              disableUnderline
              fullWidth
              // value={searchText}
              inputProps={{
                "aria-label": "Search",
              }}
              // onChange={(ev) => dispatch(getStudents({ search: ev.target.value }))}
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
              setDates([]);
              setFilter({
                type: "registrationFees",
                semester: "",
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
              component={Link}
              to="/finance/student/add"
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StudentsHeader;
