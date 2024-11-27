import moment from "moment";
import { useSelector } from "react-redux";
import { selectApplicationSetting } from "../../settings/store/applicationSettingSlice";

const TableHeader = ({
  studentId,
  studentName,
  program,
  semester,
  date,
  phone_number,
}) => {
  const applicationSetting = useSelector(selectApplicationSetting);
  const logo = applicationSetting?.logo?.url || "";
  return (
    <div className="mt-16 space-y-32">
      <div className="flex justify-center">
        <img
          className="w-15 h-15"
          src={logo}
          alt="logo"
          width="100px"
          height="100px"
        />
      </div>
      <div className="flex justify-between">
        <div className="content-box">
          <h3>Student ID: {studentId}</h3>
          <h3>Student Name : {studentName}</h3>
          <h3>Program: {program}</h3>
          {semester && <h3>Semester: {semester}</h3>}
          {phone_number && <h3>Semester: {phone_number}</h3>}
        </div>
        <div className="text-right">
          <h3>{moment(date).format("MMM Do YYYY")}</h3>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
