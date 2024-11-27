import { selectCourse } from "app/store/courseSlice";
import { selectUser } from "app/store/userSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { jsPDF as JSPDF } from "jspdf";
import * as htmlToImage from "html-to-image";

import { addDollar, apiToValues } from "../../Shared/utils";
import TableWidget from "../../student/widgets/TableWidget";
import TableHeader from "../../Shared/TableHeader";
// import TableWidget from "../widgets/TableWidget";

export default function Step3({ fieldData, control, values, setValue }) {
  const course = useSelector(selectCourse);
  const user = useSelector(selectUser);
  const courses = course?.courses;
  const [showRows, setShowRows] = useState([]);
  const tableData = {
    // columns: ["No", "Course", "Credit", "Fees per credit", "Total Fees"],
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
  function showData() {
    // let extraFees = 10;
    // let productFees = 10;
    // let finalTotal = 0 + extraFees;

    let newTableData = [];
    // const newExtraFees = course?.allFees?.registrationFees?.map(
    const newExtraFees = course?.allFees?.registrationFees?.map(
      (registerFee) => ({
        courseCode: "",
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
      values?.courses,
      course?.allFees?.courseFee?.amount,
      newExtraFees
    );
    newTableData = tableApiValues?.data || [];
    newExtraFees?.forEach((data) => {
      newTableData.push(data);
    });
    newTableData.push({
      courseCode: "",
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
    setShowRows(newTableData);
    setValue("total_amount", tableApiValues?.total_without_dollar);
  }
  useEffect(() => {
    showData();
  }, [courses, values?.courses]);
  const downloadToPdf = () => {
    htmlToImage
      .toPng(document.getElementById("student-review"), {
        quality: 0.95,
        // canvasWidth: "800",
        // canvasHeight: "800",
        // skipAutoScale: true,
      })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        const pdf = new JSPDF({
          orientation: "landscape",
          unit: "px",
          format: "a3",
        });
        pdf.addImage(dataUrl, "PNG", 0, 0);
        pdf.save("Receipt.pdf");
      });
    // html2canvas(document.querySelector("#student-review")).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new JSPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   // pdf.output('dataurlnewwindow');
    //   pdf.save("Receipt.pdf");
    //   // document.body.appendChild(canvas);
    // });
  };
  return (
    <>
      <div
        className="space-y-32"
        id="student-review"
        style={{ paddingLeft: "10px" }}
      >
        <TableHeader
          studentId={user?.data?.student?.student_id}
          studentName={user?.data?.displayName}
          program={values?.program_name}
          semester={values?.semester_name}
        />
        <h1 className="text-center font-bold	uppercase">Grade Sheet</h1>

        <div>
          <TableWidget columns={tableData.columns} rows={showRows} />
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        className="mt-16"
        onClick={downloadToPdf}
      >
        Download PDF
      </Button>
    </>
  );
}
