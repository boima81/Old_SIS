import { lighten } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { removeProducts } from '../store/productsSlice';

function CourseTableHead(props) {
  const { selectedProductIds } = props;
  const numSelected = selectedProductIds.length;

  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }
  const rows = [
    {
      id: "courseCode",
      align: "left",
      disablePadding: false,
      label: "Course code",
      sort: true,
    },
    {
      id: "courseNo",
      align: "left",
      disablePadding: false,
      label: "Course No.",
      sort: true,
    },
    {
      id: "course",
      align: "left",
      disablePadding: false,
      label: "Course",
      sort: true,
    },
    {
      id: "category",
      align: "left",
      disablePadding: false,
      label: "Category",
      sort: true,
    },
    {
      id: "credit",
      align: "left",
      disablePadding: false,
      label: "Credit",
      sort: true,
    },
    {
      id: "section",
      align: "left",
      disablePadding: false,
      label: "Section",
      sort: true,
    },
    {
      id: "schedule",
      align: "left",
      disablePadding: false,
      label: "Schedule",
      sort: true,
    },
    {
      id: "time",
      align: "left",
      disablePadding: false,
      label: "Time",
      sort: true,
    },
    {
      id: "classroom",
      align: "left",
      disablePadding: false,
      label: "Classroom",
      sort: true,
    },
    {
      id: "instructor",
      align: "left",
      disablePadding: false,
      label: "Instructor",
      sort: true,
    },
    {
      id: "feesPerCredit",
      align: "left",
      disablePadding: false,
      label: "Fees Per Credit",
      sort: true,
    },
    {
      id: "courseFees",
      align: "left",
      disablePadding: false,
      label: "Course Fees",
      sort: true,
    },
  ];

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          {/* <Checkbox
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
                aria-owns={selectedProductsMenu ? "selectedProductsMenu" : null}
                aria-haspopup="true"
                onClick={openSelectedProductsMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedProductsMenu"
                anchorEl={selectedProductsMenu}
                open={Boolean(selectedProductsMenu)}
                onClose={closeSelectedProductsMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      // dispatch(removeProducts(selectedProductIds));
                      props.onMenuItemClick();
                      closeSelectedProductsMenu();
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
          )} */}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4"
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

export default CourseTableHead;
