module.exports = {
  friendlyName: "Create Payment Terms",

  description: "Create Update Payment Terms.",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
    term: {
      type: "number",
      required: true,
      description: "term is required.",
    },
    termName: {
      type: "string",
      required: true,
      description: "Term Name is required.",
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
    const userId = this.req.userId;

    let paymentTermsData = {};
    inputs.createdBy = userId;
    if (inputs?.id) {
      paymentTermsData = await PaymentTerms.updateOne({
        id: inputs.id,
      }).set(inputs);
    } else {
      paymentTermsData = await PaymentTerms.create({
        ...inputs,
      })
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    return exits.success(paymentTermsData);
  },
};
