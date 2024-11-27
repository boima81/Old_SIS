import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Button } from "@mui/material";
import { selectUser } from "app/store/userSlice";
import AdmissionReportHead from "./AdmissionReportTableHead";

import MainSelect from "../../dashboards/Shared/Select";
import {
  courseOption,
  genderOption,
  programOptions,
  registrationOption,
  semesterOptions,
} from "../../dashboards/Shared/utils";
import {
  getStudentsReport,
  selectStudentsReport,
} from "../../../store/studentsReport";
import { getSemester, selectSemester } from "../../../store/semesterSlice";
import { getCourses, selectCourses } from "../../../store/coursesSlice";
import DownloadButton from "../../../shared-components/DownloadButton";
import MainCheckBox from "../../dashboards/Shared/Checkbox";
import authRoles from "../../../auth/authRoles";
import {
  getInstructors,
  selectInstructors,
} from "../../../store/instructorsSlice";

function AdmissionReport(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentUserRole = user?.role?.[0];

  const admissionRole = currentUserRole === authRoles?.admission?.[0];
  const academicRole = currentUserRole === authRoles?.academics?.[0];
  const financeRole = currentUserRole === authRoles?.finance?.[0];
  const instructorsRole = currentUserRole === authRoles?.instructors?.[0];
  const adminRole = currentUserRole === authRoles?.admin?.[0];

  const users = useSelector(selectStudentsReport);
  const courses = useSelector(selectCourses);
  const semesters = useSelector(selectSemester);
  const instructors = useSelector(selectInstructors);
  console.log({ courses });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [filter, setFilter] = useState({
    course: "",
    semester: "",
    instructor: "",
    registrationStatus: "",
    gender: "",
    balance: false,
    paidFull: false,
  });
  useEffect(() => {
    setLoading(true);
    dispatch(getStudentsReport({})).then(() => setLoading(false));
    dispatch(getCourses({}));
    dispatch(getSemester());
    dispatch(getInstructors());
  }, [dispatch]);

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(users
    //     // _.filter(users, (item) =>
    //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
    //     // )
    //   );
    //   setPage(0);
    // } else {
    setData(users);
    // }
  }, [users]);
  // searchText;

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

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
    } else if (selectedIndex === selected?.length - 1) {
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

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <FuseLoading />
  //     </div>
  //   );
  // }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no any data!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        {!instructorsRole ? (
          <div className="flex justify-between m-20 items-center">
            <div className="flex gap-10 flex-wrap w-10/12">
              {admissionRole || academicRole || adminRole ? (
                <>
                  <div className="w-1/4">
                    <MainSelect
                      options={courses?.map((course) => ({
                        id: course?.id,
                        value: course?.id,
                        label: course?.name,
                      }))}
                      label="Select Course"
                      data={{
                        value: filter?.course,
                        onChange: (selectCor) => {
                          console.log({ selectCor: selectCor?.target.value });
                          setFilter({
                            ...filter,
                            course: selectCor?.target.value,
                          });
                        },
                      }}
                    />
                  </div>
                  <div className="w-1/4">
                    <MainSelect
                      options={semesters?.map((semester) => ({
                        id: semester?.id,
                        value: semester?.id,
                        label: semester?.name,
                      }))}
                      label="Select Semester"
                      data={{
                        value: filter?.semester,
                        onChange: (selectSem) => {
                          console.log({ selectSem: selectSem?.target.value });
                          setFilter({
                            ...filter,
                            semester: selectSem?.target.value,
                          });
                        },
                      }}
                    />
                  </div>
                </>
              ) : null}
              {academicRole || adminRole ? (
                <>
                  <div className="w-1/4">
                    <MainSelect
                      options={registrationOption}
                      label="Registration Status"
                      data={{
                        value: filter?.registrationStatus,
                        onChange: (registrationStatus) => {
                          console.log({
                            registrationStatus:
                              registrationStatus?.target.value,
                          });
                          setFilter({
                            ...filter,
                            registrationStatus:
                              registrationStatus?.target.value,
                          });
                        },
                      }}
                    />
                  </div>
                  <div className="w-1/4">
                    <MainSelect
                      options={genderOption}
                      label="Select gender"
                      data={{
                        value: filter?.gender,
                        onChange: (gender) => {
                          console.log({
                            gender: gender?.target.value,
                          });
                          setFilter({
                            ...filter,
                            gender: gender?.target.value,
                          });
                        },
                      }}
                    />
                  </div>
                  <div className="w-1/4">
                    <MainSelect
                      options={instructors?.map((instructorData) => ({
                        id: instructorData?.id,
                        value: instructorData?.id,
                        label: instructorData?.name,
                      }))}
                      label="Select Instructor"
                      data={{
                        value: filter?.instructor,
                        onChange: (selectIns) => {
                          setFilter({
                            ...filter,
                            instructor: selectIns?.target.value,
                          });
                        },
                      }}
                    />
                  </div>
                </>
              ) : null}
              {financeRole || adminRole ? (
                <>
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
                </>
              ) : null}
              <div className="w-1/4">
                <Button
                  // className="my-32"
                  onClick={() => {
                    setLoading(true);
                    setFilter({});
                    dispatch(getStudentsReport({}))?.then(() => setLoading(false));
                  }}
                  variant="contained"
                  color="secondary"
                  // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                >
                  Clear
                </Button>
                <Button
                  // className="my-32"
                  onClick={() => {
                    setLoading(true);
                    dispatch(getStudentsReport(filter))
                      ?.then(() => setLoading(false))
                      .finally(() => setLoading(false));
                  }}
                  variant="contained"
                  color="primary"
                  // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                >
                  Search
                </Button>
              </div>
            </div>
            <DownloadButton
              data={data || []}
              headers={[
                {
                  label: "Student Name",
                  key: "userInformationId.displayName",
                
                },
                {
                  label: "Email",
                  key: "email",
                }, {
                  label: "Phone Number",
                  key: "userInformationId.phone_number",
                },
                {
                  label: "Program",
                  key: "applicationData.programId.name",
                },
                {
                  label: "Semester",
                  key: "applicationData.semesterId.name",
                },
                {
                  label: "Registration Status",
                  key: "registrationData.registration_status",
                },
              ]}
              fileName="AdmissionReport.csv"
            />
          </div>
        ) : null}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <FuseLoading />
          </div>
        ) : (
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <AdmissionReportHead
              selectedProductIds={selected}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data?.length}
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
                      onClick={(event) => handleClick(n)}
                    >
                      {/* <TableCell
                        className="w-40 md:w-64 text-center"
                        padding="none"
                      >
                        <Checkbox
                          checked={isSelected}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => handleCheck(event, n.id)}
                        />
                      </TableCell> */}

                      {/* <TableCell
                      className="w-52 px-4 md:px-0"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {n?.images?.length > 0 && n?.featuredImageId ? (
                        <img
                          className="w-full block rounded"
                          src={_.find(n.images, { id: n.featuredImageId }).url}
                          alt={n.name}
                        />
                      ) : (
                        <img
                          className="w-full block rounded"
                          src="assets/images/apps/ecommerce/product-image-placeholder.png"
                          alt={n.name}
                        />
                      )}
                    </TableCell> */}

                      {/* <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.userInformationId?.userInformationId}
                    </TableCell> */}
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        {n?.userInformationId?.displayName || "-"}
                      </TableCell>
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        {n?.email || "-"}
                      </TableCell>
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        {n?.userInformationId?.phone_number || "-"}
                      </TableCell>

                   
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        {n?.userInformationId?.displayName || "-"}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {n?.applicationData?.programId?.name || "-"}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {n?.applicationData?.semesterId?.name || "-"}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16 text-transform: uppercase"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {n?.registrationData?.registration_status || "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </FuseScrollbars>
      {!loading && (
        <TablePagination
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
        />
      )}
    </div>
  );
}

export default withRouter(AdmissionReport);
