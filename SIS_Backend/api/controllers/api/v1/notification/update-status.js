module.exports = {
  friendlyName: "Notification Status",

  description: "Update Notification Status.",

  inputs: {},
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
    try {
      const ids = this.req?.param("id")?.split(",") || [];
      let notification = {};
      if (ids?.length > 0) {
        notification = await Notifications.update({
          id: { in: ids },
        }).set({ markAsRead: true });
      }
      // await Semester.addToCollection(semester?.id, "courses", inputs.courses);
      // await Semester.addToCollection(semester?.id, "programs").members([
      //   inputs.programs,
      // ]);

      return exits.success(notification);
    } catch (error) {
      return exits.invalid({
        message: `Something went wrong`,
      });
    }
  },
};
