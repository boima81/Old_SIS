// export const addEvent = createAsyncThunk(
//   "calendarApp/events/addEvent",
//   async (newEvent, { dispatch }) => {
//     const response = await axios.post("/api/calendar/events", newEvent);
//     const data = await response.data;

//     return data;
//   }
// );

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { BASEURL } from "src/app/auth/services/jwtService/jwtServiceConfig";
import { toaster, toasterSuccess } from "../../dashboards/Shared/utils";

export const getStudent = createAsyncThunk(
  "admission/student/getStudent",
  async (id) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.get(`${BASEURL}student/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const updateStudent = createAsyncThunk(
  "admission/student/updateStudent",
  async ({ id, ...body }, { dispatch }) => {
    try {
      const accessToken = await JwtService.getAccessToken();
      const response = await axios.put(`${BASEURL}student/${id}`, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.data;
      if (data) {
        dispatch(getStudent(id));
      }

      return data;
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);

export const invoicePay = createAsyncThunk(
  "admission/student/invoicePay",
  async ({ id, studentId, image, ...body }, { dispatch }) => {
    console.log("body", body);
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.post(
          `${BASEURL}invoice-pay`,
          { ...body, id },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = await response.data;
        if (data) {
          console.log("image", image);
          if (image) {
            let formData = new FormData();
            formData.append("file", image);
            console.log("data?.paymentHistory?.id", data?.paymentHistory?.id);
            const fileData = await axios.post(
              `${BASEURL}paymentHistory-fileUpload?paymentHistoryId=${data?.paymentHistory?.id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "content-type": "multipart/form-data",
                },
              }
            );
            console.log("fileData", fileData);
          }

          toasterSuccess("success", "Amount Pay Successfully");
          dispatch(getStudent(studentId));
        }

        return data;
      }
      toaster("error", { data: { message: "Invoice not generated " } });
      return {};
    } catch (error) {
      toaster("error", error.response);
      return {};
    }
  }
);
export const invoicePayUpdate = createAsyncThunk(
  "admission/student/invoicePay",
  async ({ id, studentId, amount, ...body }, { dispatch }) => {
    console.log("body", body);
    try {
      if (id) {
        const accessToken = await JwtService.getAccessToken();
        const response = await axios.post(
          `${BASEURL}invoice-pay-update`,
          { ...body, id, amount },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        toasterSuccess("success", "Amount Pay Successfully");
        // dispatch(getStudent(studentId));
        const data = await response.data;

        return data;
      }
      console.log("out---");
      toaster("error", { data: { message: "Invoice not generated " } });
      return {};
    } catch (error) {
      console.log("catch---", error);
      toaster("error", error.response);
      return {};
    }
  }
);

const studentSlice = createSlice({
  name: "admission/student",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getStudent.fulfilled]: (state, action) => action.payload,
    [updateStudent.fulfilled]: (state, action) => action.payload,
    [invoicePay.fulfilled]: (state, action) => action.payload,
    [invoicePayUpdate.fulfilled]: (state, action) => action.payload,
  },
});

export const selectStudent = ({ admission }) => admission.adminStudent;

export default studentSlice.reducer;
