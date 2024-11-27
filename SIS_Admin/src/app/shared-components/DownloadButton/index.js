import { Button } from "@mui/material";
import React, { useRef } from "react";
import { CSVLink } from "react-csv";

function DownloadButton({
  data,
  headers,
  fileName,
  buttonText = "Download CSV",
}) {
  const csvLink = useRef();
  const onClick = () => {
    csvLink.current.link.click();
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={onClick}>
        {buttonText}
      </Button>
      <CSVLink
        target="_blank"
        data={data}
        headers={headers}
        filename={fileName}
        className="hidden"
        ref={csvLink}
      >
        {buttonText}
      </CSVLink>
    </>
  );
}

export default DownloadButton;
