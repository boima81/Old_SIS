import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";

function DashboardAnnouncement({ title, announcementList }) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {title}
        </Typography>
      </div>
      <List className="py-0 mt-12 divide-y">
        {announcementList.map((item, index) => (
          <Accordion
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary>
              <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="font-medium tracking-tight">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Paper>
  );
}

export default memo(DashboardAnnouncement);
