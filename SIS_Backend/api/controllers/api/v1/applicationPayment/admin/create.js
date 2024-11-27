module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Registration Fees.",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
    name: {
      type: "string",
      required: true,
      description: "Name is required.",
    },
    amount: {
      type: "number",
      required: true,
      description: "Amount is required.",
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
    if (inputs?.semester?.length <= 0) {
      return exits.invalid({
        message: `Registration Fees is required`,
      });
    }

    let registrationFees = {};
    if (inputs?.id) {
      registrationFees = await RegistrationFees.updateOne({
        id: inputs.id,
      }).set(inputs);
    } else {
      registrationFees = await RegistrationFees.create(inputs)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }

    return exits.success(registrationFees);
  },
};
