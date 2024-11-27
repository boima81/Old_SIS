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
    folder_name: {
      type: "string",
      require: false,
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
    // const applicationId = inputs.applicationId;
    const userId = this.req.userId;

    const step_name = inputs.file_upload_name || "application";
    let modifiedName = "";
    var uploadFolderName = sails.config.custom.uploadFolderName;
    const uploadPath = `uploads/${uploadFolderName}/application`;
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
        saveAs: function (__newFileStream, next) {
          const extension = __newFileStream.filename.split(".").pop();
          modifiedName = `${Date.now()}.${extension}`;
          return next(undefined, modifiedName);
        },
        maxBytes: 1000000000,
        dirname: dirName,
      },
      async function whenDone(err, uploadedFiles) {
        console.log({ err });
        if (err) {
          return exits.invalid({
            type: err?.attrNames?.[0] || "fileUploadError",
            message: err?.message || "File invalid or Size is to large",
          });
          // return this.res.badRequest(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return exits.success({
            message: "Uploaded File Successfully",
            data: [],
          });
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
          const fullPath = modifiedName;
          const fileUploadURL = require("util").format(
            "%s/%s/%s",
            baseUrl,
            uploadPath,
            fullPath
          );
          console.log('fullPath', fullPath)
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

        // if (err) return exits.invalid({ message: err });
        // if (fileUpload) {
        //   const applicationFile = await ApplicationFile.create({
        //     applicationId,
        //     fileId: fileUpload.id,
        //   })
        //     .intercept((err) => {
        //       return exits.invalid({
        //         type: err?.attrNames?.[0],
        //         message: err?.message,
        //       });
        //     })
        //     .fetch();
        //   if (applicationFile) {
        //     return exits.success({
        //       message: "Uploaded File Successfully",
        //       data: { ...fileUpload, ...applicationFile },
        //       fileUploadURL,
        //     });
        //   }
        // }
        if (fileIds) {
          return exits.success({
            message: "Uploaded File Successfully",
            data: fileIds,
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
