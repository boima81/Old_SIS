module.exports = {
  friendlyName: "View Notification Fees",

  description: "Display Notification Fees",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    const userId = this.req.userId;
    const userRole = this.req.userRole;

    let where = {
      roleName: userRole,
    };
    if (userRole === "student") {
      where = {
        createdFor: userId,
      };
    } else if (userRole === "admin") {
      where = {
        roleName: { "!=": "student" },
      };
    }

    let notifications = await Notifications.find({
      markAsRead: false,
      ...where,
    })
      .limit(10)
      .sort("id DESC");
    return exits.success(notifications);
  },
};
