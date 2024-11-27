import { combineReducers } from "@reduxjs/toolkit";
import fees from "./feesSlice";
import fee from "./feeSlice";
import courseFee from "./courseFeeSlice";
import payments from "./paymentsSlice";
import payment from "./paymentSlice";
import registrationPayments from "./registrationPaymentsSlice";
import registrationPayment from "./registrationPaymentSlice";
import paymentReceipts from "./paymentReceiptsSlice";
import paymentTerms from "./paymentTermsSlice";
import paymentTerm from "./paymentTermSlice";
import balanceFee from "./balanceFeeSlice";
import balanceFees from "./balanceFeesSlice";
import studentsRegistrationList from "./studentsRegistrationSlice";
import studentsPaymentHistoryData from "./studentsPaymentHistorySlice";

const reducer = combineReducers({
  fees,
  fee,
  courseFee,
  payments,
  payment,
  registrationPayments,
  registrationPayment,
  paymentReceipts,
  paymentTerms,
  paymentTerm,
  balanceFee,
  balanceFees,
  studentsRegistrationList,
  studentsPaymentHistoryData
});

export default reducer;
