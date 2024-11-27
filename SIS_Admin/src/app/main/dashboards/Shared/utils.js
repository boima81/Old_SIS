/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
import { Country } from "country-state-city";
import moment from "moment";
import { toastr } from "react-redux-toastr";

export const currencySymbol = "₦";
// "$"

export const currencyName = `NGN`;

export const programOptions = [
  {
    id: 1,
    value: 1,
    label: "Master of Science in Cyber Security",
  },
  {
    id: 2,
    value: 2,
    label: "Master of Science in Digital Forensics",
  },
  {
    id: 3,
    value: 3,
    label: "Master of Science in Information Security",
  },
  {
    id: 4,
    value: 4,
    label: "Master of Science in Forensic Accounting",
  },
];

export const semesterOptions = [
  {
    id: 1,
    value: 1,
    label: "Semester 1",
  },
  {
    id: 2,
    value: 2,
    label: "Semester 2",
  },
  {
    id: 3,
    value: 3,
    label: "Vacation School",
  },
];

export const studentOption = [
  {
    id: 1,
    value: 1,
    label: "Student 1",
  },
  {
    id: 2,
    value: 2,
    label: "Student 2",
  },
  {
    id: 3,
    value: 3,
    label: "Student 3",
  },
];

export const sectionsOption = [
  {
    id: 1,
    value: 1,
    label: "Section 1",
  },
  {
    id: 2,
    value: 2,
    label: "Section 2",
  },
  {
    id: 3,
    value: 3,
    label: "Section 3",
  },
];

export const instructorOption = [
  {
    id: 1,
    value: 1,
    label: "Instructor 1",
  },
  {
    id: 2,
    value: 2,
    label: "Instructor 2",
  },
  {
    id: 3,
    value: 3,
    label: "Instructor 3",
  },
];
export const paymentTermsOption = [
  {
    id: 1,
    value: 1,
    label: "One Payment Terms",
  },
  {
    id: 2,
    value: 2,
    label: "Two Payment Terms",
  },
  {
    id: 3,
    value: 3,
    label: "Three Payment Terms",
  },
  {
    id: 4,
    value: 4,
    label: "Four Payment Terms",
  },
];

export const maritalStatusOptions = [
  {
    id: 1,
    value: "single",
    label: "Single",
  },
  {
    id: 2,
    value: "married",
    label: "Married",
  },
  {
    id: 3,
    value: "separated",
    label: "Separated",
  },
  {
    id: 4,
    value: "divorced",
    label: "Divorced",
  },
  {
    id: 5,
    value: "widowed",
    label: "Widowed",
  },
];
export const genderOption = [
  {
    id: 1,
    value: "male",
    label: "Male",
  },
  {
    id: 2,
    value: "female",
    label: "Female",
  },
];
export const registrationOption = [
  {
    id: 1,
    value: "pending",
    label: "Pending",
  },
  {
    id: 2,
    value: "approved",
    label: "Approved",
  },
  {
    id: 3,
    value: "feedback",
    label: "Feedback",
  },
  {
    id: 2,
    value: "decline",
    label: "Decline",
  },
];
export const courseOption = [
  {
    id: 1,
    value: "course1",
    label: "Course 1",
  },
  {
    id: 2,
    value: "course2",
    label: "Course 2",
  },
];
export const gradeOption = [
  {
    id: 1,
    value: "grade1",
    label: "Grade 1",
  },
  {
    id: 2,
    value: "grade2",
    label: "Grade 2",
  },
];

export const radioAgency = [
  {
    id: 1,
    value: true,
    label: "Yes",
  },
  {
    id: 2,
    value: false,
    label: "No",
  },
];

export const agencyOptions = [
  {
    id: 1,
    value: 1,
    label: "Agency 1",
  },
  {
    id: 2,
    value: 2,
    label: "Agency 2",
  },
  {
    id: 3,
    value: "other",
    label: "Others",
  },
];
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const dateInputFormate = "dd/MM/yyyy";
export const cardDateInputFormate = "MM/yyyy";
export const dateIosFormate = "DD/MM/YYYY";
export const dateDBFormate = "YYYY/MM/DD";

export function getAllCountry() {
  const list = [];
  const getData = Country.getAllCountries();
  getData.map((data) => list.push({ label: data.name, value: data.isoCode }));
  return list;
}

export function tableRows(values) {
  const Data = Object.keys(values)
    .map((data) => {
      return values[data]?.status == true ? values[data] : "";
    })
    .filter(({ status, ...data }) => data != "");

  return Data.map(({ status, ...data }) => data).filter((data) => data != "");
}

const scheduleData = {
  mon_wed_fri: "M/W/F",
  tue_thu_sat: "T/TH/S",
  tue_thu: "T/TH",
  online: "Online",
};

export function apiToValues(
  coursesData,
  coursesValue,
  perCreditPrice = 0,
  extraFees = []
) {
  console.log({ coursesData, coursesValue, perCreditPrice, extraFees });
  if (coursesValue?.length > 0) {
    const rows =
      coursesData?.filter((courseData) =>
        coursesValue?.includes(courseData?.id)
      ) || [];
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
        const totalData = Number(data.extraFees?.split(currencySymbol).pop());
        const newTotalCount = finalTotal + totalData;
        return newTotalCount;
      })
      .reduce((sumFee, current) => (sumFee || 0) + (current || 0), 0);
    finalTotal = total;
    // const extraFees = 10;
    // let finalTotal = 0 + extraFees;
    const tableCourseData = rows?.map?.((data) => {
      const credit = Number(data?.creditType === 1 ? data?.course_credit || 0 : 0);
      const totalData = data?.creditType === 1 ? Number(credit) * Number(perCreditPrice || 0) : Number(data?.price);
      const newTotalData = total + totalData;
      finalTotal += totalData;
      console.log({ finalTotal });
      const startTime = data?.time
        ? moment(data?.time, "hh:mm A").format("hh A")
        : null;
      const lastTime = data?.last_time
        ? moment(data?.last_time, "hh:mm A").format("hh A")
        : null;
      const concatDate = `${startTime ? (lastTime ? `${startTime}-${lastTime}` : startTime) : ""
        }`;
      return {
        id: data?.course_id || data?.id,
        courseNo: data?.course_no,
        name: data?.name,
        category: data?.category,
        credit,
        section: data?.sections?.sectionNumber,
        schedule: Object.keys(data?.schedule || {})
          ?.filter((schedule) => data.schedule[schedule])
          ?.map((schedule) => scheduleData[schedule])
          ?.join(", "),
        time: concatDate,
        classroom: data?.classroom,
        instructor: data?.instructor?.name,
        price: data?.creditType === 1 ?addDollar(perCreditPrice || 0):"-",
        total: addDollar(totalData),
      };
    });
    return {
      data: tableCourseData,
      total: addDollar(finalTotal),
      total_without_dollar: finalTotal,
    };
  }
  return [];
}

export function apiToValuesDetails(
  coursesData,
  coursesValue,
  perCreditPrice = 0,
  extraFees = []
) {
  console.log({ coursesData, coursesValue, perCreditPrice, extraFees });
  if (coursesValue?.length > 0) {
    const rows =
      coursesData?.filter((courseData) =>
        coursesValue?.includes(courseData?.id)
      ) || [];
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
        const totalData = Number(data.extraFees?.split(currencySymbol).pop());
        const newTotalCount = finalTotal + totalData;
        return newTotalCount;
      })
      .reduce((sumFee, current) => (sumFee || 0) + (current || 0), 0);
    finalTotal = total;
    // const extraFees = 10;
    // let finalTotal = 0 + extraFees;
    const tableCourseData = rows?.map?.((data) => {


      const credit = Number(data?.creditType === 1 ? data?.course_credit || 0 : 0);
      const totalData = data?.creditType === 1 ? Number(credit) * Number(perCreditPrice || 0) : Number(data?.price)
      const newTotalData = total + totalData;
      finalTotal += totalData;
      console.log({ finalTotal });
      const startTime = data?.time
        ? moment(data?.time, "hh:mm A").format("hh A")
        : null;
      const lastTime = data?.last_time
        ? moment(data?.last_time, "hh:mm A").format("hh A")
        : null;
      const concatDate = `${startTime ? (lastTime ? `${startTime}-${lastTime}` : startTime) : ""
        }`;
      return {
        date: "2024-05-19",
        amountDue: "0",
        amountPaid: "0",
        balanceDue: "Test",
        paymentTerms: "Test",
        semester: "Test",
        billing: "Test",
        receipt: "Test",
        action: "Test",
      };
    });
    return {
      data: tableCourseData,
      total: addDollar(finalTotal),
      total_without_dollar: finalTotal,
    };
  }
  return [];
}

export function addDollar(value, type = null) {
  if (value) {
    if (type === "int") {
      return `${currencySymbol}${parseInt(value, 10)}`;
    }
    return `${currencySymbol}${value}`;
  }
  return null;
}

export function toaster(title, response) {
  console.log("response-----------", response);
  const message = response?.data?.message || "Something went wrong+++++";
  return toastr.error(title, message, { timeOut: 6000 });
}

export function toasterSuccess(title, response) {
  const message = response || "Saved successfully";
  return toastr.success(title, message, { timeOut: 6000 });
}

export const analyticsSteps = () => [
  "Application Fees",
  "",
  "Academic Programs",
  "Application",
  "Transcript",
  "Goal Statement",
  "Resume or CV",
  "Review Submit",
];

export const countryCity = (country, city) => {
  const countryName = country ? Country.getCountryByCode(country)?.name : "";
  return `${city} ${countryName ? `,${countryName}` : ""}`;
};

export const dateFormate = (date) => {
  return date ? moment(date).format(dateIosFormate) : "-";
};

export const addDateFormate = (date) => {
  return moment(date).add(30, "days").format(dateIosFormate);
};
