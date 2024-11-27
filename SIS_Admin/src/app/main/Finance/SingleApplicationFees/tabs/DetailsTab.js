import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { selectCourse } from "app/store/courseSlice";
import { selectUser } from "app/store/userSlice";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  addDateFormate,
  addDollar,
  apiToValues,
} from "src/app/main/dashboards/Shared/utils";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import TableWidget from "src/app/main/dashboards/student/widgets/TableWidget";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import BasicModal from "src/app/main/dashboards/Shared/Modal";
import valid from "card-validator";
import { jsPDF as JSPDF } from "jspdf";

import * as htmlToImage from "html-to-image";

import CardDetails from "./CardDetails";
import { invoicePay } from "../../store/studentSlice";
import { getStudents } from "../../store/studentsSlice";

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
  const courses = course?.courses;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [showRows, setShowRows] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const tableData = {
    columns: ["No", "Course", "Credit", "Fees per credit", "Total Fees"],
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
        name: "",
        credit: "",
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
    newTableData.push({
      id: "",
      name: "",
      credit: "",
      creditFees: (
        <Typography style={{ fontWeight: "bolder" }}>Total</Typography>
      ),
      total_amount: tableApiValues?.total,
    });
    newTableData.push({
      id: "",
      name: "",
      credit: "",
      creditFees: (
        <Typography style={{ fontWeight: "bolder" }}>Amount Paid</Typography>
      ),
      total_amount: addDollar(
        student?.registrationData?.invoiceId?.amount_paid || 0
      ),
    });
    newTableData.push({
      id: "",
      name: "",
      credit: "",
      creditFees: (
        <Typography style={{ fontWeight: "bolder" }}>Balance</Typography>
      ),
      total_amount: addDollar(
        (tableApiValues?.total_without_dollar || 0) -
          (student?.registrationData?.invoiceId?.amount_paid || 0)
      ),
    });
    setShowRows(newTableData);
    setTotalAmount(tableApiValues?.total_without_dollar || 0);
    // setValue("total_amount", tableApiValues?.total_without_dollar);
  }
  useEffect(() => {
    dispatch(getStudents());
  }, []);
  useEffect(() => {
    showData();
  }, [courses, coursesDatas]);
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
        <div className="mt-16 space-y-32">
          <div className="flex justify-between items-center	">
            <div className="content-box">
              <img
                src="https://i.postimg.cc/YSPCbJzj/logo-dark.png"
                width="350px"
                alt="logo"
              />
              <h5>Z-505 Test tower</h5>
              <h5>101 fun street near abc road</h5>
              <h5>Moscow Russia</h5>
            </div>
            <div className="text-right">
              <h1>{user?.data?.displayName}</h1>
              <h3>
                {user?.data?.phone_number && `${user?.data?.phone_number}`}
              </h3>
              <h5>{user?.email}</h5>
            </div>
          </div>
          <div className="flex justify-between gap-52">
            <div>
              <h2 className="font-medium">Invoice Date</h2>
              <h5>{moment().format("MMM Do YYYY")}</h5>
            </div>
          </div>
        </div>
        <div>
          <TableWidget columns={tableData.columns} rows={showRows} />
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <Button
          variant="contained"
          color="secondary"
          to="/finance/application-fees"
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
                totalAmount - student?.registrationData?.invoiceId?.amount_paid,
              amountDue: totalAmount,
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
            <CardDetails fieldData={step0Data} control={control} />
            <div className="grid flex-col gap-16">
              <Button
                className="justify-self-end w-fit	"
                variant="contained"
                color="secondary"
                type="submit"
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
