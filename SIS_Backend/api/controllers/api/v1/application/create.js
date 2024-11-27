module.exports = {
  friendlyName: "Create",

  description: "Create Application.",

  inputs: {
    selectStudent: {
      type: "number",
      required: false,
      allowNull: true,
    },
    application_fee: {
      type: "number",
      required: false,
    },
    offline_payment: {
      type: "boolean",
      required: false,
    },
    full_name: {
      type: "string",
      required: false,
      description: "The full name is required.",
    },
    card_number: {
      type: "string",
      required: false,
    },
    expire_date: {
      type: "string",
      required: false,
    },
    cvv: {
      type: "string",
      required: false,
    },
    programId: {
      type: "number",
      required: false,
    },
    semesterId: {
      type: "number",
      required: false,
    },
    firstName: {
      type: "string",
      required: false,
      description: "The first name is required.",
    },
    middleName: {
      type: "string",
      required: false,
      description: "The first name is required.",
    },
    lastName: {
      type: "string",
      required: false,
    },
    phoneNumber: {
      type: "string",
      required: false,
    },
    maritalStatus: {
      type: "string",
      required: false,
      allowNull: true,
    },
    physicalDisability: {
      type: "boolean",
      defaultsTo: false,
    },
    apply_scholarship: {
      type: "boolean",
      defaultsTo: false
    },
    kInUserFullName: {
      type: "string",
      required: false,
      allowNull: true,
    },
    kInResidentialAddress: {
      type: "string",
      required: false,
      allowNull: true,
    },
    kInRelationship: {
      type: "string",
      required: false,
      allowNull: true,
    },
    phoneNumberCountryCode: {
      type: "string",
      required: false,
    },
    email: {
      required: false,
      unique: true,
      type: "string",
      isEmail: true,
      description: "The email address for the new account, e.g. m@example.com.",
      extendedDescription: "Must be a valid email address.",
      maxLength: 50,
    },
    country: {
      type: "string",
      required: false,
    },
    city: {
      type: "string",
      required: false,
    },
    nationality: {
      type: "string",
      required: false,
    },
    gender: {
      type: "string",
      required: false,
    },
    date_of_birth: {
      type: "string",
      required: false,
    },
    avatarFile: {
      type: "number",
      required: false,
      allowNull: true,
    },
    offline_payment_receipt_file: {
      type: "ref",
    },
    transcript: {
      type: "ref",
      // fileId: { type: "number", required: false },
    },
    nationalityFile: {
      type: "ref",
    },
    recommendation: {
      type: ["ref"],
      // require: false,
      // [
      //   {
      //     first_name: {
      //       type: "string",
      //       required: true,
      //     },
      //     last_name: {
      //       type: "string",
      //       required: true,
      //     },
      //     email: {
      //       type: "string",
      //       required: true,
      //     },
      //     phone_number: {
      //       type: "string",
      //       required: true,
      //     },
      //     fileId: {
      //       type: "number",
      //       required: true,
      //     },
      //   },
      // ]
    },
    goal: {
      type: "ref",
    },
    goal_statement: {
      type: "ref",
    },
    csv: {
      type: "ref",
      required: false,
    },
    step: {
      type: "number",
      required: true,
    },
    id: {
      type: "ref",
      required: false,
    },
    update: {
      type: "boolean",
      required: false,
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
    const id = inputs?.id;
    const userId = this.req.userId;
    const userWithApplication = await User.findOne({ id: userId }).populate(
      "applicationId"
    );

    if (
      userWithApplication?.applicationId &&
      !id &&
      userWithApplication?.role === "student"
    ) {
      return exits.invalid({
        message: `You have already one application please contact admin`,
      });
    }

    if (
      userWithApplication?.applicationId?.id &&
      id &&
      userWithApplication?.applicationId?.id !== id &&
      userWithApplication?.role === "student"
    ) {
      return exits.invalid({
        message: `Application not attached with current user`,
      });
    }
    const step = inputs.step;
    const inputData = {
      last_step_completed:
        userWithApplication?.role === "student"
          ? (userWithApplication?.applicationId?.last_step_completed || 1) < 7
            ? step
            : userWithApplication?.applicationId?.last_step_completed
          : step,
    };

    if (userWithApplication?.role !== "student") {
      inputData["updatedByAdmin"] = userId;
    }
    let existApplication = {};
    if (id) {
      existApplication = await Application.findOne({ id });
      // .populate("userInformationId")
      // .populate("applicationFile");
    }
    if (step === 0) {
      inputData.createdBy = inputs?.selectStudent || userId;
      if (userWithApplication?.role !== "student" && !id) {
        inputData["createdByAdmin"] = userId;
      }
      // inputData.last_step_completed=3
      inputData.offline_payment = !!inputs.offline_payment;
      inputData.isPaymentApprove = false;
      inputData.comment = "";
    } else if (step === 1) {
      if (
        !inputs?.offline_payment &&
        (!inputs.full_name ||
          !inputs.card_number ||
          !inputs.expire_date ||
          !inputs.cvv)
      ) {
        return exits.invalid({
          message: `All field is required. for step ${step}`,
        });
      }
      if (!inputs?.offline_payment) {
        const newData = {
          full_name: inputs.full_name,
          card_number: inputs.card_number,
          expire_date: inputs.expire_date,
          cvv: inputs.cvv,
        };

        if (existApplication?.applicationFee) {
          const applicationFee = await ApplicationFee.updateOne({
            id: existApplication?.applicationFee,
          }).set(newData);
        } else {
          const applicationFee = await ApplicationFee.create(newData)
            .intercept((error) => {
              console.log({ error });
              return error;
            })
            .fetch();
          inputData.applicationFee = applicationFee.id;
        }
      }
      inputData.createdBy = inputs?.selectStudent || userId;
      if (userWithApplication?.role !== "student" && !id) {
        inputData["createdByAdmin"] = userId;
      }
      inputData.offline_payment = !!inputs.offline_payment;
    } else if (step === 2) {
      // We will do later
    } else if (step === 3) {
      if (!inputs?.programId || !inputs?.semesterId) {
        return exits.invalid({
          message: `All field is required. for step ${step}`,
        });
      }
      inputData.programId = inputs.programId;
      inputData.semesterId = inputs.semesterId;
    } else if (step === 4) {
      if (
        !inputs.firstName ||
        !inputs.lastName ||
        !inputs.phoneNumber ||
        !inputs.email ||
        !inputs.country ||
        !inputs.city ||
        !inputs.nationality ||
        !inputs.date_of_birth ||
        !inputs.gender ||
        !inputs.maritalStatus ||
        !inputs.kInUserFullName ||
        !inputs.kInResidentialAddress ||
        !inputs.kInRelationship
      ) {
        return exits.invalid({
          message: `All field is required. for step ${step}`,
        });
      }
      const newData = {};
      newData.first_name = inputs.firstName;
      newData.middle_name = inputs.middleName;
      newData.last_name = inputs.lastName;
      newData.phone_number = inputs.phoneNumber;
      newData.phone_number_country_code =
        inputs?.phoneNumberCountryCode || "+234";
      newData.email = inputs.email;
      newData.country = inputs.country;
      newData.city = inputs.city;
      newData.nationality = inputs.nationality;
      newData.date_of_birth = inputs.date_of_birth;
      newData.gender = inputs.gender;
      newData.maritalStatus = inputs.maritalStatus;
      newData.physicalDisability = inputs.physicalDisability;
      newData.kInUserFullName = inputs.kInUserFullName;
      newData.kInResidentialAddress = inputs.kInResidentialAddress;
      newData.kInRelationship = inputs.kInRelationship;
      inputData.apply_scholarship = inputs.apply_scholarship
      
      console.log({ avatarFile: inputs.avatarFile });
      let userInformationGetId = {};
      if (existApplication?.createdBy) {
        userInformationGetId = await User.findOne({
          id: existApplication?.createdBy,
        }).select("userInformationId");
      }
      if (existApplication?.userInformationId) {
        // TODO: need to store inside the userinfo and remove from the application
        const userInformation = await UserInformation.updateOne({
          id: existApplication?.userInformationId,
        }).set(newData);
      } else {
        const userInformation = await UserInformation.create(newData).fetch();
        inputData.userInformationId = userInformation.id;
      }

      if (userInformationGetId?.userInformationId) {
        const userInformation = await UserInformation.updateOne({
          id: userInformationGetId?.userInformationId,
        }).set(newData);
      }
      if (existApplication?.createdBy && inputs.avatarFile) {
        await User.updateOne({
          id: existApplication?.createdBy,
        }).set({
          avatarFile: inputs.avatarFile,
        });
      }

      const nationalityFile = inputs?.nationalityFile;
      if (nationalityFile) {
        const nationalityData = nationalityFile?.map((item) => ({
          fileSectionType: "nationalityId",
          fileId: item,
          applicationId: id,
        }));
        const fileUpload = await ApplicationFile.createEach(nationalityData);
      }
    } else if (step === 5) {
      const transcript = inputs.transcript;
      if (transcript) {
        const transcriptData = transcript?.map((item) => ({
          fileSectionType: "transcript",
          fileId: item,
          applicationId: id,
        }));
        const fileUpload = await ApplicationFile.createEach(transcriptData);
      }
      const recommendation = inputs.recommendation;

      if (recommendation?.length > 0) {
        recommendation.forEach(async (item) => {
          const newData = {
            applicationId: id,
            // uploadLatter: item.fileId,
            first_name: item.transcript_firstName,
            last_name: item.transcript_lastName,
            email: item.transcript_emailAddress,
            phone_number: item.transcript_phoneNumber,
            phone_number_country_code: item.transcript_phoneNumber_country,
          };
          if (item?.id) {
            const recommendationData = await Recommendation.updateOne({
              id: item.id,
            }).set(newData);
          } else {
            const recommendationData = await Recommendation.create(newData);
          }
        });
      }
    } else if (step === 6) {
      const goal = inputs.goal;
      if (goal) {
        const applicationFileData = inputs.goal?.map((item) => ({
          fileId: item,
          fileSectionType: "goal",
          applicationId: id,
        }));
        const fileUpload = await ApplicationFile.createEach(
          applicationFileData
        );
      }
      inputData.goal_statement = inputs.goal_statement;
    } else if (step === 7) {
      const csv = inputs.csv;
      if (csv) {
        const fileUpload = await ApplicationFile.create({
          fileSectionType: "csv",
          fileId: csv?.[0],
          applicationId: id,
        });
      }
    } else if (step === 8) {
      //  Last step
      inputData.is_completed = true;
      inputData.application_status = "pending";
      inputData.comment = "";

      const admissionUsers = await User.find({ role: "admission" }).select(
        "id"
      );
      admissionUsers.forEach(async (admissionUser) => {
        await sails.helpers.sendMails.with({
          userId: existApplication?.createdBy || userId,
          type: "application_submitted",
          role: "admission",
          roleId: admissionUser?.id,
        });
      });

      const notification = await sails.helpers.notification.with({
        type: "application_approval",
        id: inputs?.selectStudent || userId,
        // application: applicationData?.id,
      });
    }

    let applicationData = {};
    if (!id) {
      const currentUserId = inputs?.selectStudent || userId;
      const studentId = await Student.findOne({ user: currentUserId });
      if (studentId?.id) {
        inputData["student"] = studentId?.id;
      }
      applicationData = await Application.create(inputData)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
      const user = await User.updateOne({ id: currentUserId }).set({
        applicationId: applicationData.id,
      });
    } else {
      applicationData = await Application.updateOne({
        id: id,
      }).set(inputData);
    }
    if (step === 0) {
      const paymentData = {
        approve_payment: null,
        user: userId,
        application: applicationData?.id,
        payment_type: "offline",
        transaction_id: userId,
        module_type: "application",
        payment_status: "success",
        amount: inputs?.application_fee || 0,
      };

      const payment = await Payment.create(paymentData);
      const notification = await sails.helpers.notification.with({
        type: "application_fees",
        id: inputs?.selectStudent || userId,
        application: applicationData?.id,
      });
      if (inputs?.offline_payment && inputs.offline_payment_receipt_file) {
        const offlinePaymentFile = inputs.offline_payment_receipt_file;
        if (offlinePaymentFile) {
          const offlinePaymentFileData = offlinePaymentFile?.map((item) => ({
            fileSectionType: "application_fee_offline_payment",
            fileId: item,
            applicationId: applicationData?.id,
          }));
          const fileUpload = await ApplicationFile.createEach(
            offlinePaymentFileData
          );
        }
        const financeUsers = await User.find({ role: "finance" }).select("id");
        financeUsers.forEach(async (financeUser) => {
          await sails.helpers.sendMails.with({
            userId: inputs?.selectStudent || userId,
            type: "application_fee_submitted",
            role: "finance",
            roleId: financeUser?.id,
          });
        });
      }
    }

    // let mailStatus = await sails.helpers.sendEmail.with({
    //   to: await sails.config.testEmailAccount,
    //   subject: "Application by Admin",
    //   template: "common/email-template",
    //   typeOfSend: "now", // 'now', 'queue', 'preview'
    //   layout: "layout-email",
    //   templateData: {
    //     header: "Application by Admin",
    //     body: "Your application created by admin",
    //     footer: await sails.config.testEmailAccount,
    //   },
    // });

    // console.log({ mailStatus });

    return exits.success({
      message: "Application has been created successfully.",
      data: applicationData,
    });
  },
};
