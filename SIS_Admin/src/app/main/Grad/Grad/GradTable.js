import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";

import { Button } from "@mui/material";
import { getApplication, selectApplication } from "app/store/applicationSlice";
import { selectUser } from "app/store/userSlice";
import moment from "moment";

import TableWidget from "../../dashboards/student/widgets/TableWidget";
import { getGradeByUser, selectGradeByUser } from "../store/gradeSlice";
import {
  getSemesters,
  selectSemesterSetting,
} from "../../settings/store/applicationSettingSemesterSlice";
import MainSelect from "../../dashboards/Shared/Select";

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
function GradTable(props) {
  const dispatch = useDispatch();
  // const applications = useSelector(selectApplications);
  // const searchText = useSelector(selectProductsSearchText);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(defaultGradData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const user = useSelector(selectUser);
  const applications = useSelector(selectApplication);
  const gradesData = useSelector(selectGradeByUser);
  console.log({ gradesData });
  const applicationData = applications;

  const applicationId = user?.applicationId?.id;
  const semesters = useSelector(selectSemesterSetting);
  console.log({ semesters });
  const handleGradeChange = (semester) => {
    dispatch(getGradeByUser(semester));
  }
  useEffect(() => {
    
    dispatch(getSemesters({}));
  }, []);

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/settings/users/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  // if (!gradesData?.isRegistered) {
  //   return (
  // <motion.div
  //   initial={{ opacity: 0 }}
  //   animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //   className="flex flex-col flex-1 items-center justify-center h-full"
  // >
  //   <Typography color="text.secondary" variant="h5">
  //     Grades will get updated after your instrcutor  has added grades
  //   </Typography>
  //   {/* <Button
  //     className="mt-24"
  //     component={Link}
  //     variant="outlined"
  //     to="/register"
  //     color="inherit"
  //   >
  //     Go to Register Page
  //   </Button> */}
  // </motion.div>
  //   );
  // }
  const tableColumn = [
    "CourseId",
    "Course",
    "Credit HR.",
    "Grade",
    "Grade Points",
  ];
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <div className="space-y-32 p-24">
          <MainSelect
            data={{
              onChange: (e) => {
                console.log({ value:e.target.value });
                handleGradeChange(e.target.value)
              },
            }}
            id="semester_id"
            label="Semester"
            // className="md:w-1/2"
            options={semesters?.map((semester) => ({
              id: semester?.id,
              value: semester?.id,
              label: semester?.name,
            }))}
          />
        </div>
        {/* <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <GradTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.courseName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n?.grad}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n?.gradClass}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table> */}
        {!gradesData?.isRegistered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="flex flex-col flex-1 items-center justify-center h-full"
          >
            <Typography color="text.secondary" variant="h5">
              Grades will get updated after your instrcutor has added grades
            </Typography>
            {/* <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/register"
          color="inherit"
        >
          Go to Register Page
        </Button> */}
          </motion.div>
        ) : (
          <div className="space-y-32 p-24" id="download-pdf">
            <div className="mt-16 space-y-32">
              <div className="flex justify-center">
                <img
                  src="https://i.postimg.cc/YSPCbJzj/logo-dark.png"
                  width="350px"
                  alt="logo"
                />
              </div>
              <div className="flex justify-between">
                <div className="content-box">
                  <h5>
                    Student ID:{" "}
                    {gradesData?.userInformation?.student?.[0]?.student_id}
                  </h5>
                  <h5>
                    Student Name :{" "}
                    {
                      gradesData?.userInformation?.userInformationId
                        ?.displayName
                    }
                  </h5>
                  <h5>
                    Program: {gradesData?.userInformation?.programs}
                  </h5>
                  <h5>
                    Semester:{" "}
                    {gradesData?.userInformation?.semesters}
                  </h5>
                </div>
                <div className="text-right">
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleSubmit(onSubmit)}
                    type="submit"
                    className="mb-16"
                  >
                    Download
                  </Button>
                  {/* <h1>{user?.data?.displayName}</h1>
            <h3>{user?.data?.phone_number && `${user?.data?.phone_number}`}</h3>
            <h5>{user?.email}</h5> */}
                </div>
              </div>
              {/* <div className="flex gap-52">
          <div>
            <h2 className="font-medium">Invoice Date</h2>
            <h5>{moment().format("MMM Do YYYY")}</h5>
          </div>
        </div> */}
            </div>
            <h1 className="text-center font-bold	uppercase">Grade Sheet</h1>
            <div>
              <TableWidget
                columns={tableColumn}
                rows={[
                  ...(gradesData?.grades?.map?.((grade) => ({
                    courseId: grade?.course_id?.course_id,
                    name: grade?.course_id?.name,
                    hours: grade?.course_id?.course_credit,
                    grade: grade?.grade_name,
                    gradePoint: grade?.grade_point,
                  })) || []),
                  {
                    courseId: "",
                    name: "",
                    hours: "",
                    grade: (
                      <Typography style={{ fontWeight: "bolder" }}>
                        Grade Point Average
                      </Typography>
                    ),
                    gradePoint: (
                      <Typography style={{ fontWeight: "bolder" }}>
                        {(gradesData?.gradePointAvg || 0)?.toFixed(2)}
                      </Typography>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        )}
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

export default withRouter(GradTable);
