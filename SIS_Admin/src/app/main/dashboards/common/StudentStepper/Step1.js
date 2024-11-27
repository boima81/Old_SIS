import { Button, Typography } from "@mui/material";
import { selectCourse } from "app/store/courseSlice";
import { selectUser } from "app/store/userSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";
import { jsPDF as JSPDF } from "jspdf";
import MainSelect from "../../Shared/Select";
import TableWidget from "../../student/widgets/TableWidget";
import TableHeader from "../../Shared/TableHeader";
import { addDollar, apiToValues } from "../../Shared/utils";

export default function Step1({
  fieldData,
  control,
  values,
  setValue,
  registrationData,
}) {
  const course = useSelector(selectCourse);
  const user = useSelector(selectUser);
  const courses = course?.courses;
  const paymentTerms = course?.paymentTerms;
  const [showRows, setShowRows] = useState([]);
  // const showRows = [
  //   {
  //     courseCode: 1,
  //     courseNo: 101,
  //     course: "Course name",
  //     category: "Course category",
  //     credit: 5,
  //     section: 12,
  //     schedule: "M/W/F",
  //     time: "10 AM - 10:30 An",
  //     classroom: "A12",
  //     instructor: "Course instructor",
  //     feesPerCredit: "5",
  //     courseFees: "$50",
  //   },
  // ];
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
  console.log({ values, registrationData });
  const downloadToPdf = () => {
    htmlToImage
      .toPng(document.getElementById("download-pdf"), {
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
          unit: "mm",
          format: "a4",
        });
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
        pdf.save("Billing.pdf");
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
      values?.courses,
      course?.allFees?.courseFee?.amount,
      newExtraFees
    );
    newTableData = tableApiValues?.data || [];
    newExtraFees?.forEach((data) => {
      newTableData.push(data);
    });
    const payNowAmount = (
      tableApiValues?.total_without_dollar / (values?.totalTerms || 1)
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
      total_amount: (values?.totalTerms || 1) <= 1 ? "Full" : "Split",
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
        <Typography style={{ fontWeight: "bolder" }}>Pay Now</Typography>
      ),
      total_amount: payNowAmount,
      // creditFees: (
      //   <Typography style={{ fontWeight: "bolder" }}>Total</Typography>
      // ),
      // total_amount: tableApiValues?.total,
    });
    setShowRows(newTableData);
    setValue("payNow", payNowAmount);

    setValue("total_amount", tableApiValues?.total_without_dollar);
  }
  useEffect(() => {
    showData();
  }, [courses, values?.courses, values?.totalTerms]);
  return (
    <div className="space-y-32">
      <div id="download-pdf">
        <TableHeader
          studentId={
            registrationData?.student?.student_id ||
            user?.data?.student?.student_id
          }
          studentName={
            registrationData?.userData?.userInformationId?.displayName ||
            user?.data?.displayName
          }
          program={registrationData?.programId?.name || values?.program_name}
          semester={registrationData?.semesterId?.name || values?.semester_name}
        />
        <h1 className="text-center font-bold	uppercase">Billing</h1>
        <div>
          <TableWidget columns={tableData.columns} rows={showRows} />
        </div>
      </div>
      <div
        className="flex justify-between items-center"
        style={{ marginTop: "4px" }}
      >
        <div>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={downloadToPdf}
          >
            Download PDF
          </Button>
        </div>
        <div className="w-1/6">
          <MainSelect
            data={{
              value: values?.paymentTerm || 1,
              onChange: (e, extra) => {
                console.log({ extra });
                setValue("paymentTerm", extra?.props?.id);
                setValue("totalTerms", extra?.props?.term);
              },
            }}
            label="Payment Terms"
            options={paymentTerms?.map((pt) => ({
              id: pt?.id,
              value: pt?.id,
              label: pt?.termName,
              term: pt?.term,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
