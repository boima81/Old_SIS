import { Grid } from "@mui/material";
import ReviewWidget from "../../analytics/widgets/ReviewWidget";

export default function Step7({ fieldData, handleSetValue }) {
  return (
    <>
      <Grid container spacing={2}>
        {fieldData?.map((data) => {
          return !data?.hide ? (
            <Grid item xs={6}>
              <ReviewWidget
                data={data}
                handleEdit={() => {
                  handleSetValue(data.id, data?.data || {});
                  data.setEdit({ ...data, setEdit: data.id });
                }}
              />
            </Grid>
          ) : null;
        })}
      </Grid>
    </>
  );
}
