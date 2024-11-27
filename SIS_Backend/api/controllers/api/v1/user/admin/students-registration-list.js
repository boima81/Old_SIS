var moment = require("moment");
const users = require("../users");

module.exports = {
  friendlyName: "View Applications",

  description: "Display Applications",

  inputs: {},
  //   exits: {
  //     success: {
  //     }
  //   },

  fn: async function (inputs, exits) {
    // let result = await sails.helpers.datatable(Project, this.req.query);
    const searchQuery = this.req?.param("search");
    const search = decodeURI(searchQuery || "");
    const studentId = this.req.param("studentId");

    const findRegistration = await Registration.find({
      createdBy: studentId,
    }).populateAll();

    if (findRegistration.length > 0) {
      const findStudents = await Student.findOne({
        user: findRegistration[0]?.createdBy?.id,
      }).populateAll();

      for (const data of findRegistration) {
        const [latestFile] = await ApplicationFile.find({
          applicationId: data.applicationId?.id,
        })
          .sort("createdAt DESC")
          .limit(1)
          .populateAll();
        data.receipt = latestFile?.fileId?.url;

        const findPayment = await PaymentHistory.find({
          registration_id: data.id,
        });
        const findInvoice = await Invoice.findOne({
          where: {
            registration: data.id
          }
        })

        data.isEditPayment = findInvoice?.amount_paid > 0 ? true : false;
      }

      const findStudent = await Student.findOne({
        user: studentId,
      }).populateAll();

      const findPrograms = findRegistration
        ?.map((data) => {
          return data.programId?.name;
        })
        .join(", ");
      let findUserName = await User.findOne({
        id: studentId,
      }).populate("userInformationId");

      return exits.success({
        data: findRegistration,
        student: {
          studentName: `${findUserName?.userInformationId?.first_name} ${findUserName?.userInformationId?.last_name}`,
          studentId: findStudents?.student_id,
          programs: findPrograms || [],
        },
      });
    } else {
      return exits.success({
        data: [],
        student: {
          studentName: "",
          studentId: "",
          programs: [],
        },
      });
    }
  },
};
