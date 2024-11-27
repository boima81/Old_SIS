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
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";

import { Button } from "@mui/material";
import { getApplication } from "app/store/applicationSlice";
import { selectUser } from "app/store/userSlice";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import axios from "axios";
import TranscriptTableHead from "./TranscriptTableHead";
import { dateFormate, toaster } from "../../dashboards/Shared/utils";
// import {
//   selectApplications,
//   updateApplicationStatus,
// } from "../store/feesSlice";
const BackendUrl = process.env.REACT_APP_BACKEND_URL;
const defaultTranscriptData = [
  {
    id: 1,
    fileName: "test1",
    fileType: "pdf",
  },
  { id: 2, fileName: "test2", fileType: "doc" },
  {
    id: 3,
    fileName: "test3",
    fileType: "xml",
  },
];
function TranscriptTable({ data, ...props }) {
  const dispatch = useDispatch();
  // const applications = useSelector(selectApplications);
  // const searchText = useSelector(selectProductsSearchText);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  // const [data, setData] = useState(defaultTranscriptData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const user = useSelector(selectUser);

  // const applicationData = applications;

  // const applicationId = user?.applicationId?.id;

  // useEffect(() => {
  //   dispatch(getApplication(applicationId));
  // }, [applicationId]);


  // useEffect(() => {
  //   // if (searchText.length !== 0) {
  //   //   setData(applications
  //   //     // _.filter(applications, (item) =>
  //   //     //   item.name.toLowerCase().includes(searchText.toLowerCase())
  //   //     // )
  //   //   );
  //   //   setPage(0);
  //   // } else {
  //   // setData(applications);
  //   // }
  // }, [applications]);
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
          There are no transcript!
        </Typography>
      </motion.div>
    );
  }
  // const handleStatus = (status, id) => {
  //   dispatch(
  //     updateApplicationStatus({
  //       is_approve: status,
  //       id,
  //     })
  //   );
  // };
  // if (!applicationData?.is_completed) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         Application needs to be submitted and approved before you can register
  //       </Typography>
  //       <Button
  //         className="mt-24"
  //         component={Link}
  //         variant="outlined"
  //         to="/application"
  //         color="inherit"
  //       >
  //         Go to Application Page
  //       </Button>
  //     </motion.div>
  //   );
  // }
  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TranscriptTableHead
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
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >

                      <a
                        href={`${BackendUrl}${n?.file_link}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {n?.file_link?.split("/")?.at(-1)}
                      </a>
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {dateFormate(n?.createdAt)}
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
    </div>
  );
}

export default withRouter(TranscriptTable);
