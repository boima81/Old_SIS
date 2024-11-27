/* eslint-disable no-shadow */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Button, Grid, IconButton } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import DownloadIcon from "@mui/icons-material/Download";

const camelToSpace = (text) => {
  if (
    text === "kInUserFullName" ||
    text === "kInResidentialAddress" ||
    text === "kInRelationship"
  ) {
    return camelToSpace(text.replace("kIn", "Kin"));
  }
  const result = text?.replace(/([A-Z])/g, " $1");
  const finalResult = result?.charAt(0)?.toUpperCase() + result?.slice(1);
  return finalResult?.split?.("_")?.join(" ");
};
const handleFileOpen = () => {};

const renderData = (data) => {
  return Object.entries(data).map(([key, value]) => {
    if (key === "transcript") {
      return value?.map((transcript) => renderData(transcript));
    }

    return (
      <ListItem key={1} className="px-0">
        <ListItemText
          classes={{ root: "px-8", primary: "font-medium" }}
          primary={
            <div className="flex gap-14">
              {camelToSpace(key)}
              {(key === "resume_uploadResume" ||
                key === "goal_uploadGoal" ||
                key === "transcript_uploadTranscript") &&
                value?.url && (
                  <IconButton
                    onClick={() => {
                      window.open(
                        value?.url,
                        "_blank"
                        // "toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0"
                      );
                      window.focus();
                    }}
                  >
                    <DownloadIcon className="cursor-pointer" />
                  </IconButton>
                )}
            </div>
          }
          secondary={
            <span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
              {key === "profilePicture" ? (
                <img
                  alt="profile"
                  className="md:mx-4"
                  // alt="user photo"
                  height="100px"
                  width="100px"
                  src={value || "assets/images/avatars/profile.png"}
                />
              ) : (
                <span className="flex items-center">
                  <FuseSvgIcon size={20} color="disabled">
                    heroicons-solid:clock
                  </FuseSvgIcon>
                  <Typography
                    component="span"
                    className="mx-6 text-md"
                    color="text.secondary"
                  >
                    {key === "goal_goalStatement"
                      ? ReactHtmlParser(value)
                      : value?.name || value}
                  </Typography>
                </span>
              )}
            </span>
          }
        />
      </ListItem>
    );
  });
};

function ReviewWidgetAdmin({ data, handleEdit, showEditButton = true }) {
  return (
    <>
      <Grid container spacing={2}>
        {data?.map((data) => {
          return (
            <Grid item xs={6}>
              <Paper
                key={data.id}
                className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full"
                style={{ height: "300px", overflow: "auto" }}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <Typography className="text-lg font-bold tracking-tight leading-6 truncate">
                    {camelToSpace(data.heading)}
                  </Typography>
                  <div className="mt-12 sm:mt-0 sm:ml-8">
                    {/* <Tabs
            value={0}
            // onChange={(ev, value) => setTabValue(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="-mx-16 min-h-40"
            classes={{
              indicator: "flex justify-center bg-transparent w-full h-full",
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: "text.disabled" }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              key={0}
              label={"Edit"}
            />
          </Tabs> */}
                    {showEditButton && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
                <List className="py-0 mt-8 divide-y">
                  {data?.data?.map((data) => renderData(data))}
                </List>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default memo(ReviewWidgetAdmin);
