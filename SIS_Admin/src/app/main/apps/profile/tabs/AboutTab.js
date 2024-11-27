import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { selectUser } from "app/store/userSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { countryCity, dateFormate } from "src/app/main/dashboards/Shared/utils";

function AboutTab() {
  const test = (x) => x + 1;
  const user = useSelector(selectUser);
  const userInformationId = user?.userInformationId;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                General Information
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Gender
                </Typography>
                <Typography>{userInformationId?.gender}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Birthday
                </Typography>
                <Typography>
                  {userInformationId?.date_of_birth
                    ? dateFormate(userInformationId?.date_of_birth)
                    : ""}
                </Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Locations
                </Typography>

                <div className="flex items-center">
                  <FuseSvgIcon className="mx-4" size={16} color="action">
                    heroicons-outline:location-marker
                  </FuseSvgIcon>
                  <Typography>
                    {countryCity(
                      userInformationId?.country,
                      userInformationId?.city
                    )}
                  </Typography>
                </div>
              </div>

              {/* <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  About Me
                </Typography>
                <Typography>{general.about}</Typography>
              </div> */}
            </CardContent>
          </Card>

          {/* <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                Work
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Occupation
                </Typography>
                <Typography>{work.occupation}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Skills
                </Typography>
                <Typography>{work.skills}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Jobs
                </Typography>
                <table className="">
                  <tbody>
                    {work.jobs.map((job) => (
                      <tr key={job.company}>
                        <td>
                          <Typography>{job.company}</Typography>
                        </td>
                        <td className="px-16">
                          <Typography color="text.secondary">
                            {job.date}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card> */}

          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                Contact
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              {/* <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Address
                </Typography>
                <Typography>{contact.address}</Typography>
              </div> */}

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Tel.
                </Typography>

                <div className="flex items-center">
                  <Typography>{`${userInformationId?.phone_number}`}</Typography>
                </div>
              </div>

              {/* <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Website
                </Typography>

                {contact.websites.map((website) => (
                  <div className="flex items-center" key={website}>
                    <Typography>{website}</Typography>
                  </div>
                ))}
              </div> */}

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Emails
                </Typography>

                <div className="flex items-center">
                  <Typography>{user?.email}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* <div className="flex flex-col md:w-320">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="flex items-center px-32 pt-24">
              <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                Friends
              </Typography>

              <Button className="-mx-8" size="small">
                See 454 more
              </Button>
            </div>

            <CardContent className="flex flex-wrap px-32">
              {friends.map((friend) => (
                <Avatar
                  key={friend.id}
                  className="w-64 h-64 rounded-12 m-4"
                  src={friend.avatar}
                  alt={friend.name}
                />
              ))}
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <div className="px-32 pt-24 flex items-center">
              <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                Joined Groups
              </Typography>
              <div className="-mx-8">
                <Button color="inherit" size="small">
                  See 6 more
                </Button>
              </div>
            </div>
            <CardContent className="px-32">
              <List className="p-0">
                {groups.map((group) => (
                  <ListItem key={group.id} className="px-0 space-x-8">
                    <Avatar className="" alt={group.name}>
                      {group.name[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <div className="flex">
                          <Typography
                            className="font-medium"
                            color="secondary.main"
                            paragraph={false}
                          >
                            {group.name}
                          </Typography>

                          <Typography className="mx-4 font-normal" paragraph={false}>
                            {group.category}
                          </Typography>
                        </div>
                      }
                      secondary={group.members}
                    />
                    <ListItemSecondaryAction>
                      <IconButton size="large">
                        <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </motion.div>
  );
}

export default AboutTab;
