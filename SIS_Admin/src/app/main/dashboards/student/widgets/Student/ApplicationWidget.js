import { Button, Paper } from "@mui/material";
const ApplicationWidget = () => {
  const ActionButton = ({ handleClick, title }) => {
    return (
      <Button onClick={handleClick} variant="contained" size={"small"}>
        {title}
      </Button>
    );
  };
  const studentColumn = ["Id", "Name", "Gender", "Class", "Action"];
  const studentRow = [
    {
      iD: 1,
      name: "Senpai",
      gender: "female",
      class: 32,
      button: <ActionButton title={"Edit"} handleClick={() => {}} />,
    },
    {
      id: 2,
      name: "Yui Rio",
      gender: "male",
      class: 31,
      button: <ActionButton title={"Edit"} handleClick={() => {}} />,
    },
  ];
  return (
    <>
      <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
        {/* <div className="flex justify-end mb-12">
          <Button onClick={() => {}} variant="contained" color="primary">
            Add new
          </Button>
        </div>
        <Table
          columns={studentColumn}
          rows={studentRow}
          heading="Students"
          subHeading={"List of all students"}
        /> */}
        <div className="mx-auto">
          <h1>Under process</h1>
        </div>
      </Paper>
    </>
  );
};

export default ApplicationWidget;
