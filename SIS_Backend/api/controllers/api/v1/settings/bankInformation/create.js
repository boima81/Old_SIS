module.exports = {
  friendlyName: "Create Update",

  description: "Create Update Application Setting.",

  inputs: {
    offlinePayment: {
      type: "boolean",
      required: false,
      // allowNull: true,
    },
    onlinePayment: {
      type: "boolean",
      required: false,
      // allowNull: true,
    },
    bankName: {
      type: "string",
      require: true,
    },
    accountName: {
      type: "string",
      require: true,
    },
    accountNumber: {
      type: "string",
      require: true,
    },
    swiftCode: {
      type: "string",
      require: true,
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
    let bankInformationSettings = await BankInformationSettings.find().limit(1);
    const bankInformationId = bankInformationSettings?.[0]?.id;
    const storeData = {
      ...inputs,
    };

    if (bankInformationId) {
      bankInformationSettings = await BankInformationSettings.updateOne({
        id: bankInformationId,
      }).set(storeData);
    } else {
      bankInformationSettings = await BankInformationSettings.create(storeData)
        .intercept((error) => {
          console.log({ error });
          return error;
        })
        .fetch();
    }
    return exits.success(bankInformationSettings);
  },
};
