module.exports = {
  friendlyName: "Notification",

  description: "Manage Notification",

  inputs: {
    type: {
      type: "string",
      required: true,
    },
    id: {
      type: "number",
      required: true,
    },
    application: {
      type: "number",
      required: false,
    },
    registration: {
      type: "number",
      required: false,
    },
    keyValue: {
      type: "ref",
      required: false,
    },
  },
  exits: {
    success: {  
      description: "All done.",
    },
  },
  fn: async function (inputs, exits) {
    try {
      const { id, type, application, registration, keyValue } = inputs;
      const user = await User.findOne({
        id,
      });
      const inputParams = {
        roleName: user?.role,
        notificationKey: type,
      };
      console.log({ type, application, registration, inputParams });
      if (user?.role === "student") {
        let userInformation = await UserInformation.findOne({
          id: user?.userInformationId,
        });
        userInformation = userInformation.toJSON();

        // When application completed by  student
        if (type === "application_approval") {
          inputParams[
            "message"
          ] = `${userInformation?.displayName} application is waiting approval`;
          inputParams["roleName"] = "admission";
        } else if (type === "application_fees") {
          inputParams[
            "message"
          ] = `${userInformation?.displayName} application fees is waiting approval`;
          inputParams["roleName"] = "finance";
        } else if (type === "registration_approval") {
          inputParams[
            "message"
          ] = `${userInformation?.displayName} registration is waiting approval`;
          inputParams["roleName"] = "admission";
        } else if (type === "registration_fees") {
          inputParams[
            "message"
          ] = `${userInformation?.displayName} registration fees is waiting approval`;
          inputParams["roleName"] = "finance";
        }
      } else if (
        user?.role === "admission" ||
        user?.role === "finance" ||
        user?.role === "admin"
      ) {
        let applicationData = {};
        if (application) {
          applicationData = await Application.findOne({
            id: application,
          });
          console.log({ applicationData });
        }

        if (type === "application_feedback") {
          inputParams["message"] = `Application has feedback`;
          inputParams["createdFor"] = applicationData?.createdBy;
          inputParams["roleName"] = "student";
        } else if (type === "application_approved") {
          inputParams["message"] = `Application has been approved`;
          inputParams["createdFor"] = applicationData?.createdBy;
          inputParams["roleName"] = "student";
        } else if (type === "registration_complete") {
          if (registration) {
            const registrationData = await Registration.findOne({
              id: registration,
            });
            inputParams["message"] = `Your registration has been completed`;
            inputParams["createdFor"] = registrationData?.createdBy;
            inputParams["roleName"] = "student";
          }
        } else if (type === "application_fee_approve") {
          inputParams[
            "message"
          ] = `Application fees  of ${keyValue} has been approved`;
          inputParams["createdFor"] = applicationData?.createdBy;
          inputParams["roleName"] = "student";
        }
      }
      const notification = await Notifications.create(inputParams).fetch();
      console.log({ notification });
      return exits.success({ notification });
    } catch (error) {
      console.log({ error });
      return exits.success({ error });
      return {};
    }
  },
};
