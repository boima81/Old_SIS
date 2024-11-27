module.exports = {
  friendlyName: "Upload File",
  description: "Upload File",

  exits: {
    invalid: {
      statusCode: 409,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
    notFound: {
      statusCode: 404,
      description: "No file with the specified ID was found in the database.",
    },
  },
  fn: async function (inputs, exits) {
    const id = this.req.params.id;
    const userId = this.req.userId;
    const files  = await FileUpload.findOne({ id })
    return exits.success({
      data: files,
    });
  },
};
