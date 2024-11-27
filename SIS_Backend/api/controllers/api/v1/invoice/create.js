module.exports = {
  friendlyName: "Create Invoice",

  description: "Create Invoice.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    amountPaid: {
      type: "number",
      required: true,
      description: "Name is required.",
    },
    receipt_number: {
      type: "string",
      required: true,
      description: "Recepit Number is required.",
    },
    paymentTerm: {
      type: "string",
      required: false,
    },
    totalTerms: {
      type: "number",
      required: false,
    },
  },
  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    let program = {};
    const userId = this.req.userId;

    const invoiceData = await Invoice.findOne({
      id: inputs?.id,
    });
    if (invoiceData) {
      const newInput = {
        paidBy: userId,
        amount_paid:
          parseFloat(invoiceData?.amount_paid || 0) +
          parseFloat(inputs?.amountPaid || 0),
        receipt_number: inputs?.receipt_number,
      };
      if (inputs?.paymentTerm) {
        newInput["paymentTerm"] = inputs?.paymentTerm;
      }
      if (inputs?.totalTerms) {
        newInput["totalTerms"] = inputs?.totalTerms;
      }
      console.log("newInput", newInput);
      const invoiceDetail = await Invoice.updateOne({
        id: inputs.id,
      }).set(newInput);
      console.log("invoiceData?.registrationId", invoiceData?.registrationId);
      console.log("invoiceData", invoiceData);
      const findRegistration = await Registration.findOne({
        id: invoiceData.registration,
      });

      const createObj = {
        amount: inputs.amountPaid,
        registration_id: findRegistration?.id,
        semester_id: findRegistration?.semesterId,
        added_by: userId,
      };

      const createPaymentHistory = await PaymentHistory.create(
        createObj
      ).fetch();

      return exits.success({
        ...invoiceDetail,
        paymentHistory: createPaymentHistory,
      });
    }

    return exits.success({});
  },
};
