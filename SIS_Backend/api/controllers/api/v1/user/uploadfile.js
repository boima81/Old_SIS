module.exports = {
  friendlyName: "Upload File",
  description: "Upload File",
  inputs: {
    file_upload_name: {
      type: "string",
      require: false,
    },
    // applicationId: {
    //   type: "number",
    //   require: true,
    // },
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
    // const applicationId = inputs.applicationId;
    const userId = this.req.userId;
    var uploadFolderName = sails.config.custom.uploadFolderName;

    const uploadPath = `uploads/${uploadFolderName}/avatar/${userId}`;
    const dirName = require("path").resolve(
      sails.config.appPath,
      `assets/${uploadPath}`
    );
    const file = this.req.file("file").upload(
      {
        // don't allow the total upload size to exceed ~10MB
        // adapter: require("skipper-s3"),
        // endpoint: "https://sis.ams3.digitaloceanspaces.com",
        // key: "DO00Z9LUVVBMBMWFQTQL",
        // secret: "yqfJ7rUzNif9q9OIrhNOfcUqaWV1keVpuHO2AayF6iU",
        // bucket: "uploads",
        // folder: "staging",
        maxBytes: 10000000,
        dirname: dirName,
      },
      async function whenDone(err, uploadedFiles) {
        if (err) {
          console.log("error", err);
          // return this.res.serverError(err);
          return exits.invalid(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return this.res.badRequest("No file was uploaded");
        }

        // Get the base URL for our deployed application from our custom config
        // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
        var baseUrl = sails.config.custom.baseUrl;
        const fileIds = [];
        // for loop
        for (let i = 0; i < uploadedFiles.length; i++) {
          const uploadedFile = uploadedFiles[i];
          const fileName = uploadedFile?.filename;
          const fileType = uploadedFile?.type;
          const fullPath = uploadedFile?.fd.split("/").pop();
          const fileUploadURL = require("util").format(
            "%s/%s/%s",
            baseUrl,
            uploadPath,
            fullPath
          );
          // Save the "fd" and the url where the avatar for a user can be accessed
          const fileUpload = await FileUpload.create({
            // Generate a unique URL where the avatar can be downloaded.
            url: fileUploadURL,
            type: fileType,
            name: fileName,
            local_file_upload: fullPath,
          })
            .intercept((err) => {
              return exits.invalid({
                type: err?.attrNames?.[0],
                message: err?.message,
              });
            })
            .fetch();
          if (fileUpload?.id) {
            fileIds.push(fileUpload.id);
          }
        }

        if (fileIds?.length > 0) {
          const newData = {
            avatarFile: fileIds[0],
          };
          const userData = await User.updateOne({
            id: userId,
          }).set(newData);
          return exits.success({
            message: "Avatar Uploaded Successfully",
            data: userData,
          });
        }
      }
    );
    // let applicationData = {};
    // if (!id) {
    //   applicationData = await Application.create(inputData).fetch();
    // } else {
    //   applicationData = await UserInformation.updateOne({
    //     id: id,
    //   }).set(inputData);
    // }
    // return exits.success({
    //   message: "Uploaded File Successfully",
    // });
  },
};
