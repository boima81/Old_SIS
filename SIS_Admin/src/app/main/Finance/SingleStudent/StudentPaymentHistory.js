import FusePageCarded from "@fuse/core/FusePageCarded";
import withRouter from "@fuse/core/withRouter";
import { useDeepCompareEffect } from "@fuse/hooks";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCourse } from "app/store/courseSlice";
import withReducer from "app/store/withReducer";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import TableHeader from "../../dashboards/Shared/TableHeader";
import TableWidget from "../../dashboards/student/widgets/TableWidget";
import reducer from "../store";
import { getBalanceFee } from "../store/balanceFeeSlice";
import {
  getStudentsRegistrationData,
  selectRegistrationListData,
} from "../store/studentsRegistrationSlice";
import UserHeader from "./UserHeader";
import {
  getStudentsPaymentHistoryData,
  selectPaymentHistoryData,
} from "../store/studentsPaymentHistorySlice";
import moment from "moment";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .required("You must enter a email")
    .min(5, "The email must be at least 5 characters"),
});

function StudentDetails(props) {
  const dispatch = useDispatch();
  const apiData = useSelector(selectPaymentHistoryData);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { registrationId } = routeParams;
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [tableRowData, setTableRowData] = useState([]);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  useEffect(() => {
    if (apiData?.registrationData?.semesterId?.id) {
      dispatch(getCourse(apiData?.registrationData?.semesterId?.id));
    }
  }, [dispatch, apiData?.registrationData?.semesterId?.id]);
  useDeepCompareEffect(() => {
    function updateProductState() {
      if (registrationId === "new") {
        /**
         * Create New Product data
         */
        // dispatch(newUser());
      } else {
        /**
         * Get Product data
         */
        dispatch(
          getStudentsPaymentHistoryData({ registrationId: registrationId })
        ).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
        dispatch(getBalanceFee(registrationId));
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!apiData) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset({
      ...apiData,
      firstName: apiData?.userInformationId?.first_name,
      middleName: apiData?.userInformationId?.middle_name,
      lastName: apiData?.userInformationId?.last_name,
      phoneNumber: apiData?.userInformationId?.phone_number,
      phoneNumber_country:
        apiData?.userInformationId?.phone_number_country_code,
    });
  }, [apiData, reset]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  useEffect(() => {
    // Update studentData when user changes
    if (apiData) {
      setStudentData(apiData?.student);
      const tableData = apiData.data?.map((data) => {
        return {
          amount: data.amount,
          createAt: moment(data?.createdAt).format("YYYY/MM/DD HH:mm A"),
          added_by: data.added_by,
          receipt_file: data?.receipt_file ? (
            <a href={data?.receipt_file} target="_blank">
              View Receipt
            </a>
          ) : "",
        };
      });
      setTableRowData(tableData);
    }
  }, [apiData]);

  const tableData = {
    columns: ["Amount", "Payment Date", "Payment by", "Receipt"],
  };
  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<UserHeader />}
        content={
          <div className="p-16 sm:p-24">
            <div id="student-review" style={{ paddingLeft: "10px" }}>
              {/* <TableHeader
                studentId={studentData?.studentId}
                studentName={studentData?.userInformationId?.displayName}
                program={studentData?.programs}
                phone_number={studentData?.userInformationId?.phone_number}
              /> */}
              <div>
                <TableWidget columns={tableData.columns} rows={tableRowData} />
              </div>
            </div>
          </div>
          // </Paper>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withRouter(withReducer("admission", reducer)(StudentDetails));
