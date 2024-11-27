module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Program.",

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
    description: {
      type: "string",
      required: false,
      description: "Description is required.",
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
    if (inputs?.id) {
      program = await Program.updateOne({
        id: inputs.id,
      }).set(inputs);
    } else {
      program = await Program.create(inputs)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    return exits.success(program);
  },
};
