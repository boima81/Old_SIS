const fs = require("fs");

module.exports = {
  friendlyName: "Delete",

  description: "Delete Application File.",

  inputs: {},

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    success: {
      description: "Application Delete.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    try {
      var applicationFileRecord = await ApplicationFile.findOne({
        id,
      }).populate("fileId");
      const fileUrl = applicationFileRecord?.fileId?.local_file_upload;
      const dirName = require("path").resolve(
        sails.config.appPath,
        `assets/uploads/develop/application/${fileUrl}`
      );
      try {
        const content = fs.readFileSync(dirName, { encoding: "utf8" });
        if (content) {
          fs.unlinkSync(`${dirName}`);
        }
      } catch (error) {}

      const deleteApplicationFile = await ApplicationFile.destroy({
        id: applicationFileRecord?.id,
      });
      const deleteFile = await FileUpload.destroy({
        id: applicationFileRecord?.fileId?.id,
      });
      const applicationUpdate = {};
      if (applicationFileRecord?.fileSectionType === "transcript") {
        applicationUpdate["last_step_completed"] = 4;
      } else if (applicationFileRecord?.fileSectionType === "goal") {
        applicationUpdate["last_step_completed"] = 5;
      } else if (applicationFileRecord?.fileSectionType === "csv") {
        applicationUpdate["last_step_completed"] = 6;
      }
      if (applicationUpdate && applicationFileRecord?.applicationId) {
        await Application.updateOne({
          id: applicationFileRecord?.applicationId,
        }).set(applicationUpdate);
      }

      return exits.success({
        success: true,
        applicationId: applicationFileRecord?.applicationId,
      });
    } catch (error) {
      console.log({ error });
      return exits.invalid({
        message: `File not found`,
        success: false,
      });
    }
  },
};
