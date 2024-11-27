module.exports = {
  friendlyName: "Delete",

  description: "Delete User.",

  inputs: {
    userId: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "User Deleted.",
    },
    redirect: {
      responseType: "redirect",
    },
    invalid: {
      statusCode: 409,
      description: "Invalid request",
    },
  },

  fn: async function (inputs, exits) {
    const userId = inputs.userId;

    const findUserId = await User.findOne({ id: userId });

    if (!findUserId) {
      return exits.invalid({
        message: "User not found",
      });
    }
    await User.update({
      id: findUserId?.id,
    }).set({
      userInformationId: null,
      applicationId: null,
    });

    await Application.updateOne({
      id: findUserId?.applicationId,
    }).set({
      createdBy: null,
      student: null,
    });

    await ApplicationFile.destroy({
      applicationId: findUserId?.applicationId,
    });
    await Payment.destroy({
      application: findUserId?.applicationId,
    });
    let studentIDs = await Student.find({
      user: findUserId?.id,
    });

    studentIDs = studentIDs?.map((studentId) => studentId?.id);
    await UserInformation.destroy({
      student: { in: studentIDs },
    });

    await Transcript.update({
      student_id: { in: studentIDs },
    }).set({
      student_id: null,
    });

    await Course.update({
      instructor: findUserId?.id,
    }).set({
      instructor: null,
    });

    await UserInformation.destroy({
      id: findUserId.userInformationId,
    });

    const registrationData = await Registration.find({
      createdBy: findUserId.id,
    });

    const registrationIds = registrationData?.map((regis) => regis?.id);
    await RegistrationCourse.destroy({
      registration: { in: registrationIds },
    });

    await Notifications.destroy({
      createdBy: findUserId?.id,
    });
    await Notifications.destroy({
      createdFor: findUserId?.id,
    });

    await Receipt.destroy({
      registration: { in: registrationIds },
    });
    await Payment.destroy({
      registration: { in: registrationIds },
    });

    await Grade.destroy({
      user_id: findUserId.id,
    });

    await Grade.destroy({
      user_id: findUserId.id,
    });

    await Registration.update({ createdBy: findUserId.id }).set({
      invoiceId: null,
      createdBy: null,
    });
    await Invoice.update({ createdBy: findUserId.id }).set({
      registration: null,
      createdBy: null,
    });

    await Recommendation.destroy({
      applicationId: findUserId?.applicationId,
    });
    await Application.destroy({
      id: findUserId?.applicationId,
    });

    await Student.destroy({
      user: findUserId?.id,
    });

    await User.destroy({
      id: findUserId.id,
    });

    exits.success({
      message: "User has been deleted successfully.",
      data: findUserId,
    });
  },
};
