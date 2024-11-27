import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardCommonCard = ({
  totalNumber,
  title,
  color,
  text,
  path = "",
}) => {
  const navigate = useNavigate();
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl h-full overflow-hidden">
      <div className="flex items-center justify-between px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          {title}
        </Typography>
      </div>
      <div className="text-center m-40">
        {path !== "" || text ? (
          <Typography
            className={`text-3xl sm:text-xl font-bold tracking-tight mt-12 leading-none cursor-pointer text-${color}-500`}
            onClick={() => {
              if (path) {
                navigate(path);
              }
            }}
          >
            {text}
          </Typography>
        ) : (
          <Typography
            className={`text-7xl sm:text-8xl font-bold tracking-tight leading-none text-${color}-500`}
          >
            {totalNumber}
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default DashboardCommonCard;
