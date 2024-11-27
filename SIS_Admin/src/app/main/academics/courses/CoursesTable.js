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

import { selectUser } from "app/store/userSlice";
import { authRoles } from "src/app/auth";
import DownloadButton from "app/shared-components/DownloadButton";
import DeleteModal from "app/shared-components/DeleteModal";
import StudentsTableHead from "./CoursesTableHead";
import { deleteCourse, getCourses, selectCourses } from "../store/coursesSlice";

function CoursesTable(props) {
  const dispatch = useDispatch();
  // const courses = useSelector(selectCourses);
  // const searchText = useSelector(selectProductsSearchText);
  const user = useSelector(selectUser);
  const courses = useSelector(selectCourses);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const currentUserRole = user?.role?.[0];

  const academicRole = currentUserRole === authRoles?.academics?.[0];
  const adminRole = currentUserRole === authRoles?.admin?.[0];

  useEffect(() => {
    setLoading(true);
    dispatch(getCourses({})).then((action) => {
      // setData(action?.payload || []);
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(applications
    //     // _.filter(applications, (item) =>
    //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
    //     // )
    //   );
    //   setPage(0);
    // } else {
    setData(courses);
    // }
  }, [courses]);
  // // searchText;

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
    dispatch(deleteCourse(selected));
    setSelected([]);
    setOpenModal(!openModal);
  }

  function handleClick(item) {
    if (!user?.role?.includes(authRoles.instructors[0])) {
      props.navigate(`/academics/courses/${item.id}`);
    }
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

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No courses assigned
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        {adminRole || academicRole ? (
          <div className="flex justify-end m-20 items-center">
            <DownloadButton
              data={data?.map((dt) => {
                return {
                  ...dt,
                  semesters: dt?.semesters?.map((semester) => semester?.name)?.join(", "),
                };
              })}
              headers={[
                {
                  label: "Course Id",
                  key: "course_id",
                },
                {
                  label: "Name",
                  key: "name",
                },
                {
                  label: "Program",
                  key: "program.name",
                },
                {
                  label: "Semester",
                  key: "semesters",
                },
              ]}
              fileName="CourseReport.csv"
            />
          </div>
        ) : null}
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <StudentsTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={() => {
              setOpenModal(!openModal);
            }}
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
                    onClick={() => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.course_id || n?.id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.program?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.semesters?.map((semester) => semester?.name)?.join(", ")}
                    </TableCell>

                    {/* <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.active ? "Yes" : "No"}
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

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
      <DeleteModal
        open={openModal}
        handleDelete={handleDeselect}
        handleClose={() => {
          setOpenModal(!openModal);
        }}
      />
    </div>
  );
}

export default withRouter(CoursesTable);
