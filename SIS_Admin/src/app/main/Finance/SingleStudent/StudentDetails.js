import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import withReducer from "app/store/withReducer";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withRouter from "@fuse/core/withRouter";
import { getCourse } from "app/store/courseSlice";
import {
  getStudent,
  invoicePay,
  invoicePayUpdate,
  selectStudent,
} from "../store/studentSlice";
import reducer from "../store";
import UserHeader from "./UserHeader";
import DetailsTab from "./tabs/DetailsTab";
import { getBalanceFee } from "../store/balanceFeeSlice";
import Details from "./tabs/Details";
import {
  getStudentsRegistrationData,
  selectRegistrationListData,
  selectStudents,
} from "../store/studentsRegistrationSlice";
import TableHeader from "../../dashboards/Shared/TableHeader";
import TableWidget from "../../dashboards/student/widgets/TableWidget";
import moment from "moment";
import BasicModal from "../../dashboards/Shared/Modal";
import CardDetails from "./tabs/CardDetails";
import { Button } from "@mui/material";
import MainTextField from "../../dashboards/Shared/TextField";
import { currencySymbol } from "../../dashboards/Shared/utils";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  ReceiptNumber: yup.string().required("Receipt number is required"),
  amountPayingToday: yup.string().required("Amount is required"),
});
const schemaUpdate = yup.object().shape({
  amount: yup.string().required("Amount is required"),
});

function StudentDetails(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectRegistrationListData);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [invoiceId, setInvoiceId] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [tableRowData, setTableRowData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { studentId } = routeParams;

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const methodsUpdate = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schemaUpdate),
  });
  const { reset, watch, control, onChange, formState, handleSubmit } = methods;
  const { errors } = formState;
  const {
    reset: updateReset,
    watch: updateWatch,
    control: updateControl,
    onChange: updateOnChange,
    formState: updateFormState,
    handleSubmit: updateHandleSubmit,
    setValue,
  } = methodsUpdate;

  const { isValid, dirtyFields, errors: updateErrors } = updateFormState;

  const step0Data = {
    fieldName: {
      // selectStudent: "selectStudent",
      amountDue: "amountDue",
      balanceDue: "balanceDue",
      amountPayingToday: "amountPayingToday",
      ReceiptNumber: "ReceiptNumber",
      image: "image",
    },
    errorNames: {
      // selectStudent: !!errors?.selectStudent,
      amountDue: !!errors?.amountDue,
      balanceDue: !!errors?.balanceDue,
      amountPayingToday: !!errors?.amountPayingToday,
      ReceiptNumber: !!errors?.ReceiptNumber,
      image: !!errors?.image,
    },
    errorMessage: {
      // selectStudent: errors?.selectStudent?.message || "",
      amountDue: errors?.amountDue?.message || "",
      balanceDue: errors?.balanceDue?.message || "",
      amountPayingToday: errors?.amountPayingToday?.message || "",
      ReceiptNumber: errors?.ReceiptNumber?.message || "",
      image: errors?.image?.message || "",
    },
  };
  const stepUpdateData = {
    fieldName: {
      amount: "amount",
    },
    errorNames: {
      amount: !!updateErrors?.amount,
    },
    errorMessage: {
      amount: updateErrors?.amount?.message || "",
    },
  };
  console.log("errors", errors);
  function onSubmit(data) {
    console.log("data", data);
    dispatch(
      invoicePay({
        id: invoiceId,
        amountPaid: data?.amountPayingToday,
        receipt_number: data?.ReceiptNumber,
        image: data?.images,
      })
    ).then(() => {
      setOpenModal(!openModal);
      dispatch(getStudentsRegistrationData({ studentId })).then((action) => {
        /**
         * If the requested product is not exist show message
         */
        if (!action.payload) {
          setNoProduct(true);
        }
      });
      // navigate("/finance/student");
    });
  }
  function onSubmitUpdate(data) {
    console.log("data", data);
    dispatch(
      invoicePayUpdate({
        id: invoiceId,
        amount: data?.amount,
      })
    ).then(() => {
      setOpenUpdateModal(!openUpdateModal);
      dispatch(getStudentsRegistrationData({ studentId })).then((action) => {
        /**
         * If the requested product is not exist show message
         */
        if (!action.payload) {
          setNoProduct(true);
        }
      });
      // navigate("/finance/student");
    });
    updateReset();
  }

  useEffect(() => {
    if (user?.registrationData?.semesterId?.id) {
      dispatch(getCourse(user?.registrationData?.semesterId?.id));
    }
  }, [dispatch, user?.registrationData?.semesterId?.id]);
  useDeepCompareEffect(() => {
    function updateProductState() {
      if (studentId === "new") {
        /**
         * Create New Product data
         */
        // dispatch(newUser());
      } else {
        /**
         * Get Product data
         */
        dispatch(getStudentsRegistrationData({ studentId })).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
        dispatch(getBalanceFee(studentId));
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!user) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...user,
      firstName: user?.userInformationId?.first_name,
      middleName: user?.userInformationId?.middle_name,
      lastName: user?.userInformationId?.last_name,
      phoneNumber: user?.userInformationId?.phone_number,
      phoneNumber_country: user?.userInformationId?.phone_number_country_code,
    });
  }, [user, reset]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  useEffect(() => {
    // Update studentData when user changes
    if (user) {
      setStudentData(user?.student);
      const tableData = user.data?.map((data) => {
        console.log("user.data", data);
        console.log("user?.student?.id", user?.student);
        return {
          date: data?.createdAt,
          amountDue: `${data?.invoiceId?.total_amount} ${currencySymbol}`,
          amountPaid: `${data?.invoiceId?.total_display_amount_paid || 0} ${currencySymbol}`,  // total_display_amount_paid only for display
          balanceDue: `${data?.invoiceId?.remainingBalance} ${currencySymbol}`,
          balanceOverage: `${data?.invoiceId?.balance_overage || 0} ${currencySymbol}`,
          paymentTerms: data?.invoiceId?.paymentTerm,
          semester: data?.semesterId?.name,
          billing: (
            <Link to={`/finance/student/${studentId}`}>
              Show
            </Link>
          ),
          
          paymentHistory: (
            <Link to={`/finance/student/billing-history/${data?.id}`}>
              Show
            </Link>
          ),
          receipt: (
            <a href={data?.receipt} target="_blank">
              View File
            </a>
          ),
          action:
            // data?.invoiceId?.total_display_amount_paid < data?.invoiceId?.total_amount ? (
            // <a href={`/finance/student/${data?.createdBy?.id}`}>
            //   Add Payment
            // </a>
            <div className="flex gap-5 justify-center">
              <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenModal(!openModal);
                  setInvoiceId(data?.invoiceId?.id);
                  reset({
                    selectStudent: data?.id,
                    balanceDue:
                      data?.invoiceId?.remainingBalance,
                    amountDue: data?.invoiceId?.total_amount,
                  });
                }}
                type="button"
              >
                Add Payment
              </Button>
              </div>
              {data.isEditPayment && (
                <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenUpdateModal(!openUpdateModal);
                    setInvoiceId(data?.invoiceId?.id);
                    setValue("amount", data?.invoiceId?.total_display_amount_paid);
                  }}
                  type="button"
                >
                  Edit Amount Paid
                </Button>
                </div>
              )}
            </div>
          // ) : (
          //   <Button
          //     variant="contained"
          //     color="primary"
          //     onClick={() => {
          //       setOpenModal(!openModal);
          //       setInvoiceId(data?.invoiceId?.id);
          //       reset({
          //         selectStudent: data?.id,
          //         balanceDue:
          //           data?.invoiceId?.remainingBalance,
          //         amountDue: data?.invoiceId?.total_amount,
          //       });
          //     }}
          //     type="button"
          //   >
          //     Add Payment
          //   </Button>
          // ),
        };
      });
      setTableRowData(tableData);
    }
  }, [user]);

  const tableData = {
    columns: [
      "Date",
      "Amount Due",
      "Amount Paid",
      "Balance Due",
      "Balance Overage",
      "Payment Term",
      "Semester",
      "Billing",
      "Payment History",
      "Receipt",
      "Action",
    ],
  };
  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<UserHeader />}
        content={
          // <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
          <div className="p-16 sm:p-24">
            {/* <div className={tabValue !== 0 ? "hidden" : ""}>
              <Details
                invoiceId={users?.entities[42]?.invoiceId?.id}
                coursesDatas={users?.entities[42]?.courses || []}
                student={users?.entities[42]}
                studentId={routeParams?.studentId}
                navigate={(url) => props.navigate(url)}
              />
            </div> */}
            <div id="student-review" style={{ paddingLeft: "10px" }}>
              <TableHeader
                studentId={studentData?.studentId}
                studentName={studentData?.studentName}
                program={studentData?.programs}
                phone_number={studentData?.userInformationId?.phone_number}
              />
              <div>
                <TableWidget columns={tableData.columns} rows={tableRowData} />
              </div>
            </div>

            {/* <div className={tabValue !== 1 ? "hidden" : ""}>
                <ProductImagesTab />
              </div>

              <div className={tabValue !== 2 ? "hidden" : ""}>
                <PricingTab />
              </div>

              <div className={tabValue !== 3 ? "hidden" : ""}>
                <InventoryTab />
              </div>

              <div className={tabValue !== 4 ? "hidden" : ""}>
                <ShippingTab />
              </div> */}
          </div>
          // </Paper>
        }
        scroll={isMobile ? "normal" : "content"}
      />
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
            <CardDetails
              fieldData={step0Data}
              balanceDueDisabled={false}
              control={control}
              isFileUpload={true}
              hideStudentField={true}
            />
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
      <BasicModal
        open={openUpdateModal}
        handleClose={() => {
          setOpenUpdateModal(!openUpdateModal);
          updateReset();
        }}
      >
        <form onSubmit={updateHandleSubmit(onSubmitUpdate)}>
          <div className="flex flex-col gap-14">
            <h1>Amount Paid </h1>
            <Controller
              control={updateControl}
              name={stepUpdateData?.fieldName?.amount}
              render={({ field }) => (
                <MainTextField
                  type="number"
                  data={field}
                  label="Amount"
                  // id={stepUpdateData?.fieldName?.amount}
                  errorName={!!stepUpdateData.errorNames.amount}
                  errorMessage={stepUpdateData?.errorMessage?.amount}
                />
              )}
            />
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
    </FormProvider>
  );
}

export default withRouter(withReducer("admission", reducer)(StudentDetails));
