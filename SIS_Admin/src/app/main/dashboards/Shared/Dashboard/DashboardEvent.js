import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo } from "react";

function DashboardEvent({ title, eventList }) {
  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {title}
        </Typography>
      </div>
      <List className="py-0 mt-8 divide-y">
        {eventList.map((item, index) => (
          <ListItem key={index} className="px-0">
            <ListItemText
              classes={{ root: "px-8", primary: "font-medium" }}
              primary={item.title}
              secondary={
                <span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
                  {item.time && (
                    <span className="flex items-center">
                      <FuseSvgIcon size={20} color="disabled">
                        heroicons-solid:clock
                      </FuseSvgIcon>
                      <Typography
                        component="span"
                        className="mx-6 text-md"
                        color="text.secondary"
                      >
                        {item.time}
                      </Typography>
                    </span>
                  )}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default memo(DashboardEvent);
