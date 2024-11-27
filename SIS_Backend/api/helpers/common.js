const moment = require("moment");
const currencySymbol = "₦"
// "$"
module.exports = {
  friendlyName: "Common helper",

  description: "",

  inputs: {
    id: {
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
    function addDollar(value) {
      return `${currencySymbol}${value}`;
    }
    console.log({ inputs });
    const scheduleData = {
      mon_wed_fri: "M/W/F",
      tue_thu_sat: "T/TH/S",
      tue_thu: "T/TH",
      online: "Online",
    };
     let registrationData = await Registration.find({
      id: inputs?.id,
    })
      .populate("invoiceId")
      .populate("programId")
      .populate("semesterId")
      .populate("courses")
      .sort("id DESC")
      .limit(1)
    registrationData = registrationData?.[0]
    const perCourseFee = await CoursesFees.find().limit(1);
    const registrationFees = await RegistrationFees.find().meta({
      skipRecordVerification: true,
    });

    const coursesValue = registrationData?.courses || [];
    const perCreditPrice = perCourseFee?.[0]?.amount || {};
    const extraFees = registrationFees;

    if (coursesValue?.length > 0) {
      const rows = coursesValue;
      // const extraFees = [
      //   {
      //     id: 1,
      //     extraFees: addDollar(10),
      //   },
      //   {
      //     id: 2,
      //     extraFees: addDollar(20),
      //   },
      //   {
      //     id: 1,
      //     extraFees: addDollar(10),
      //   },
      //   {
      //     id: 2,
      //     extraFees: addDollar(20),
      //   },
      // ];
      let finalTotal = 0;
      const total = extraFees
        ?.map((data) => {
          const totalData = Number(data.extraFees?.split("$").pop());
          const newTotalCount = finalTotal + totalData;
          return newTotalCount;
        })
        .reduce((sumFee, current) => (sumFee || 0) + (current || 0), 0);
      finalTotal = total;
      // const extraFees = 10;
      // let finalTotal = 0 + extraFees;
      const tableCourseData = [];
      for (let index = 0; index < rows?.length; index++) {
        const data = rows[index];

        const credit = Number(data?.course_credit || 0);
        const totalData = Number(credit) * Number(perCreditPrice || 0);
        const newTotalData = total + totalData;
        finalTotal += totalData;
        console.log({ finalTotal });
        const startTime = data?.time
          ? moment(data?.time, "hh:mm A").format("hh:mm A")
          : null;
        const lastTime = data?.last_time
          ? moment(data?.last_time, "hh:mm A").format("hh:mm A")
          : null;
        const concatDate = `${
          startTime ? (lastTime ? `${startTime}-${lastTime}` : startTime) : ""
        }`;
        const scheduleName = Object.keys(data?.schedule || {})
          ?.filter((schedule) => data.schedule[schedule])
          ?.map((schedule) => scheduleData[schedule])
          ?.join(", ");
        let sectionsData = {};
        const courseData = await Course.findOne({
          id: data?.id,
        });
        if (courseData?.sections) {
          sectionsData = await Sections.findOne({
            id: courseData?.sections,
          });
        }
        let instructorData = {};
        if (courseData?.instructor) {
          instructorData = await User.findOne({
            id: courseData?.instructor,
          }).populate("userInformationId");
          const instructUserInfo = instructorData?.userInformationId?.toJSON();
          instructorData = {
            ...instructorData,
            name: instructUserInfo?.displayName,
          };
        }

        tableCourseData.push({
          id: data?.course_id || data?.id,
          courseNo: data?.course_no,
          name: data?.name,
          category: data?.category || "-",
          credit,
          section: sectionsData?.sectionNumber || "-",
          schedule: Object.keys(data?.schedule || {})
            ?.filter((schedule) => data.schedule[schedule])
            ?.map((schedule) => scheduleData[schedule])
            ?.join(", "),
          time: concatDate,
          classroom: data?.classroom,
          instructor: instructorData?.name || "-",
          price: addDollar(perCreditPrice || 0),
          total: addDollar(totalData),
          table: ` <tr>
                      <td>${data?.course_id || data?.id}</td>
                      <td>${data?.course_no}</td>
                      <td>${data?.name}</td>
                      <td class="text-center">${data?.category}</td>
                      <td class="text-center">${credit}</td>
                      <td class="text-center">${
                        sectionsData?.sectionNumber
                      }</td>
                      <td class="text-right">${scheduleName}</td>
                      <td class="text-right">${concatDate}</td>
                      <td class="text-right">${data?.classroom}</td>
                      <td class="text-right">${instructorData?.name || ""}</td>
                      <td class="text-right">${addDollar(
                        perCreditPrice || 0
                      )}</td>
                      <td class="text-right">${addDollar(totalData)}</td>
                    </tr>
                    `,
        });
      }

      const newExtraFees = extraFees?.map((registerFee) => ({
        id: "",
        courseNo: "",
        course: "",
        category: "",
        credit: "",
        section: "",
        schedule: "",
        time: "",
        classroom: "",
        instructor: "",
        creditFees: registerFee?.name,
        extraFees: addDollar(registerFee?.amount),
        table: ` <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                      <td class="text-right">${registerFee?.name}</td>
                      <td class="text-right">${registerFee?.amount}</td>
                    </tr>`,
        // creditFees: registerFee?.name,
        // extraFees: addDollar(registerFee?.amount),
      }));

      console.log({ tableCourseData });
      return exits.success({
        data: [...tableCourseData, ...newExtraFees],
        total: addDollar(finalTotal),
        total_without_dollar: finalTotal,
        program: registrationData?.programId?.name,
        semester: registrationData?.semesterId?.name,
      });
    }
    return exits.success({ data: [] });
  },
};
