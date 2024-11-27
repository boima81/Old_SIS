module.exports = {
  friendlyName: "View Application",

  description: "Display Application",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    // console.log("project-data req : ", this.req.query);

    // let result = await sails.helpers.datatable(Project, this.req.query);
    await Application.findOne({
      id: this.req.params.id,
    })
      .populate("student")
      .populate("userInformationId")
      .populate("reviewBy")
      .populate("programId")
      .populate("semesterId")
      .populate("applicationFee")
      .populate("uploadLatter")
      .populate("recommendations")
      .populate("createdBy")
      .meta({ skipRecordVerification: true })
      .exec(async function (err, result) {
        let goalFile = [];
        let resumeFile = [];
        let transcriptFile = [];
        let nationalityFile = [];
        const files = await ApplicationFile.find({
          applicationId: result.id,
        }).populate("fileId");
        if (files?.length > 0) {
          resumeFile = files?.filter((file) => file?.fileSectionType === "csv");
          goalFile = files?.filter((file) => file?.fileSectionType === "goal");
          transcriptFile = files?.filter(
            (file) => file?.fileSectionType === "transcript"
          );
          nationalityFile = files?.filter(
            (file) => file?.fileSectionType === "nationalityId"
          );
        }
        const user = await User.findOne({
          id: result.createdBy?.id,
        }).populate("avatarFile");
        console.log({ user: user?.avatarFile });
        const newApplication = {
          ...result,
          goal_statement: result?.goal_statement || "",
          selectStudent: result?.createdBy?.id,
          goalFile,
          resumeFile,
          transcriptFile,
          nationalityFile,
          photoURL: user?.avatarFile?.url,
        };
        return exits.success(newApplication);
      });
  },
};
