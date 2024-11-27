module.exports = {
  friendlyName: "View Registration",

  description: "Display Registration",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;

    await Receipt.find({
      createdBy: userId,
    })
      .sort("id DESC")
      .populate("registration")
      .exec(async function (err, result) {
        const results = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          if (element?.registration?.id) {
            const registrationData = await Registration.findOne({
              id: element?.registration?.id,
            }).populate("semesterId");
            element.registration = registrationData;
          }

          results.push(element);
        }

        return exits.success(results);
      });

    // return exits.success(receipts);
  },
};
