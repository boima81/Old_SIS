import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { selectCourse } from "app/store/courseSlice";
import { selectUser } from "app/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addDollar,
  apiToValues,
  paymentTermsOption,
} from "src/app/main/dashboards/Shared/utils";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import TableWidget from "src/app/main/dashboards/student/widgets/TableWidget";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import BasicModal from "src/app/main/dashboards/Shared/Modal";
import { jsPDF as JSPDF } from "jspdf";

import * as htmlToImage from "html-to-image";

import MainSelect from "src/app/main/dashboards/Shared/Select";
import TableHeader from "src/app/main/dashboards/Shared/TableHeader";
import CardDetails from "./CardDetails";
import { invoicePay } from "../../store/studentSlice";
import { getStudents } from "../../store/studentsSlice";
import { selectBalanceFee } from "../../store/balanceFeeSlice";

export default function DetailsTab({
  invoiceId,
  coursesDatas,
  student,
  studentId,
  userType,
  navigate,
}) {
  const course = useSelector(selectCourse);
  const user = useSelector(selectUser);
  const balanceFee = useSelector(selectBalanceFee);
  console.log({ balanceFee });
  const courses = course?.courses;
  const paymentTerms = course?.paymentTerms;
  console.log({ paymentTerms });
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [showRows, setShowRows] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  console.log({ course, student });
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

  const defaultValues = {
    selectStudent: "",
    amountDue: "",
    balanceDue: "",
    amountPayingToday: "",
    ReceiptNumber: "",
  };

  let schema = {
    //= ==========step0===========
    validate: yup.object().shape({
      amountPayingToday: yup
        .number()
        .typeError("Amount must be a number")
        .required("Please provide plan cost."),
      // selectStudent:
      //   userType === "admin"
      //     ? yup.string().required("You must select one student")
      //     : "",
      // // amountDue: yup.number().required("Amount Due is required"),
      // amountDue: yup
      //   .date()
      //   .typeError("The value must be a date (DD/MM/YYYY)")
      //   .required("You must enter a amount due"),
      // expireDate: yup
      //   .date()
      //   .typeError("The value must be a date (MM/YYYY)")
      //   .required("You must enter a expire date"),
      // ReceiptNumber: yup.string().required("You must enter a Receipt Number"),
    }),
  };
  const defaultValue = defaultValues;
  schema = schema?.validate;

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const values = getValues();
  console.log({ values });
  const step0Data = {
    fieldName: {
      selectStudent: "selectStudent",
      amountDue: "amountDue",
      balanceDue: "balanceDue",
      amountPayingToday: "amountPayingToday",
      ReceiptNumber: "ReceiptNumber",
    },
    errorNames: {
      selectStudent: !!errors?.selectStudent,
      amountDue: !!errors?.amountDue,
      balanceDue: !!errors?.balanceDue,
      amountPayingToday: !!errors?.amountPayingToday,
      ReceiptNumber: !!errors?.ReceiptNumber,
    },
    errorMessage: {
      selectStudent: errors?.selectStudent?.message || "",
      amountDue: errors?.amountDue?.message || "",
      balanceDue: errors?.balanceDue?.message || "",
      amountPayingToday: errors?.amountPayingToday?.message || "",
      ReceiptNumber: errors?.ReceiptNumber?.message || "",
    },
  };
  function onSubmit(data) {
    dispatch(
      invoicePay({
        id: invoiceId,
        amountPaid: data?.amountPayingToday,
        receipt_number: data?.ReceiptNumber,
        paymentTerm: values?.paymentTerm || paymentTerms?.[0]?.id,
        totalTerms: values?.totalTerms,
      })
    ).then(() => {
      setOpenModal(!openModal);
      navigate("/finance/student");
    });
  }
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
      })
    );
    const tableApiValues = apiToValues(
      courses,
      coursesDatas?.map((courseData) => courseData?.id),
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
        <Typography style={{ fontWeight: "bolder" }}>Amount Paid</Typography>
      ),
      total_amount: addDollar(
        student?.registrationData?.invoiceId?.amount_paid || 0
      ),
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
        <Typography style={{ fontWeight: "bolder" }}>Balance</Typography>
      ),
      total_amount: addDollar(
          (student?.registrationData?.invoiceId?.remainingBalance || 0)
      ),
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
      total_amount: `${values?.totalTerms || 1} ${
        (values?.totalTerms || 1) <= 1 ? "Full" : "Split"
      }`,
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
    setTotalAmount(tableApiValues?.total_without_dollar || 0);
    // setValue("total_amount", tableApiValues?.total_without_dollar);
    setValue("payNow", payNowAmount);
  }
  useEffect(() => {
    dispatch(getStudents({}));
  }, []);
  useEffect(() => {
    showData();
  }, [courses, coursesDatas, values?.totalTerms]);
  useEffect(() => {
    reset({
      ...values,
      paymentTerm:
        // values?.paymentTerm ||
        student?.registrationData?.invoiceId?.paymentTerm ||
        paymentTerms?.[0]?.id,
      totalTerms: student?.registrationData?.invoiceId?.totalTerms,
    });
  }, [student?.registrationData?.invoiceId]);
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
    <div className="space-y-32">
      <div className="flex justify-end gap-52">
        <Button
          variant="contained"
          color="primary"
          onClick={downloadToPdf}
          type="button"
        >
          Print Receipt
        </Button>
      </div>
      <div id="student-review" style={{ paddingLeft: "10px" }}>
        <TableHeader
          studentId={student?.userInformationId?.studentData?.student_id}
          studentName={student?.userInformationId?.displayName}
          program={student?.registrationData?.programId?.name}
          semester={course?.name}
        />
        <div>
          <TableWidget columns={tableData.columns} rows={showRows} />
        </div>
        <div
          className="flex justify-end items-center"
          style={{ marginTop: "4px" }}
        >
          <div className="w-1/6">
            <MainSelect
              data={{
                value: values?.paymentTerm || 1,
                onChange: (e, extra) => {
                  console.log({ extra });
                  reset({
                    ...values,
                    paymentTerm: extra?.props?.id,
                    totalTerms: extra?.props?.term,
                  });

                  // setValue();
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
      <div className="flex justify-end gap-5">
        <Button
          variant="contained"
          color="secondary"
          to="/finance/student"
          component={Link}
          type="button"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenModal(!openModal);
            reset({
              selectStudent: studentId,
              balanceDue:
                student?.registrationData?.invoiceId?.remainingBalance,
              amountDue: values?.payNow || totalAmount,
              paymentTerm:
                values?.paymentTerm ||
                student?.registrationData?.invoiceId?.paymentTerm,
              totalTerms:
                values?.totalTerms ||
                student?.registrationData?.invoiceId?.totalTerms,
            });
          }}
          type="button"
        >
          Add Payment
        </Button>
      </div>
      <BasicModal
        open={openModal}
        handleClose={() => {
          setOpenModal(!openModal);
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-14">
            <h1>Invoice </h1>
            {balanceFee?.length > 0 ? (
              <p style={{ color: "red" }}>
                <strong>
                  This student has a pending balance waiting for approval.
                  Please approve under Balance Fees
                </strong>
              </p>
            ) : null}

            <CardDetails fieldData={step0Data} control={control} />
            <div className="grid flex-col gap-16">
              <Button
                className="justify-self-end w-fit	"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={balanceFee?.length > 0}
              >
                Pay
              </Button>
            </div>
          </div>
        </form>
      </BasicModal>
    </div>
  );
}