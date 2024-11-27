import history from "@history";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import { selectUser, setUser } from "app/store/userSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JwtService from "src/app/auth/services/jwtService";
import MainTextField from "src/app/main/dashboards/Shared/TextField";
import { getAllCountry } from "src/app/main/dashboards/Shared/utils";
import * as yup from "yup";

function ChangePasswordTab() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [country, setCountry] = useState();

  const test = (x) => x + 1;
  const user = useSelector(selectUser);
  const userInformationId = user?.userInformationId;
  // useEffect(() => {
  //   axios.get("/api/profile/about").then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  // if (!data) {
  //   return null;
  // }

  // const { general, work, contact, groups, friends } = data;
  function getData() {
    setCountry(getAllCountry());
  }
  useEffect(() => {
    getData();
  }, []);
  const defaultValues = {
    password: "",
    changePassword: "",
  };
  const schema = yup.object({
    password: yup.string().required("You must enter a Password "),
    changePassword: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Your password is too short."),
  });

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const values = getValues();
  const form = watch();
  const fieldData = {
    radioList: [
      {
        id: 1,
        value: "male",
        label: "Male",
      },
      {
        id: 2,
        value: "female",
        label: "Female",
      },
    ],
    fieldName: {
      password: "password",
      changePassword: "changePassword",
    },
    errorNames: {
      password: !!errors?.password,
      changePassword: !!errors?.changePassword,
    },
    errorMessage: {
      password: errors?.password?.message || "",
      changePassword: errors?.changePassword?.message || "",
    },
  };

  function onSubmit({ password, changePassword }) {
    JwtService.changePassword({
      oldPassword: password,
      password: changePassword,
    })
      .then(async (userUpdate) => {
        history.push("/apps/profile");
        const userData = await JwtService.signInWithToken();
        if (userData) {
          dispatch(setUser(userData));
        }
      })
      .catch((err) => {
        console.log({ err });
        setError(err?.type, {
          type: "manual",
          message: err.message,
        });
      });
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <Paper className="p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
        <div className="flex justify-center mb-32">
          <h1>Change password</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-32">
            <Controller
              control={control}
              name={fieldData?.fieldName?.password}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Password"
                  placeholder="Password"
                  type="password"
                  id={fieldData?.fieldName?.password}
                  errorName={!!fieldData.errorNames.password}
                  errorMessage={fieldData?.errorMessage?.password}
                />
              )}
            />
            <Controller
              control={control}
              name={fieldData?.fieldName?.changePassword}
              render={({ field }) => (
                <MainTextField
                  data={field}
                  label="Change password"
                  placeholder="Change password"
                  type="password"
                  id={fieldData?.fieldName?.changePassword}
                  errorName={!!fieldData.errorNames.changePassword}
                  errorMessage={fieldData?.errorMessage?.changePassword}
                />
              )}
            />
            <div className="flex justify-end gap-5">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate("/apps/profile");
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </motion.div>
  );
}

export default ChangePasswordTab;
