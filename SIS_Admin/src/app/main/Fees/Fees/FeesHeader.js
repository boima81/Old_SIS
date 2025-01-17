/* eslint-disable jsx-a11y/aria-role */
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useTheme } from "@mui/material/styles";

// import { selectProductsSearchText, setProductsSearchText } from '../store/productsSlice';

function FeesHeader({ showSearchAddButton = true, isHomePage = true }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const searchText = useSelector(selectProductsSearchText);

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight flex gap-5
        items-center"
        component={!isHomePage ? Link : motion.span}
        role={`${!isHomePage && "button"}`}
        to={`${!isHomePage && "/fees"}`}
      >
        {!isHomePage && (
          <FuseSvgIcon size={20}>
            {theme.direction === "ltr"
              ? "heroicons-outline:arrow-sm-left"
              : "heroicons-outline:arrow-sm-right"}
          </FuseSvgIcon>
        )}
        Fees
      </Typography>
      {showSearchAddButton && (
        <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

            <Input
              placeholder="Search Fees"
              className="flex flex-1"
              disableUnderline
              fullWidth
              // value={searchText}
              inputProps={{
                "aria-label": "Search",
              }}
              // onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          >
            <Button
              className=""
              component={Link}
              to="/finance/fees/add"
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          </motion.div> */}
        </div>
      )}
    </div>
  );
}

export default FeesHeader;
