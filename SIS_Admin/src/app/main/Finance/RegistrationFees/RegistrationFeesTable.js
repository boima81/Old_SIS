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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DeleteModal from "app/shared-components/DeleteModal";
import RegistrationFeesTableHead from "./RegistrationFeesTableHead";
import BasicModal from "../../dashboards/Shared/Modal";
import MainTextField from "../../dashboards/Shared/TextField";
import { getPayments, selectPaymentsData } from "../store/registrationPaymentsSlice";
import { updatePaymentStatus } from "../store/registrationPaymentSlice";
import { currencyName } from "../../dashboards/Shared/utils";

function RegistrationFeesTable(props) {
  const dispatch = useDispatch();
  const payments = useSelector(selectPaymentsData);
  // const searchText = useSelector(selectProductsSearchText);
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popupMenu, setPopMenu] = useState(false);
  const [statusType, setStatusType] = useState(null);
  const [clickableId, setClickable] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  console.log({ data });
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const popupMenuClick = (event, id) => {
    setPopMenu(event.currentTarget);
    setStatusType(null);
    setClickable(id);
  };

  const popupMenuClose = () => {
    setPopMenu(null);
    setStatusType(null);
    setClickable(null);
  };
  function onSubmit(datas) {
    dispatch(
      updatePaymentStatus({
        is_approved: false,
        id: clickableId,
        type: statusType?.type,
        comment: datas?.feedback,
      })
    ).then((actionData) => {
      if (actionData?.payload?.id) {
        setOpenModal(!openModal);
        setStatusType(null);
        setClickable(null);
        reset();
        dispatch(getPayments());
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getPayments()).then(() => setLoading(false));
  }, [dispatch]);

  const defaultValues = {
    feedback: "",
  };

  const schema = yup.object().shape({
    feedback: yup.string().required("You must enter feedback"),
  });

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(applications
    //     // _.filter(applications, (item) =>
    //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
    //     // )
    //   );
    //   setPage(0);
    // } else {
    setData(payments);
    // }
  }, [payments]);
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
    setDeleteOpenModal(!openDeleteModal);
  }

  function handleClick(item) {
    props.navigate(`/finance/application-fees/${item.id}`);
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
          There are no payment!
        </Typography>
      </motion.div>
    );
  }
  const handleStatus = (status, id) => {
    dispatch(
      updatePaymentStatus({
        is_approved: status,
        id: clickableId,
        type: "approved",
      })
    ).then((actionData) => {
      if (actionData?.payload?.id) {
        setClickable(null);
        dispatch(getPayments());
      }
    });
  };
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <RegistrationFeesTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={() => {
              setDeleteOpenModal(!openDeleteModal);
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
                    // onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.userInformationData?.student?.student_id || n?.id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.userInformationData?.displayName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.amount} {currencyName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.payment_type}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.admin_payment_status}
                    </TableCell>
                    {/* <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      <Button
                        className="min-h-0	min-w-0"
                        onClick={(event) => popupMenuClick(event, n.id)}
                        color="inherit"
                      >
                        <MoreVertIcon />
                      </Button>
                      <Popover
                        open={Boolean(popupMenu)}
                        anchorEl={popupMenu}
                        onClose={popupMenuClose}
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
                            setPopMenu(null);
                            handleStatus(true, n.id);
                          }}
                          role="button"
                        >
                          <ListItemText primary="Approve" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setPopMenu(null);
                            setOpenModal(!openModal);
                            setStatusType({ type: "decline", id: n.id });
                          }}
                          role="button"
                        >
                          <ListItemText primary="Decline" />
                        </MenuItem>
                      </Popover>
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
      <DeleteModal
        open={openDeleteModal}
        handleDelete={handleDeselect}
        handleClose={() => {
          setDeleteOpenModal(!openDeleteModal);
        }}
      />
    </div>
  );
}

export default withRouter(RegistrationFeesTable);
