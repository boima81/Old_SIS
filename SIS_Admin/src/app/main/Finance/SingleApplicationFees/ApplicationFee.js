import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import withReducer from "app/store/withReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import withRouter from "@fuse/core/withRouter";
import { getCourse } from "app/store/courseSlice";
import { getStudent, selectStudent } from "../store/studentSlice";
import reducer from "../store";
import ApplicationFeesHeader from "./ApplicationFeesHeader";
import DetailsTab from "./tabs/DetailsTab";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .required("You must enter a email")
    .min(5, "The email must be at least 5 characters"),
});

function ApplicationFee(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectStudent);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  useEffect(() => {
    if (user?.registrationData?.semesterId?.id) {
      dispatch(getCourse(user?.registrationData?.semesterId?.id));
    }
  }, [dispatch, user?.registrationData?.semesterId?.id]);
  useDeepCompareEffect(() => {
    function updateProductState() {
      const { feesId } = routeParams;

      if (feesId === "new") {
        /**
         * Create New Product data
         */
        // dispatch(newUser());
      } else {
        /**
         * Get Product data
         */
        dispatch(getStudent(feesId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
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

  // useEffect(() => {
  //   return () => {
  //     /**
  //      * Reset Product on component unload
  //      */
  //     dispatch(resetUser());
  //     setNoProduct(false);
  //   };
  // }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  // if (noProduct) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There is no such product!
  //       </Typography>
  //       <Button
  //         className="mt-24"
  //         component={Link}
  //         variant="outlined"
  //         to="/settings/users"
  //         color="inherit"
  //       >
  //         Go to Users Page
  //       </Button>
  //     </motion.div>
  //   );
  // }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (user &&
  //     +routeParams?.feesId !== user.id &&
  //     routeParams.feesId !== "new")
  // ) {
  //   return <FuseLoading />;
  // }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ApplicationFeesHeader />}
        content={
          // <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl h-full">
          <div className="p-16 sm:p-24">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <DetailsTab
                invoiceId={user?.registrationData?.invoiceId?.id}
                coursesDatas={user?.registrationData?.courses || []}
                student={user}
                studentId={routeParams?.feesId}
                navigate={(url) => props.navigate(url)}
              />
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
    </FormProvider>
  );
}

export default withRouter(withReducer("admission", reducer)(ApplicationFee));
