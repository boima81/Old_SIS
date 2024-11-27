module.exports = {
  friendlyName: "View Single User",

  description: "Display Single User",

  inputs: {},

  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    // let result = await sails.helpers.datatable(Project, this.req.query);
    await User.findOne({
      id: this.req.params.id,
    })
      .populate("userInformationId")
      .populate("applicationId")
      .populate("agencyId")
      .exec(async function (err, result) {
        const element = result;

        if (element?.userInformationId) {
          const student = await Student.findOne({
            id: element?.userInformationId.student,
          });

          element.userInformationId.studentData = student;
        }

        if (element?.applicationId?.id) {
          let registrationData = await Registration.find({
            applicationId: element?.applicationId?.id,
          })
            .populate("programId")
            .populate("semesterId")
            .populate("courses")
            .populate("invoiceId")
            .sort("id DESC")
            
          // const invoicesData = registrationData?.reduce(
          //   (sum, invoice) => ({
          //     total_amount:
          //       sum.total_amount + (invoice?.invoiceId?.total_amount || 0),
          //     amount_paid:
          //       sum.amount_paid + +(invoice?.invoiceId?.amount_paid || 0),
          //   }),
          //   {
          //     total_amount: 0,
          //     amount_paid: 0,
          //   }
          // );
          console.log({ registrationData })
          const invoicesId = registrationData?.[0]?.invoiceId?.toJSON();
          const remainingBalance = invoicesId?.remainingBalance;
          element.registrationData = { ...registrationData?.[0] || {},
            invoiceId: {
              ...registrationData?.[0]?.invoiceId,
              remainingBalance
            },
          };
        }

        return exits.success(element);
      });
    // return exits.success(user);
  },
};
