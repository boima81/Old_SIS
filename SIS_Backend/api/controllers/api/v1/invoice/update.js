module.exports = {
  friendlyName: "Create Invoice",

  description: "Create Invoice.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
      description: "amount is required.",
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
    // let program = {};
    // const userId = this.req.userId;

    const invoiceData = await Invoice.findOne({
      id: inputs?.id,
    });
    console.log("invoiceData", invoiceData);
    let newBalance = 0
    let oldBalanceUpdate = 0
    if (invoiceData) {
      //    500 400 


      const [findLatestPayment] = await PaymentHistory.find({
        registration_id: invoiceData?.registration,
      })
        .sort("id DESC")
        .limit(1);

      console.log({ findLatestPayment })
      const amountRemaning = invoiceData.amount_paid >= 0 && inputs.amount > 0 ? invoiceData.amount_paid - inputs.amount : 0
      oldBalanceUpdate = (invoiceData?.amount_paid || 0) - (findLatestPayment?.amount || 0)
      newBalance =  (oldBalanceUpdate + inputs.amount)
      console.log({ newBalance, oldBalanceUpdate })
      const updateInvoiceObj = {
        amount_paid:
          newBalance,
      };

      await BalanceFees.updateOne({
        registration: invoiceData?.registration,
      }).set({
        balance_pay: inputs.amount,
      });
      await Invoice.updateOne({
        id: inputs.id,
      }).set(updateInvoiceObj);


      console.log("findLatestPayment", findLatestPayment);
      if (findLatestPayment?.id) {
        const update = await PaymentHistory.updateOne({
          id: findLatestPayment?.id,
        }).set({
          amount: inputs.amount,
        });
        console.log("update------>>>", update);
      }
      //   return exits.success({
      //     message: "Record updated successfully",
      //   });
    }

    return exits.success({
      message: "Billing updated successfully",
      newBalance,
      oldBalanceUpdate
    });
  },
};
