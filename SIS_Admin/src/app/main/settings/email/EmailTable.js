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

import { Button } from "@mui/material";
import EmailTableHead from "./EmailTableHead";
import { getEmails, getEmailsData } from "../store/emailsSlice";
// import {
//   getRegistrationFees,
//   selectRegistrationFees,
//   updateRegistrationFees,
// } from "../../Finance/store/feesSlice";

function EmailTable(props) {
  const dispatch = useDispatch();
  const emailSettingsData = useSelector(getEmailsData);
  console.log({ emailSettingsData });
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

  useEffect(() => {
    setLoading(true);
    dispatch(getEmails()).then((action) => {
      console.log({ action });
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(emailSettingsData
    //     // _.filter(emailSettingsData, (item) =>
    //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
    //     // )
    //   );
    //   setPage(0);
    // } else {
    setData(emailSettingsData);
    // }
  }, [emailSettingsData]);
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
  }

  function handleClick(item) {
    props.navigate(`/settings/email/${item.id}`);
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
          There are no Emails Settings!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <EmailTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data?.length}
            onMenuItemClick={handleDeselect}
          />
          {console.log("data------>>>>>>", data)}
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
                      onClick={() => handleClick(n)}
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
                      >
                        {n?.title}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {n?.subject}
                      </TableCell>

                      <TableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        {n?.updated_by?.email}
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
    </div>
  );
}

export default withRouter(EmailTable);
