
module.exports = {
  friendlyName: "View Single User",

  description: "Display Single User",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {

    // let result = await sails.helpers.datatable(Project, this.req.query);
    let user = await User.findOne({
      id: this.req.params.userId,
    }).populate("userInformationId");
    return exits.success(user);
  },
};
