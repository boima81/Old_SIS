const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
var path = require("path");
const moment = require("moment");
module.exports = {
  friendlyName: "Create",

  description: "Create Application.",

  inputs: {
    selectStudent: {
      type: "number",
      required: false,
      allowNull: true,
    },
    courses: {
      type: "ref",
      require: false,
    },
    total_amount: {
      type: "number",
      required: false,
    },
    paymentTerm: {
      type: "number",
      require: false,
    },
    totalTerms: {
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
    step: {
      type: "number",
      required: true,
    },
    id: {
      type: "number",
      required: false,
      allowNull: true,
    },
    update: {
      type: "boolean",
      required: false,
    },
    offline_payment_receipt_file: {
      type: "ref",
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
    const userWithApplication = await User.findOne({
      id: inputs?.selectStudent || userId,
    });
    console.log({ inputs });
    if (
      !userWithApplication?.applicationId
      // &&                               userWithApplication?.role === "student"
    ) {
      return exits.invalid({
        message: `You have not applied yet please apply first using application form or contact admin`,
      });
    }
    const registrationFilter = {
      applicationId: userWithApplication?.applicationId,
      // is_completed: false,
      is_approved: false,
    };
    // const registrationCount = await Registration.count(registrationFilter);
    // if (registrationCount > 1) {
    //   return exits.invalid({
    //     message: `Multiple registration found please contact admin`,
    //   });
    // }
    let registrationOld = await Registration.find(registrationFilter)
      .populate("registrationFee")
      .sort("id DESC")
      .limit(1);
    console.log({ registrationOld });
    // Another user id try or already completed if it's student then
    registrationOld = registrationOld?.[0] || {};
    if (
      id &&
      !registrationOld?.id &&
      !inputs?.selectStudent &&
      userWithApplication?.role === "student"
    ) {
      return exits.invalid({
        message: `Registration not found please contact admin`,
      });
    }
    // Updated id not math with old id
    if (registrationOld?.id && id && registrationOld?.id !== id) {
      return exits.invalid({
        message: `Already registration on process please contact admin`,
      });
    }
    const step = inputs.step;

    const inputData = {
      last_step_completed:
        (registrationOld?.last_step_completed || 1) <= 4
          ? step
          : registrationOld?.last_step_completed,
    };
    if (userWithApplication?.role !== "student") {
      inputData["updatedByAdmin"] = userId;
    }
    let existRegistration = {};
    if (id) {
      existRegistration = await Registration.findOne({ where: { id } });
      // .populate("userInformationId")
      // .populate("applicationFile");
    }
    if (step === 1) {
      if (inputs?.courses?.length <= 0) {
        return exits.invalid({
          message: `All field is required. for step ${step}`,
        });
      }
      inputData.courses = inputs.courses;
      inputData.programId = inputs.programId;
      inputData.semesterId = inputs.semesterId;
      inputData.createdBy = inputs?.selectStudent || userId;
      inputData.applicationId = userWithApplication?.applicationId;
      if (userWithApplication?.role !== "student" && !id) {
        inputData["createdByAdmin"] = userId;
      }
    }
    if (step === 2) {
      if (inputs?.total_amount <= 0) {
        return exits.invalid({
          message: `All field is required. for step ${step}`,
        });
      }
      const invoiceWhere = {};

      // or: [
      //   {
      //     createdBy: userWithApplication?.id,
      //   },
      let invoiceData = await Invoice.find({
        registration: existRegistration?.id,
      })
        .sort("id DESC")
        .limit(1);
      invoiceData = invoiceData?.[0];
      if (!invoiceData) {
        let invoiceOldData = await Invoice.find().sort("id DESC").limit(1);
        console.log({ invoiceOldData });
        invoiceData = await Invoice.create({
          total_amount: inputs?.total_amount,
          totalTerms: inputs?.totalTerms,
          paymentTerm: inputs?.paymentTerm,
          createdBy: userWithApplication?.id,
          invoice_number: (invoiceOldData?.[0]?.id || 0) + 1,
          registration: existRegistration?.id,
        }).fetch();
      } else {
        invoiceData = await Invoice.updateOne({
          id: invoiceData?.id,
        }).set({
          total_amount: inputs?.total_amount,
          createdBy: userWithApplication?.id,
          totalTerms: inputs?.totalTerms,
          paymentTerm: inputs?.paymentTerm,
          registration: existRegistration?.id,
        });
      }
      inputData.invoiceId = invoiceData.id;
      inputData.offline_payment = inputs?.offline_payment;
      // inputData.isPaymentApprove = false;
      console.log({ existRegistration, id });
      // Id got the undefined
      // When first time do that time give  a error
      const receiptGenerateData = await sails.helpers.generateInvoice.with({
        id: existRegistration?.id || id || registrationOld?.id,
        createdBy: userWithApplication?.id,
        type: "billing",
      });
      console.log({ receiptGenerateData });
      if (receiptGenerateData?.error) {
        return exits.invalid({
          message: receiptGenerateData?.error,
        });
      }
      const baseUrl = sails.config.custom.baseUrl;
      await sails.helpers.sendMails.with({
        userId: userWithApplication?.id,
        type: "billing_email",
        attachments: [
          {
            filename: receiptGenerateData?.fileName,
            path: `${baseUrl}${receiptGenerateData?.path}`,
            // cid: receiptGenerateData?.name,
          },
        ],
      });

      //   const tbody = receiptGenerateData?.data?.map(
      //     (receiptGenerate) => receiptGenerate?.table
      //   );
      //   let file = {
      //     content: `<link
      //   rel="stylesheet"
      //   href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
      //   integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      //   crossorigin="anonymous"
      // />

      // <script
      //   src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      //   integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      //   crossorigin="anonymous"
      // ></script>
      // <script
      //   src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
      //   integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
      //   crossorigin="anonymous"
      // ></script>
      // <script
      //   src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
      //   integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
      //   crossorigin="anonymous"
      // ></script>

      // <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
      // <script src="https://cdn.tailwindcss.com"></script>

      // <style>
      //   .invoice-title h2,
      //   .invoice-title h3 {
      //     display: inline-block;
      //   }

      //   .table > tbody > tr > .no-line {
      //     border-top: none;
      //   }

      //   .table > thead > tr > .no-line {
      //     border-bottom: none;
      //   }

      //   .table > tbody > tr > .thick-line {
      //     border-top: 2px solid;
      //   }
      // </style>
      // <div class="container">
      //   <div class="row">
      //     <div class="col-12">
      //       <div class="invoice-title">
      //         <h2>Invoice</h2>
      //         <h3 class="pull-right">Order # 12345</h3>
      //       </div>
      //       <hr />
      //       <div class="row">
      //         <div class="col-6">
      //           <address>
      //             Student Id: <br />
      //             Student Name: <br />
      //             Program: <br />
      //             Semester:
      //           </address>
      //         </div>
      //         <div class="col-6 text-right">
      //           <address>
      //             ${currentDate}
      //           </address>
      //         </div>
      //       </div>
      //     </div>
      //   </div>

      //   <div class="row">
      //     <div class="col-md-12">
      //       <div class="panel panel-default">
      //         <div class="panel-heading">
      //           <h3 class="panel-title"><strong>Order summary</strong></h3>
      //         </div>
      //         <div class="panel-body">
      //           <div class="table-responsive">
      //             <table class="table table-condensed">
      //               <thead>
      //                 <tr>
      //                   <td><strong>Course Code</strong></td>
      //                   <td><strong>Course No.</strong></td>
      //                   <td class="text-center"><strong>Course</strong></td>
      //                   <td class="text-center"><strong>Category</strong></td>
      //                   <td class="text-right"><strong>Credit</strong></td>
      //                   <td class="text-right"><strong>Section</strong></td>
      //                   <td class="text-right"><strong>Schedule</strong></td>
      //                   <td class="text-right"><strong>Time</strong></td>
      //                   <td class="text-right"><strong>Classroom</strong></td>
      //                   <td class="text-right"><strong>Instructor</strong></td>
      //                   <td class="text-right"><strong>Fees Per Credit</strong></td>
      //                   <td class="text-right"><strong>Course Fees</strong></td>
      //                 </tr>
      //               </thead>
      //               <tbody>

      //                ${tbody}
      //                 <tr>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line text-center">
      //                     <strong>Payment Terms</strong>
      //                   </td>
      //                   <td class="thick-line text-right">PT</td>
      //                 </tr>
      //                 <tr>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line text-center">
      //                     <strong>Amount Paid</strong>
      //                   </td>
      //                   <td class="thick-line text-right">$${
      //                     invoiceData?.amount_paid || 0
      //                   }</td>
      //                 </tr>
      //                 <tr>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line text-center">
      //                     <strong>Balance</strong>
      //                   </td>
      //                   <td class="thick-line text-right">$${
      //                     (invoiceData?.total_amount || 0) -
      //                     (invoiceData?.amount_paid || 0)
      //                   }</td>
      //                 </tr>
      //                 <tr>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line"></td>
      //                   <td class="thick-line text-center"><strong>Total</strong></td>
      //                   <td class="thick-line text-right">$${
      //                     invoiceData?.total_amount
      //                   }</td>
      //                 </tr>
      //               </tbody>
      //             </table>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // `,
      //   };

      //   let InvoicePath = `assets/invoice/${
      //     existRegistration?.createdBy || userId
      //   }/${existRegistration?.id || id}`;
      //   const dirName = path.dirname(InvoicePath);
      //   console.log({ dirName });
      //   if (!fs.existsSync(InvoicePath)) {
      //     fs.mkdir(InvoicePath, { recursive: true }, (error) =>
      //       console.log({ error })
      //     );
      //   }

      //   InvoicePath += "/billing.pdf";
      //   await html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      //     console.log("PDF Buffer:-", pdfBuffer);
      //     fs.writeFile(InvoicePath, pdfBuffer, async (err) => {
      //       console.log({ err });
      //       if (!err) {
      //         const receiptData = await Receipt.findOne({
      //           registration: existRegistration?.id || id,
      //           feeType: "billing",
      //         });
      //         const receiptInputData = {
      //           feeType: "billing",
      //           filePath: InvoicePath,
      //           registration: existRegistration?.id || id,
      //           createdBy: existRegistration?.createdBy || userId,
      //         };
      //         if (receiptData) {
      //           await Receipt.updateOne({
      //             id: receiptData?.id,
      //           }).set(receiptInputData);
      //         } else {
      //           const receiptCreated = await Receipt.create(
      //             receiptInputData
      //           ).fetch();
      //           console.log({ receiptCreated });
      //         }
      //       }
      //     });
      //   });
    }
    if (step === 3) {
      // if (
      //   !inputs?.offline_payment &&
      //   (!inputs.full_name ||
      //     !inputs.card_number ||
      //     !inputs.expire_date ||
      //     !inputs.cvv)
      // ) {
      //   return exits.invalid({
      //     message: `All field is required. for step ${step}`,
      //   });
      // }
      // if (!inputs?.offline_payment) {
      //   const newData = {
      //     full_name: inputs.full_name,
      //     card_number: inputs.card_number,
      //     expire_date: inputs.expire_date,
      //     cvv: inputs.cvv,
      //   };
      //   if (registrationOld?.registrationFee) {
      //     const registrationFeeId = await ApplicationFee.updateOne({
      //       id: userWithApplication?.applicationId?.applicationFee,
      //     }).set(newData);
      //   } else {
      //     const registrationFeeId = await ApplicationFee.create(newData)
      //       .intercept((error) => {
      //         console.log({ error });
      //         return error;
      //       })
      //       .fetch();
      //     inputData.registrationFee = registrationFeeId.id;
      //   }
      //   // inputData.createdBy = userId;
      // }
      inputData.offline_payment = !!inputs.offline_payment;
      // inputData.isPaymentApprove = false;
      inputData.comment = null;

      if (inputData?.offline_payment) {
        inputData.last_step_completed = 3;
        inputData.isPaymentApprove = false;
        inputData.is_completed = true;

        const paymentData = {
          approve_payment: null,
          user: userWithApplication?.id,
          registration: id,
          payment_type: "offline",
          transaction_id: userId,
          module_type: "registration",
          payment_status: "success",
          amount: inputs?.total_amount || 0,
        };

        const payment = await Payment.create(paymentData);
        await sails.helpers.notification.with({
          type: "registration_approval",
          id: userWithApplication?.id,
          registration: id,
        });
        const notification = await sails.helpers.notification.with({
          type: "registration_fees",
          id: userWithApplication?.id,
          registration: id,
        });
      }
      console.log({ inputData });
    }
    if (step === 4) {
      inputData.offline_payment = inputs?.offline_payment;
      // inputData.isPaymentApprove = false;
      inputData.comment = null;

      if (inputData?.offline_payment) {
        const paymentData = {
          approve_payment: null,
          user: userId,
          registration: id,
          payment_type: "offline",
          transaction_id: userId,
          module_type: "registration",
          payment_status: "success",
          amount: inputs?.total_amount || 0,
        };

        const payment = await Payment.create(paymentData);
        inputData.last_step_completed = 4;
        inputData.isPaymentApprove = false;
        inputData.is_completed = true;

        await sails.helpers.notification.with({
          type: "registration_approval",
          id: userWithApplication?.id,
          registration: id,
        });
        await sails.helpers.notification.with({
          type: "registration_fees",
          id: userWithApplication?.id,
          registration: id,
        });
      }
    }
    if (step === 5) {
      //  Last step
      inputData.is_completed = true;
    }

    let registrationData = {};
    if (!id) {
      registrationData = await Registration.create(inputData).fetch();
      const registrationCourse = [];
      inputData.courses?.forEach((course) => {
        registrationCourse.push({
          registration: registrationData.id,
          course,
        });
      });
      const registrationCoursesData = await RegistrationCourse.createEach(
        registrationCourse
      );
      registrationData = registrationData;
    } else {
      console.log({ inputData });
      registrationData = await Registration.updateOne({
        id: id,
      }).set(inputData);
    }

    if (inputData?.offline_payment && inputs.offline_payment_receipt_file) {
      const offlinePaymentFile = inputs.offline_payment_receipt_file;
      if (offlinePaymentFile) {
        const offlinePaymentFileData = offlinePaymentFile?.map((item) => ({
          fileSectionType: "registration_fee_offline_payment",
          fileId: item,
          applicationId: registrationFilter?.applicationId,
        }));
        const fileUpload = await ApplicationFile.createEach(
          offlinePaymentFileData
        );
      }

      const financeUsers = await User.find({ role: "finance" }).select("id");
      financeUsers.forEach(async (financeUser) => {
        await sails.helpers.sendMails.with({
          userId: userWithApplication?.id,
          type: "registration_fee_submitted",
          role: "finance",
          roleId: financeUser?.id,
        });
      });

      const admissionUsers = await User.find({ role: "admission" }).select(
        "id"
      );
      admissionUsers.forEach(async (admissionUser) => {
        await sails.helpers.sendMails.with({
          userId: userWithApplication?.id,
          type: "registration_submitted",
          role: "admission",
          roleId: admissionUser?.id,
        });
      });
    }

    return exits.success({
      message: "Registration created successfully.",
      data: registrationData,
    });
  },
};
