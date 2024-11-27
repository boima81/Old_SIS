import { Grid } from "@mui/material";
import React from "react";
import ReviewWidget from "../widgets/ReviewWidget";

export default function Step7({ fieldData, control }) {
  return (
    <>
      <Grid container spacing={2}>
        {fieldData?.map((data) => {
          return (
            <Grid item xs={6}>
              <ReviewWidget
                data={data}
                handleEdit={() => {
                  data.setEdit({ ...data, setEdit: data.id });
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
