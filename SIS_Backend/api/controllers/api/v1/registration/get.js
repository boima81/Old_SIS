module.exports = {
  friendlyName: "View Registration",

  description: "Display Registration",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    await Registration.find({
      id,
    })
      .populate("courses")
      .populate("programId")
      .populate("semesterId")
      .populate("userInformationId")
      .populate("createdBy")
      .populate("invoiceId")
      .populate("applicationId")
      .sort("id DESC")
      .limit(1)
      .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        const results = [];
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          // if (element?.applicationId?.id) {
          const userInformationData = await User.findOne({
            id: element?.createdBy?.id,
          }).populate("userInformationId");
          
          const studentId = await Student.findOne({
            user: element?.createdBy?.id,
          });
          const userInfo = userInformationData?.userInformationId?.toJSON()
          element.student = studentId;
          element.userData = { ...userInformationData, userInformationData: userInfo };
          results.push(element);
        }
        return exits.success(results?.[0] || {});
      });
  },
};
