import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import { useDispatch, useSelector } from "react-redux";

import DownloadButton from "app/shared-components/DownloadButton";
import { getCourses, selectCourses } from "app/store/coursesSlice";
import { getProgram, selectProgram } from "app/store/studentSlice";
import { selectUser } from "app/store/userSlice";
import { authRoles } from "src/app/auth";
import MainSelect from "../../dashboards/Shared/Select";
import TableWidget from "../../dashboards/student/widgets/TableWidget";
import { createOrUpdateGrade } from "../store/gradeSlice";
import { getGrades, selectGrades } from "../store/gradesSlice";
import { getSemester, selectSemester } from "app/store/semesterSlice";
import { Button } from "@mui/material";
// import { getCourses, selectCourses } from "../store/coursesSlice";

const defaultGradData = [
  {
    id: 1,
    courseName: "Course1",
    grad: 45,
    gradClass: "A",
  },
  {
    id: 2,
    courseName: "Course2",
    grad: 50,
    gradClass: "D",
  },
  {
    id: 3,
    courseName: "Course3",
    grad: 40,
    gradClass: "C",
  },
];
function GradTableAdmin(props) {
  const dispatch = useDispatch();
  // const applications = useSelector(selectApplications);
  // const searchText = useSelector(selectProductsSearchText);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    programId: "",
    courseId: "",
    semesterId: "",
  });
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(defaultGradData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const user = useSelector(selectUser);
  const courses = useSelector(selectCourses);
  const gradesInfo = useSelector(selectGrades);
  const programs = useSelector(selectProgram);
  const semesters = useSelector(selectSemester);

  const currentUserRole = user?.role?.[0];
  const adminRole = currentUserRole === authRoles?.admin?.[0];
  const financeRole = currentUserRole === authRoles?.finance?.[0];
  const academicRole = currentUserRole === authRoles?.academics?.[0];

  console.log({ gradesInfo });
  useEffect(() => {
    dispatch(getCourses({})).then((action) => {
      // setData(action?.payload || []);

      setLoading(false);
    });
    dispatch(getGrades());
    dispatch(getSemester());
    dispatch(getProgram({}));
  }, []);

  function handleDeselect() {
    setSelected([]);
  }

  useEffect(() => {
    console.log("filter.programId", filter.programId);
    console.log("filter.courseId", filter.courseId);
    console.log("filter.semesterId", filter.semesterId);
    if (!filter.courseId) {
      setError("Course  is required");
    } else {
      dispatch(
        getGrades({
          courseId: filter.courseId,
          semesterId: filter.semesterId,
          programId: filter.programId,
        })
      );
      setError("");
    }
  }, [filter]);

  const handleChangeGrade = ({ gradeNumber, userId, index }) => {
    const gradeInfoData = gradesInfo[index];
    console.log({ gradeNumber, index, gradeInfoData });
    dispatch(
      createOrUpdateGrade({
        registration_id: gradeInfoData?.id,
        grade_number: gradeNumber,
        user_id: gradeInfoData?.createdBy,
        course_id: gradeInfoData?.courseId,
      })
    ).then((response) => {
      dispatch(getGrades({
        courseId: filter.courseId,
        semesterId: filter.semesterId,
        programId: filter.programId,
      }));
    });
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no application!
        </Typography>
      </motion.div>
    );
  }

  const tableColumn = [
    "CourseId",
    "Course",
    "Credit HR.",
    "Grade",
    "Grade Points",
  ];

  const courseColumn = [
    "Student Name",
    "Grade(Number)",
    "Grade(Auto-Gen)",
    "Grade Points",
  ];
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <div className="space-y-32 p-24" id="download-pdf">
          <div className="mt-16 space-y-32">
            <div className="flex justify-center">
              <h1 style={{ fontWeight: "bolder" }}>Grade Portal</h1>
              {/* <img
                src="https://i.postimg.cc/YSPCbJzj/logo-dark.png"
                width="350px"
                alt="logo"
              /> */}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              className=""
              // component={Link}
              // to="/admission/registration/add"
              variant="contained"
              color="secondary"
              // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              onClick={() => {
                console.log("call");
                setFilter({
                  ...filter,
                  courseId: "",
                  semesterId: "",
                  programId: "",
                });
              }}
            >
              Clear
            </Button>
          </div>

          <MainSelect
            data={{
              value: filter.programId,
              onChange: (e) => {
                setFilter({ ...filter, programId: e.target.value });
              },
            }}
            label="Select Program"
            options={programs?.map((program) => ({
              id: program?.id,
              value: program?.id,
              label: program?.name,
            }))}
          // errorMessage={fieldData?.errorMessage?.program}
          />

          <MainSelect
            data={{
              value: filter.semesterId,
              onChange: (e) => {
                setFilter({ ...filter, semesterId: e.target.value });
              },
            }}
            label="Select Semester"
            options={semesters?.map((semester) => ({
              id: semester?.id,
              value: semester?.id,
              label: semester?.name,
            }))}
          />

          <MainSelect
            data={{
              value: filter.courseId,
              onChange: (e) => {
                setFilter({ ...filter, courseId: e.target.value });
              },
            }}
            label="Select Course"
            options={courses?.map((course) => ({
              id: course?.id,
              value: course?.id,
              label: course?.name,
            }))}
          // errorMessage={fieldData?.errorMessage?.program}
          />

          {error && <div>{error}</div>}
          {(adminRole || academicRole) && gradesInfo?.length > 0 ? (
            <div className="flex justify-end m-20 items-center">
              <DownloadButton
                data={gradesInfo}
                headers={[
                  {
                    label: "Student Name",
                    key: "userInformationId.displayName",
                  },
                  {
                    label: "Grade(Number)",
                    key: "grade.grade_number",
                  },
                  {
                    label: "Grade(Auto-Gen)",
                    key: "grade.grade_name",
                  },
                  {
                    label: "Grade Points",
                    key: "grade.grade_point",
                  },
                ]}
                fileName="Grade.csv"
              />
            </div>
          ) : null}

          <TableWidget
            handleChange={(gradeData) => handleChangeGrade(gradeData)}
            columns={courseColumn}
            rows={[
              ...(gradesInfo?.map?.((gradeInfo) => ({
                studentName: gradeInfo?.userInformationId?.displayName,
                gradeNumber: gradeInfo?.grade?.grade_number,
                gradeAutoGen: gradeInfo?.grade?.grade_name,
                gradePointAdmin: gradeInfo?.grade?.grade_point,
                // registrationId: gradeInfo?.id
              })) || []),

              // {
              //   studentName: "005",
              //   gradeNumber: "0123",
              //   gradeAutoGen: 3,
              //   gradePointAdmin: 4.0,
              // },
              // {
              //   studentName: "005",
              //   gradeNumber: "0123",
              //   gradeAutoGen: 3,
              //   gradePointAdmin: 4.0,
              // },
              // {
              //   studentName: "005",
              //   gradeNumber: "0123",
              //   gradeAutoGen: 3,
              //   gradePointAdmin: 4.0,
              // },
            ]}
          />
        </div>
      </FuseScrollbars>

      {/* <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}

export default withRouter(GradTableAdmin);
