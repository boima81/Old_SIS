import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { getUser, newUser, resetUser, selectUser } from "../store/userSlice";
import reducer from "../store";
import UserHeader from "./UserHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .required("You must enter a email")
    .min(5, "The email must be at least 5 characters"),
});

function User(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log({ user });
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
  useDeepCompareEffect(() => {
    function updateProductState() {
      const { userId } = routeParams;

      if (userId === "new") {
        /**
         * Create New Product data
         */
        dispatch(newUser());
      } else {
        /**
         * Get Product data
         */
        dispatch(getUser(userId)).then((action) => {
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
      lastName: user?.userInformationId?.last_name,
      role: { id: user?.role?.[0], title: _.startCase(user?.role?.[0]) },
    });
  }, [user, reset]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such user!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/settings/users"
          color="inherit"
        >
          Go to Users Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (user && +routeParams?.userId !== user.id && routeParams.userId !== "new")
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<UserHeader />}
        content={
          <>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab />
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
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("settingsApp", reducer)(User);
