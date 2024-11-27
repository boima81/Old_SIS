/* eslint-disable no-nested-ternary */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import { useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";
import moment from "moment";
import CourseTableHead from "./CourseTableHead";
import { currencySymbol } from "../../Shared/utils";
// import {
//   getRegistrationFees,
//   selectRegistrationFees,
//   updateRegistrationFees,
// } from "../store/feesSlice";

function CourseTable({ data = [], checked, setValue, courseAmount = 0 }) {
  const dispatch = useDispatch();
  //   const registrationFeesData = useSelector(selectRegistrationFees);
  // const searchText = useSelector(selectProductsSearchText);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  //   const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  useEffect(() => {
    if (checked) {
      setSelected(checked);
    }
  }, [checked]);

  const useStyles = makeStyles((theme) => ({
    tablecell: {
      fontSize: "10pt",
    },
  }));

  const classes = useStyles();

  //   useEffect(() => {
  //     dispatch(getRegistrationFees()).then(() => setLoading(false));
  //   }, [dispatch]);

  //   useEffect(() => {
  //     // if (searchText.length !== 0) {
  //     //   setData(registrationFeesData
  //     //     // _.filter(registrationFeesData, (item) =>
  //     //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
  //     //     // )
  //     //   );
  //     //   setPage(0);
  //     // } else {
  //     setData(registrationFeesData);
  //     // }
  //   }, [registrationFeesData]);
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
      const ids = data.map((n) => n.id);
      setSelected(ids);
      setValue(ids);
      return;
    }
    setSelected([]);
    setValue([]);
  }

  function handleDeselect() {
    setSelected([]);
    setValue([]);
  }

  //   function handleClick(item) {
  //     props.navigate(`/finance/fees/${item.id}`);
  //   }

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
    setValue(newSelected);
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

  if (data?.length === 0) {
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
  //   const handleStatus = (status, id) => {
  //     dispatch(
  //       updateRegistrationFees({
  //         is_approve: status,
  //         id,
  //       })
  //     );
  //   };
  const scheduleData = {
    mon_wed_fri: "M/W/F",
    tue_thu_sat: "T/TH/S",
    tue_thu: "T/TH",
    online: "Online",
  };
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CourseTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />
          {console.log("data--->", data)}
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order?.id) {
                    case "categories": {
                      return o?.categories?.[0];
                    }
                    default: {
                      return o?.[order?.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                if (n?.id) {
                  const startTime = n?.time
                    ? moment(n?.time, "hh:mm A").format("hh:mm A")
                    : null;
                  const lastTime = n?.last_time
                    ? moment(n?.last_time, "hh:mm A").format("hh:mm A")
                    : null;
                  const concatDate = `${startTime
                    ? lastTime
                      ? `${startTime}-${lastTime}`
                      : startTime
                    : ""
                    }`;
                  const isSelected = selected?.indexOf(n?.id) !== -1;
                  return (
                    <TableRow
                      className="h-72 cursor-pointer"
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    // onClick={() => handleClick(n)}
                    >
                      <TableCell
                        className="w-40 md:w-64 text-center"
                        padding="none"
                      >
                        <Checkbox
                          disabled={n?.alreadyRegistered}
                          checked={n?.alreadyRegistered || isSelected}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => handleCheck(event, n.id)}
                        />
                      </TableCell>
                      <TableCell
                        className={`p-4 md:p-16 ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.course_id}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.course_no}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.name}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.category}
                      </TableCell>
                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.course_credit}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.sections?.sectionNumber}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {Object.keys(n?.schedule || {})
                          ?.filter((schedule) => n.schedule[schedule])
                          ?.map((schedule) => scheduleData[schedule])
                          ?.join(", ")}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {concatDate}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.classroom}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {n?.instructor?.name}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {courseAmount && n?.creditType === 1
                          ? `${currencySymbol}${courseAmount}`
                          : "-"}
                      </TableCell>

                      <TableCell
                        className={`p-4 md:p-16 truncate ${classes.tablecell}`}
                        component="th"
                        scope="row"
                      >
                        {currencySymbol}
                        {n?.creditType === 1 ? (n?.course_credit || 0) * (courseAmount || 0) : n?.price}
                      </TableCell>
                      {/* 
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.userInformationId?.displayName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.is_approved ? "Approved" : "Not Approved"}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleStatus(true, n.id)}
                        type="button"
                      >
                        Approved
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStatus(false, n.id)}
                        type="button"
                      >
                        Decline
                      </Button>
                    </TableCell> */}
                    </TableRow>
                  );
                }
                return null;
              })}
          </TableBody>
        </Table>
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

export default withRouter(CourseTable);
