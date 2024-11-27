/* eslint-disable eqeqeq */
module.exports = {
  friendlyName: "Create account",

  description: "",

  inputs: {
    firstName: {
      type: "string", // number, string, boolean, json, ref
      required: true,
      description: "The first name is required.",
    },
  },

  exits: {
    success: {},
    invalid: {},
    badRequest: {},
  },

  fn: async function (inputs, exits) {
    var name = inputs.field;

    if (name == "" || name == undefined) {
      return exits.success({
        status: false,
        message: "Field is required",
      }  );
    } else {
      return exits.success(true);
    }
  },
};
