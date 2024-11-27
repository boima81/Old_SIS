import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo } from "react";

function ScheduleWidget({ data, handleEdit }) {
  return (
    <Paper
      className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full"
      style={{ height: "300px", overflow: "auto" }}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {data.heading}
        </Typography>
        <div className="mt-12 sm:mt-0 sm:ml-8">
          s
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      </div>
      <List className="py-0 mt-8 divide-y">
        {data.data.map((data) => (
          <ListItem key={1} className="px-0">
            {Object.entries(data).map(([key, value]) => {
              return (
                <ListItemText
                  classes={{ root: "px-8", primary: "font-medium" }}
                  primary={key}
                  secondary={
                    <span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
                      <span className="flex items-center">
                        <FuseSvgIcon size={20} color="disabled">
                          heroicons-solid:clock
                        </FuseSvgIcon>
                        <Typography
                          component="span"
                          className="mx-6 text-md"
                          color="text.secondary"
                        >
                          {value}
                        </Typography>
                      </span>
                    </span>
                  }
                />
              );
            })}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default memo(ScheduleWidget);
