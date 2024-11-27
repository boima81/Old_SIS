module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Agency.",

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
    isActive: {
      type: "boolean",
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
    let agency = {};
    if (inputs?.id) {
      agency = await Agency.updateOne({
        id: inputs.id,
      }).set(inputs);
    } else {
      agency = await Agency.create(inputs)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    return exits.success(agency);
  },
};
