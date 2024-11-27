/* eslint-disable jsx-a11y/no-static-element-interactions */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";

import { useNavigate } from "react-router-dom";
import { Button, ListItemText, MenuItem, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadButton from "app/shared-components/DownloadButton";
import { authRoles } from "src/app/auth";
import { selectUser } from "app/store/userSlice";
import UsersTableHead from "./RegistrationTableHead";
import {
  getRegistrations,
  selectRegistrations,
  updateRegistrationStatus,
} from "../store/registrationsSlice";
import BasicModal from "../../dashboards/Shared/Modal";
import MainTextField from "../../dashboards/Shared/TextField";
import { toaster } from "../../dashboards/Shared/utils";

function UsersTable(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrations = useSelector(selectRegistrations);
  // const searchText = useSelector(selectProductsSearchText);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [openModal, setOpenModal] = useState(false);
  
  
  

  const [userMenu, setUserMenu] = useState(null);
  const [clickableId, setClickable] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const userMenuClick = (event, nData) => {
    setUserMenu(event.currentTarget);
    setStatusType(null);
    setClickable(nData);
  };
  const user = useSelector(selectUser);
  const currentUserRole = user?.role?.[0];

  const admissionRole = currentUserRole === authRoles?.admission?.[0];
  const academicRole = currentUserRole === authRoles?.academics?.[0];
  const adminRole = currentUserRole === authRoles?.admin?.[0];

  const userMenuClose = () => {
    setUserMenu(null);
    setStatusType(null);
    setClickable(null);
  };
  const defaultValues = {
    feedback: "",
  };

  const schema = yup.object().shape({
    feedback: yup.string().required("You must enter feedback"),
  });

  const {
    control,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  




  const { errors } = formState;



  useEffect(() => {
    setLoading(true);
    dispatch(getRegistrations({})).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(registrations
    //     // _.filter(registrations, (item) =>
    //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
    //     // )
    //   );
    //   setPage(0);
    // } else {
    setData(registrations);
    // }
  }, [registrations]);
  // searchText;

  function onSubmit(datas) {
    setLoading(true);
    dispatch(
      updateRegistrationStatus({
        is_approved: false,
        id: clickableId?.id,
        type: statusType?.type,
        comment: datas?.feedback,
      })
    ).then((actionData) => {
      setLoading(false);
      if (actionData?.payload?.id) {
        setOpenModal(!openModal);
        setStatusType(null);
        setClickable(null);
        reset();
      }
    });
  }


  


  

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
  const handleStatus = (status, currentData) => {
    console.log({ currentData, clickableId });
    if (
      clickableId?.is_paid
      // &&
      // parseFloat(currentData?.invoiceId?.amount_paid || 0) > 0
    ) {
      setLoading(true);
      dispatch(
        updateRegistrationStatus({
          is_approved: status,
          id: clickableId?.id,
          type: "approved",
        })
      ).then((actionData) => {
        setLoading(false);
        if (actionData?.payload?.id) {
          setClickable(null);
        }
      });
    } else {
      toaster("Failed", {
        data: {
          message: "Finance needs to add student payment",
        },
      });
    }
  };
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        {adminRole || admissionRole || academicRole ? (
          <div className="flex justify-end m-20 items-center">
            <DownloadButton
              data={data}
              headers={[
                {
                  label: "Student Id",
                  key: "applicationData.student.student_id",
                },
                {
                  label: "Student Name",
                  key: "applicationData.userInformationId.displayName",
                },
                {
                  label: "Registration Program",
                  key: "programId.name",
                },
                {
                  label: "Registration Semester",
                  key: "semesterId.name",
                },
                {
                  label: "Registration Status",
                  key: "registration_status",
                },
              ]}
              fileName="RegistrationReport.csv"
            />
          </div>
        ) : null}
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <UsersTableHead
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
                  switch (order?.id) {
                    case "categories": {
                      return o?.categories[0];
                    }
                    default: {
                      return o?.[order?.id];
                    }
                  }
                },
              ],
              [order?.direction]
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
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      // onClick={() =>
                      //   navigate(`/admission/registration/show/${n.id}`)
                      // }
                    >
                      {n?.applicationData?.student?.student_id ||
                        n?.userInformationId?.id}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.applicationData?.userInformationId?.displayName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.programId?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n?.semesterId?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 text-transform: uppercase"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {/* {n?.is_approved ? "Approved" : "Not Approved"} */}
                      {n?.registration_status}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <div className="flex gap-5 items-center">
                        <div
                          className="no-underline hover:underline"
                          onClick={() =>
                            navigate(`/admission/registration/${n.id}`)
                          }
                          onKeyDown={() =>
                            navigate(`/admission/registration/${n.id}`)
                          }
                        >
                          Edit
                        </div>
                        <div
                          className="no-underline hover:underline"
                          onClick={() =>
                            navigate(`/admission/registration/show/${n.id}`)
                          }
                          onKeyDown={() =>
                            navigate(`/admission/registration/show/${n.id}`)
                          }
                        >
                          View
                        </div>
                        {/* <div
                          className="no-underline hover:underline"
                          onClick={() => handleStatus(true, n.id)}
                          onKeyDown={() => handleStatus(true, n.id)}
                        >
                          Approved
                        </div>
                        <div
                          onClick={() => handleStatus(false, n.id)}
                          className="no-underline hover:underline"
                          onKeyDown={() => handleStatus(false, n.id)}
                        >
                          Decline
                        </div> */}
                        {!n?.is_approved && n?.is_completed ? (
                          <>
                            <Button
                              className="min-h-0	min-w-0"
                              onClick={(event) => userMenuClick(event, n)}
                              color="inherit"
                            >
                              <MoreVertIcon />
                            </Button>
                            <Popover
                              open={Boolean(userMenu)}
                              anchorEl={userMenu}
                              onClose={userMenuClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                              classes={{
                                paper: "py-8",
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleStatus(true, n);
                                  setUserMenu(null);
                                }}
                                role="button"
                              >
                                <ListItemText primary="Complete" />
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setOpenModal(!openModal);
                                  // handleStatus(false, n.id);
                                  setUserMenu(null);
                                  setStatusType({
                                    type: "decline",
                                    id: n.id,
                                  });
                                }}
                                role="button"
                              >
                                <ListItemText primary="Decline" />
                              </MenuItem>
                              <MenuItem
                                role="button"
                                onClick={() => {
                                  setOpenModal(!openModal);
                                  setUserMenu(null);

                                  setStatusType({ type: "feedback", id: n.id });
                                }}
                              >
                                <ListItemText primary="Feedback" />
                              </MenuItem>
                            
                            </Popover>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <Button
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
                      </Button> */}
                    </TableCell>
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
      <BasicModal
        open={openModal}
        handleClose={() => {
          setOpenModal(!openModal);
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid flex-col gap-16">
            <Controller
              name="feedback"
              control={control}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Feedback"
                  placeholder="Feedback"
                  id="feedback"
                  errorName={!!errors.feedback}
                  errorMessage={errors?.feedback?.message}
                />
              )}
            />
            <Button
              className="justify-self-end w-fit	"
              variant="contained"
              color="secondary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </BasicModal>

    </div>
  );
}

export default withRouter(UsersTable);
