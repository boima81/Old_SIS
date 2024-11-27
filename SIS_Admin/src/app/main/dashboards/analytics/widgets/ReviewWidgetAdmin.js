/* eslint-disable no-shadow */
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { IconButton } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector } from "react-redux";
import { selectCourse } from "app/store/courseSlice";
import TableHeader from "../../Shared/TableHeader";
import TableWidget from "../../student/widgets/TableWidget";
import { addDollar, apiToValues } from "../../Shared/utils";

const camelToSpace = (text) => {
  const result = text?.replace(/([A-Z])/g, " $1");
  const finalResult = result?.charAt(0)?.toUpperCase() + result?.slice(1);
  return finalResult?.split?.("_")?.join(" ");
};
const handleFileOpen = () => {};
const tableData = {
  columns: [
    "Course code",
    "Course No.",
    "Course",
    "Category",
    "Credit",
    "Section",
    "Schedule",
    "Time",
    "Classroom",
    "Instructor",
    "Fees Per Credit",
    "Course Fees",
  ],
};

function ReviewWidgetAdmin({ data, handleEdit, showEditButton = true }) {
  const [showRows, setShowRows] = useState([]);
  const course = useSelector(selectCourse);
  const courses = course?.courses;
  const paymentTerms = course?.paymentTerms;
  console.log({ courses });
  function showData() {
    // let extraFees = 10;
    // let productFees = 10;
    // let finalTotal = 0 + extraFees;

    let newTableData = [];
    const newExtraFees = course?.allFees?.registrationFees?.map(
      (registerFee) => ({
        id: "",
        courseNo: "",
        course: "",
        category: "",
        credit: "",
        section: "",
        schedule: "",
        time: "",
        classroom: "",
        instructor: "",
        creditFees: registerFee?.name,
        extraFees: addDollar(registerFee?.amount),
        // creditFees: registerFee?.name,
        // extraFees: addDollar(registerFee?.amount),
      })
    );
    const tableApiValues = apiToValues(
      courses,
      data?.courses?.map((courseData) => courseData?.id) || [],
      course?.allFees?.courseFee?.amount,
      newExtraFees
    );
    newTableData = tableApiValues?.data || [];
    newExtraFees?.forEach((data) => {
      newTableData.push(data);
    });
    const payNowAmount = (
      tableApiValues?.total_without_dollar / (data?.invoiceId?.totalTerms || 1)
    ).toFixed(2);
    newTableData.push({
      id: "",
      courseNo: "",
      course: "",
      category: "",
      credit: "",
      section: "",
      schedule: "",
      time: "",
      classroom: "",
      instructor: "",
      creditFees: (
        <Typography style={{ fontWeight: "bolder" }}>Total</Typography>
      ),
      total_amount: tableApiValues?.total,
      // creditFees: (
      //   <Typography style={{ fontWeight: "bolder" }}>Total</Typography>
      // ),
      // total_amount: tableApiValues?.total,
    });
    newTableData.push({
      id: "",
      courseNo: "",
      course: "",
      category: "",
      credit: "",
      section: "",
      schedule: "",
      time: "",
      classroom: "",
      instructor: "",
      creditFees: (
        <Typography style={{ fontWeight: "bolder" }}>Payment Terms</Typography>
      ),
      total_amount: (data?.invoiceId?.totalTerms || 1) <= 1 ? "Full" : "Split",
    });
    newTableData.push({
      id: "",
      courseNo: "",
      course: "",
      category: "",
      credit: "",
      section: "",
      schedule: "",
      time: "",
      classroom: "",
      instructor: "",
      creditFees: (
        <Typography style={{ fontWeight: "bolder" }}>Paid</Typography>
      ),
      total_amount: data?.invoiceId?.amount_paid,
    });
    setShowRows(newTableData);
  }
  useEffect(() => {
    showData();
  }, [courses, data?.courses, data?.invoiceId?.totalTerms]);
  return (
    <div className="space-y-32" id="download-pdf">
      <TableHeader
        studentId={data?.student?.student_id}
        studentName={data?.userData?.userInformationId?.displayName}
        program={data?.programId?.name}
        semester={data?.semesterId?.name}
        date={data?.invoiceId?.createdAt}
      />
      <h1 className="text-center font-bold	uppercase">Billing</h1>
      <div>
        <TableWidget columns={tableData.columns} rows={showRows} />
      </div>
    </div>
  );
}

export default memo(ReviewWidgetAdmin);
