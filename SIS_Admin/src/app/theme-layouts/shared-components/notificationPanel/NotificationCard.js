import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router-dom";

function NotificationCard(props) {
  const { item, className } = props;
  const variant = item?.variant || "";
  const navigate = useNavigate();
  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (props.onClose) {
      props.onClose(item.id);
    }
  };

  const handleRedirectUrl = ({ notificationKey, roleName }) => {
    if (roleName === "student") {
      if (
        notificationKey === "application_approved" ||
        notificationKey === "application_feedback" ||
        notificationKey === "application_fee_approve" ||
        notificationKey === "application_fees" ||
        notificationKey === "application_approval"
      ) {
        return "/application";
      }
      if (
        notificationKey === "registration_complete" ||
        notificationKey === "registration_approval" ||
        notificationKey === "registration_fees"
      ) {
        return "/register";
      }
      return "";
    }
    if (
      notificationKey === "application_approved" ||
      notificationKey === "application_feedback" ||
      notificationKey === "application_approval"
    ) {
      return "/admission/application";
    }

    if (
      notificationKey === "application_fee_approve" ||
      notificationKey === "application_fees"
    ) {
      return "/finance/application-fees";
    }
    if (
      notificationKey === "registration_fees" ||
      notificationKey === "registration_approval" ||
      notificationKey === "registration_complete"
    ) {
      return "/admission/registration";
    }
    return "";
  };
  return (
    <Card
      className={clsx(
        "flex items-center relative w-full rounded-16 p-20 min-h-64 shadow space-x-8",
        variant === "success" && "bg-green-600 text-white",
        variant === "info" && "bg-blue-700 text-white",
        variant === "error" && "bg-red-600 text-white",
        variant === "warning" && "bg-orange-600 text-white",
        className
      )}
      elevation={0}
      // handleRedirectUrl(item) ? NavLinkAdapter :
      component="div"
      // to={handleRedirectUrl(item) || ""}
      role={handleRedirectUrl(item) && "button"}
      onClick={(e) => {
        navigate(handleRedirectUrl(item));
        handleClose(e);
      }}
    >
      {item.icon && !item.image && (
        <Box
          sx={{ backgroundColor: "background.default" }}
          className="flex shrink-0 items-center justify-center w-32 h-32 mr-12 rounded-full"
        >
          <FuseSvgIcon className="opacity-75" color="inherit">
            {item.icon}
          </FuseSvgIcon>
        </Box>
      )}

      {item.image && (
        <img
          className="shrink-0 w-32 h-32 mr-12 rounded-full overflow-hidden object-cover object-center"
          src={item.image}
          alt="Notification"
        />
      )}

      <div className="flex flex-col flex-auto">
        {item.title && (
          <Typography className="font-semibold line-clamp-1">
            {item.title}
          </Typography>
        )}

        {item.message && (
          <div
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: item.message }}
          />
        )}

        {item.createdAt && (
          <Typography
            className="mt-8 text-sm leading-none "
            color="text.secondary"
          >
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </Typography>
        )}
      </div>

      <IconButton
        disableRipple
        className="top-0 right-0 absolute p-8"
        color="inherit"
        size="small"
        onClick={handleClose}
      >
        <FuseSvgIcon size={12} className="opacity-75" color="inherit">
          heroicons-solid:x
        </FuseSvgIcon>
      </IconButton>
      {item.children}
    </Card>
  );
}

export default NotificationCard;