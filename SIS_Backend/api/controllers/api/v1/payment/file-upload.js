module.exports = {
  friendlyName: "View Payment Fees",

  description: "Display Payment Fees",

  inputs: {},

  exits: {
    success: {},
    invalid: {},
  },

  fn: async function (inputs, exits) {
    try {
      const userId = this.req.userId;
      const userRole = this.req.userRole;
      let modifiedName = "";
      const paymentHistoryId = this.req.query["paymentHistoryId"];
      var uploadFolderName = sails.config.custom.uploadFolderName;
      const uploadPath = `uploads/${uploadFolderName}/receipt`;
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
          maxBytes: 100000000000,
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
            const fullPath = modifiedName;
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
              fileIds.push(fileUpload.url);
            }
          }
          if (fileIds?.length > 0) {
            const newData = {
              receipt_file: fileIds[0],
            };
            const userData = await PaymentHistory.updateOne({
              id: paymentHistoryId,
            }).set(newData);
            return exits.success({
              message: "File Uploaded Successfully",
              data: userData,
            });
          }
        }
      );

      return exits.success({
        message: "Payment file upload successfully",
      });
    } catch (error) {
      console.log("error", error);
      return exits.invalid({ message: "Something went wrong" });
    }
  },
};
