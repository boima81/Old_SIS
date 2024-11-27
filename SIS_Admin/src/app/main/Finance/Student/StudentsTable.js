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

import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import { useDispatch, useSelector } from "react-redux";

import DownloadButton from "app/shared-components/DownloadButton";
import { selectUser } from "app/store/userSlice";
import { authRoles } from "src/app/auth";
import DeleteModal from "app/shared-components/DeleteModal";
import { updateApplicationStatus } from "../store/applicationSlice";
import { getStudents, selectStudents } from "../store/studentsSlice";
import StudentsTableHead from "./StudentsTableHead";
import { currencyName } from "../../dashboards/Shared/utils";
import moment from "moment";
import { Link } from "react-router-dom";

function StudentsTable(props) {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);
  const user = useSelector(selectUser);
  console.log({ students });
  // const searchText = useSelector(selectProductsSearchText);
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

  useEffect(() => {
    setLoading(true);
    dispatch(getStudents({ type: "registrationFees" })).then(() =>
      setLoading(false)
    );
  }, [dispatch]);

  const currentUserRole = user?.role?.[0];
  const adminRole = currentUserRole === authRoles?.admin?.[0];
  const financeRole = currentUserRole === authRoles?.finance?.[0];

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(applications
    //     // _.filter(applications, (item) =>
    //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
    //     // )
    //   );
    //   setPage(0);
    // } else {
    setData(students);
    // }
  }, [students]);
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
    setOpenModal(!openModal);
  }

  function handleClick(item) {
    props.navigate(`/finance/student/${item.id}`);
  }

  function handleClickDetails(item) {
    props.navigate(`/finance/student/details/${item}`);
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
          There are no application!
        </Typography>
      </motion.div>
    );
  }
  const handleStatus = (status, id) => {
    dispatch(
      updateApplicationStatus({
        is_approve: status,
        id,
      })
    );
  };
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        {adminRole || financeRole ? (
          <div className="flex justify-end m-20 items-center">
            <DownloadButton
              data={data?.map((dt) => {
                return {
                  ...dt,
                  courseNo: dt?.registrationData?.courses?.length,
                  amountPaidCSV: `${
                    dt?.registrationData?.invoiceId?.amount_paid || 0
                  }`,
                  totalAmountCSV: `${
                    dt?.registrationData?.invoiceId?.total_amount || 0
                  }`,
                  balanceDueCSV: `${
                    (dt?.registrationData?.invoiceId?.total_amount || 0) -
                    (dt?.registrationData?.invoiceId?.amount_paid || 0)
                  }`,
                  paymentTermsCSV: `${
                    (dt?.registrationData?.invoiceId?.totalTerms || 1) <= 1
                      ? "Full"
                      : "Split"
                  }`,
                  semester: dt?.applicationData?.semesterId?.name || "-",
                };
              })}
              headers={[
                {
                  label: "Student Id",
                  key: "userInformationId?.student.student_id",
                },
                {
                  label: "Student Name",
                  key: "userInformationId.displayName",
                },
                {
                  label: "Student Email",
                  key: "email",
                },
                {
                  label: "Student Phone Number",
                  key: "userInformationId.phone_number",
                },
                {
                  label: "Program",
                  key: "applicationData.programId.name",
                },
                {
                  label: "No Of Course",
                  key: "courseNo",
                },
                {
                  label: "Invoice No",
                  key: "registrationData.invoiceId.invoice_number",
                },
                {
                  label: `Amount Due (${currencyName})`,
                  key: "totalAmountCSV",
                },
                {
                  label: `Amount Paid (${currencyName})`,
                  key: "amountPaidCSV",
                },
                {
                  label: `Balance Due (${currencyName})`,
                  key: "balanceDueCSV",
                },
                {
                  label: "Semester",
                  key: "semester",
                },
                {
                  label: "Payment Terms",
                  key: "paymentTermsCSV",
                },
              ]}
              fileName="StudentFeesReport.csv"
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
                console.log("n billing data", n);
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
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell
                      className="p-4 text-blue-500 md:p-16"
                      component="th"
                      scope="row"
                      // onClick={(event) => handleClick(n)}
                      onClick={(event) =>
                        handleClickDetails(n?.userInformationId.student.user)
                      }
                    >
                      {n?.userInformationId?.student?.student_id || n?.id}
                    </TableCell>
                    <TableCell
                      className="p-4 text-blue-500 md:p-16"
                      component="th"
                      scope="row"
                      onClick={(event) =>
                        handleClickDetails(n?.userInformationId.student.user)
                      }
                    >
                      {n?.userInformationId?.displayName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.email}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.userInformationId?.phone_number}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.applicationData?.programId?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.registrationData?.courses?.length || 0}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.registrationData?.invoiceId?.invoice_number || "-"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.registrationData?.invoiceId?.total_amount || 0}{" "}
                      {currencyName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.registrationData?.invoiceId?.amount_paid || 0}{" "}
                      {currencyName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.registrationData?.invoiceId?.remainingBalance || 0}{" "}
                      {currencyName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {(n?.registrationData?.invoiceId?.totalTerms || 1) <= 1
                        ? "Full"
                        : "Split"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {moment(n?.registrationData?.invoiceId?.createdAt).format(
                        "YYYY-MM-DD"
                      )}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.registrationData?.semesterId?.name || "-"}
                    </TableCell>
                    {n?.receiptFile ? (
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        <a
                          href={n?.receiptFile || ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Receipt File
                        </a>
                      </TableCell>
                    ) : (
                      <p className="p-4 md:p-16 truncate">Receipt</p>
                    )}
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

export default withRouter(StudentsTable);
