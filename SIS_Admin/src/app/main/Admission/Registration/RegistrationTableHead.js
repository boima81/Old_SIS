import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
// import { removeRegistration } from '../store/RegistrationSlice';

function RegistrationTableHead(props) {
  const { selectedProductIds } = props;
  const numSelected = selectedProductIds.length;

  const [selectedRegistrationMenu, setSelectedRegistrationMenu] =
    useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedRegistrationMenu(event) {
    setSelectedRegistrationMenu(event.currentTarget);
  }

  function closeSelectedRegistrationMenu() {
    setSelectedRegistrationMenu(null);
  }
  const rows = [
    // {
    //   id: 'image',
    //   align: 'left',
    //   disablePadding: true,
    //   label: '',
    //   sort: false,
    // },
    {
      id: "id",
      align: "left",
      disablePadding: false,
      label: "Student Id",
      sort: true,
    },
    {
      id: "first_name",
      align: "left",
      disablePadding: false,
      label: "Student Name",
      sort: true,
    },
    {
      id: "name",
      align: "left",
      disablePadding: false,
      label: "Registration Program",
      sort: true,
    },
    {
      id: "registration_semester",
      align: "left",
      disablePadding: false,
      label: "Registration Semester",
      sort: true,
    },
    {
      id: "status",
      align: "left",
      disablePadding: false,
      label: "Registration Status",
      sort: true,
    },
    {
      id: "active",
      align: "left",
      disablePadding: false,
      label: "Active",
      sort: true,
    },
  ];

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {/* <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedRegistrationMenu ? "selectedRegistrationMenu" : null}
                aria-haspopup="true"
                onClick={openSelectedRegistrationMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedRegistrationMenu"
                anchorEl={selectedRegistrationMenu}
                open={Boolean(selectedRegistrationMenu)}
                onClose={closeSelectedRegistrationMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      // dispatch(removeRegistration(selectedProductIds));
                      props.onMenuItemClick();
                      closeSelectedRegistrationMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell> */}
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default RegistrationTableHead;