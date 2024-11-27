/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import format from "date-fns/format";
import { useEffect, useRef, useState, memo } from "react";
import MainTextField from "../TextField";

function ReactTable({ columns, rows, subHeading, heading, handleChange = () => { } }) {
  const [inputValue, setInputValue] = useState();
  const [showInput, setShowInput] = useState(false);
  const [id, setId] = useState(0);
  const inputRef = useRef(null);

  const toggleInput = (key, value, index) => {
    console.log("value", value);
    if (id == index) {
      setShowInput(true);
      setInputValue(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden w-full">
      {/* {heading !== "" ||
        (subHeading !== "" && (
          <div className="">
          </div>
        ))} */}
      {heading != "" || subHeading != "" ? (
        <>
          <Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
            {heading}
          </Typography>
          <Typography className="font-medium" color="text.secondary">
            {subHeading}
          </Typography>
        </>
      ) : (
        ""
      )}

      <div className={`table-responsive ${heading != "" || (subHeading != "" && "mt-24")}`}>
        <Table className="simple w-full min-w-full">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography
                    color="text.secondary"
                    className={`${column.toLowerCase() == "total" ? "font-bold" : "font-semibold"
                      } text-12 whitespace-nowrap text-center`}
                  >
                    {column}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value]) => {
                  switch (key.toLowerCase()) {
                    case "id": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="" color="text.secondary">
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "name": {
                      return (
                        <TableCell key={key} style={{ width: "auto" }} component="th" scope="row">
                          <Typography className="">{value}</Typography>
                        </TableCell>
                      );
                    }
                    case "total_amount": {
                      return (
                        <TableCell key={key} style={{ width: "auto" }} component="th" scope="row">
                          <Typography className="" style={{ fontWeight: "bolder" }}>
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "date": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="text-center">
                            {format(new Date(value), "MMM dd, y")}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "amount": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="text-center">
                            {value.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "gradenumber": {
                      return (
                        <TableCell
                          className="text-center"
                          key={key}
                          component="th"
                          scope="row"
                          style={{
                            border: showInput && id == index ? "none" : "1px solid black"
                          }}
                          width="10%"
                          onClick={() => {
                            setId(index);
                            toggleInput(key, value, index);
                            console.log("click");
                          }}
                        >
                          {showInput && id == index ? (
                            <>
                              <div ref={inputRef}>
                                <MainTextField
                                  type="text"
                                  data={{
                                    min: 0,
                                    max: 100,
                                    value: inputValue,
                                    onChange: (e, extra) => {
                                      if (
                                        !isNaN(e.target.value) &&
                                        e.target.value >= 0 &&
                                        e.target.value <= 100
                                      ) {
                                        setInputValue(e.target.value);
                                        if (e.target?.value?.trim()) {
                                          handleChange({
                                            gradeNumber: e.target.value,
                                            index,
                                          });
                                        }
                                      } else {
                                        setInputValue(inputValue);
                                        // handleChange({
                                        //   gradeNumber: e.target.value,
                                        //   index
                                        // })
                                      }
                                    },
                                    onBlur: (event) => {
                                      console.log("out");
                                      setShowInput(false);
                                    },
                                    autoFocus: true,
                                  }}
                                />
                                {/* <input type="text"  /> */}
                              </div>
                            </>
                          ) : (
                            <Typography className="">{value}</Typography>
                          )}
                        </TableCell>
                      );
                    }
                    case "status": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography
                            className={clsx(
                              "inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase",
                              value === "pending" &&
                              "bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50",
                              value === "completed" &&
                              "bg-green-50 text-green-800 dark:bg-green-600 dark:text-green-50"
                            )}
                          >
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    default: {
                      return (
                        <TableCell
                          style={{ textAlign: "center" }}
                          key={key}
                          component="th"
                          scope="row"
                        >
                          <Typography>{value}</Typography>
                        </TableCell>
                      );
                    }
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className="pt-24">
          <Button variant="outlined">See all transactions</Button>
        </div> */}
      </div>
    </Paper>
  );
}

export default memo(ReactTable);
