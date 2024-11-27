module.exports = {
  friendlyName: "Delete",

  description: "Delete Payment Terms.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Sections Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const ids = this.req?.param("id")?.split(",") || [];
    try {
      await PaymentTerms.destroy({
        id: { in: ids },
      });
      return exits.success("Payment Terms deleted successfully ");
    } catch (error) {
      return exits.invalid({
        message: `Payment Terms can't delete because it's attached with somewhere`,
      });
    }
  },
};
