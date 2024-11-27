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
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, ListItemText, MenuItem, Popover } from "@mui/material";
import { useForm } from "react-hook-form";
import DownloadButton from "app/shared-components/DownloadButton";
import { selectUser } from "app/store/userSlice";
import { authRoles } from "src/app/auth";
import DeleteModal from "app/shared-components/DeleteModal";
import BalanceFeesTableHead from "./BalanceFeesTableHead";

import BasicModal from "../../dashboards/Shared/Modal";

import {
  getBalanceFees,
  selectBalanceFees,
  updateBalanceStatus,
} from "../store/balanceFeesSlice";
import { currencyName } from "../../dashboards/Shared/utils";

function BalanceFeesTable(props) {
  const dispatch = useDispatch();
  const balances = useSelector(selectBalanceFees);
  // const searchText = useSelector(selectProductsSearchText);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popupMenu, setPopMenu] = useState(false);
  const [statusType, setStatusType] = useState(null);
  const [clickableId, setClickable] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
  function onSubmit() {
    setLoading(true);
    dispatch(
      updateBalanceStatus({
        is_approved: false,
        id: clickableId,
        type: statusType?.type,
      })
    ).then((actionData) => {
      if (actionData?.payload?.id) {
        setOpenModal(!openModal);
        setStatusType(null);
        setClickable(null);
        reset();
        dispatch(getBalanceFees())
          ?.then(() => {
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getBalanceFees({})).then(() => setLoading(false));
  }, [dispatch]);

  const defaultValues = {
    feedback: "",
  };

  const schema = yup.object().shape({
    feedback: yup.string().optional(),
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

  const user = useSelector(selectUser);

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
    setData(balances);
    // }
  }, [balances]);
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
      setSelected(data?.map((n) => n.id));
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

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no Balance Fees!
        </Typography>
      </motion.div>
    );
  }
  const handleStatus = (status, id) => {
    setLoading(true);
    dispatch(
      updateBalanceStatus({
        is_approved: status,
        id: clickableId,
        type: "approved",
      })
    ).then((actionData) => {
      if (actionData?.payload?.id) {
        setClickable(null);
      }
      dispatch(getBalanceFees({}))
        .then(() => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  console.log({ data });
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        {adminRole || financeRole ? (
          <div className="flex justify-end m-20 items-center">
            <DownloadButton
              data={data?.map((dt) => {
                return {
                  ...dt,
                  amountCSV: `${dt?.balance_pay || 0}`,
                  semester: dt?.application?.semesterId?.name || "-",
                }
              })}
              headers={[
                {
                  label: "Student Name",
                  key: "userInformation.displayName",
                },
                {
                  label: `Amount (${currencyName})`,
                  key: "amountCSV",
                },
                {
                  label: "Payment Type",
                  key: "payment_type",
                },
                {
                  label: "Semester",
                  key: "semester",
                },
                {
                  label: "Payment Status",
                  key: "balance_fees_status",
                },
              ]}
              fileName="BalanceFeesReport.csv"
            />
          </div>
        ) : null}
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <BalanceFeesTableHead
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

                    {/* <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.application?.student?.student_id || n?.id}
                    </TableCell> */}

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.userInformation?.displayName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.balance_pay} {currencyName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.payment_type}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.balance_fees_status}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n?.application?.semesterId?.name || "-"}
                    </TableCell>
                    {n?.files?.fileId?.url ? (
                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        <a
                          href={n?.files?.fileId?.url || ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Receipt File
                        </a>
                      </TableCell>
                    ) : (
                      <p className="p-4 md:p-16 truncate">-</p>
                    )}

                    {n?.balance_fees_status === "pending" && (
                      <TableCell
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
                      </TableCell>
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
      <BasicModal
        open={openModal}
        handleClose={() => {
          setOpenModal(!openModal);
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>
            <h2>Do you want to decline this Balance fee?</h2>
          </Typography>
          <Button
            className="justify-self-end w-fit	"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Yes
          </Button>
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

export default withRouter(BalanceFeesTable);
