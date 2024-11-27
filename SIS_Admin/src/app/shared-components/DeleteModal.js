import React from "react";
import BasicModal from "../main/dashboards/Shared/Modal";
import { Button } from "@mui/material";

const DeleteModal = ({ open, handleDelete, handleClose }) => {
  return (
    <BasicModal open={open} handleClose={handleClose}>
      <div className="mb-28">Are you sure want to delete?</div>
      <div className="flex gap-10">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className="justify-self-end w-fit	"
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleDelete}
        >
          Confirm
        </Button>
      </div>
    </BasicModal>
  );
};

export default DeleteModal;
