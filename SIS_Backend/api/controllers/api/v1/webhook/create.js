const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  sails.config.custom.FLW_PUBLIC_KEY,
  sails.config.custom.FLW_SECRET_KEY
);

module.exports = {
  friendlyName: "Create Webhook",

  description: "Create Webhook Semester.",

  inputs: {},
  exits: {
    invalid: {
      statusCode: 401,
      description: "All field is required.",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function (inputs, exits) {
    const secretHash = sails.config.custom.fLWSECRETHASH;
    const signature = this.req.headers["verif-hash"];
    console.log({ secretHash, signature });
    if (!signature || signature !== secretHash) {
      // This request isn't from Flutterwave; discard
      return exits.invalid({
        message: `Not Authorize`,
      });
    }
    const body = this.req.body;
    const eventType = body.event;
    const status = body?.data?.status;

    if (eventType === "charge.completed" && status === "successful") {
      const customer = body?.data?.customer;
      const card = body?.data?.card;

      const email = customer?.email;

      // console.log({
      //   inputs,
      //   body,
      //   signature,
      //   customer,
      //   card,
      //   eventType,
      //   status,
      //   email,
      // });
      try {
        const payload = { id: `${body?.data?.id}` };
        const response = await flw.Transaction.verify(payload);
        console.log({response});
        const consumerType = response?.data?.meta?.consumer_type;
        const consumer = response?.data?.meta?.consumer_id;
        const applicationId = response?.data?.meta?.application_id;
        const registrationId = response?.data?.meta?.registration_id;

        console.log({ consumer, consumerType });
        let paymentData = {
          // approve_payment: true,
          // admin_payment_status: "approved",
          // user: consumer,
          // // application: applicationData?.id,
          // payment_type: "card",
          // transaction_id: body?.data?.tx_ref,
          // module_type: "application",
          // payment_status: status,
          // amount: response?.data?.amount,
        };
        if (consumer && response) {
          if (consumerType === "application") {
            const applicationInput = {
              last_step_completed: 0,
              createdBy: consumer,
            };
            const applicationData = await Application.findOrCreate(
              {
                createdBy: consumer,
              },
              applicationInput
            ).intercept((error) => {
              console.log({ error });
              return error;
            });
            if (applicationData?.id) {
              const userApplication = await User.findOne({ id: consumer });
              console.log({ userApplication });
              if (!userApplication?.applicationId) {
                await User.updateOne({
                  id: consumer,
                }).set({
                  applicationId: applicationData?.id,
                });
              }
              await Application.update(
                { id: applicationData?.id },
                { isPaymentApprove: true, last_step_completed: 2 }
              );
            }

            console.log({ applicationData });
            paymentData = {
              approve_payment: true,
              admin_payment_status: "approved",
              user: consumer,
              application: applicationData?.id,
              payment_type: "card",
              transaction_id: body?.data?.tx_ref,
              module_type: "application",
              payment_status: status,
              amount: response?.data?.amount,
            };
          } else if (consumerType === "registration" && registrationId) {
            const registrationData = await Registration.findOne({
              id: registrationId,
            });
            if (registrationData?.id) {
              const userApplication = await User.findOne({ id: consumer });
              console.log({ userApplication });

              let invoiceData = await Invoice.find({
                createdBy: consumer,
              })
                .sort("id DESC")
                .limit(1);
              invoiceData = invoiceData?.[0];
              if (invoiceData) {
                invoiceData = await Invoice.updateOne({
                  id: invoiceData?.id,
                }).set({
                  amount_paid:
                    parseFloat(invoiceData?.amount_paid || 0) +
                    parseFloat(response?.data?.amount || 0),
                  paidBy: consumer,
                });
              }
            }

            await Registration.update(
              { id: registrationId },
              {
                isPaymentApprove: true,
                last_step_completed: 4,
                is_completed: true,
              }
            );

            console.log({ registrationData });
            paymentData = {
              approve_payment: true,
              admin_payment_status: "approved",
              user: consumer,
              registration: registrationData?.id,
              payment_type: "card",
              transaction_id: body?.data?.tx_ref,
              module_type: "registration",
              payment_status: status,
              amount: response?.data?.amount,
            };
          } else if (
            consumerType === "registration-balance" &&
            registrationId
          ) {
            const registrationData = await Registration.findOne({
              id: registrationId,
            });
            if (registrationData?.id) {
              const userApplication = await User.findOne({ id: consumer });
              console.log({ userApplication });

              let invoiceData = await Invoice.find({
                createdBy: consumer,
              })
                .sort("id DESC")
                .limit(1);
              invoiceData = invoiceData?.[0];
              if (invoiceData) {
                invoiceData = await Invoice.updateOne({
                  id: invoiceData?.id,
                }).set({
                  amount_paid:
                    parseFloat(invoiceData?.amount_paid || 0) +
                    parseFloat(response?.data?.amount || 0),
                  paidBy: consumer,
                });
              }
            }

            await BalanceFees.create({
              approved_payment: true,
              user: consumer,
              application: applicationId,
              registration: registrationId,
              balance_pay: response?.data?.amount,
              transaction_id: body?.data?.tx_ref,
              payment_type: "card",
              balance_fees_status: "approved",
            });

            console.log({ registrationData });
            paymentData = {
              approve_payment: true,
              admin_payment_status: "approved",
              user: consumer,
              registration: registrationData?.id,
              payment_type: "card",
              transaction_id: body?.data?.tx_ref,
              module_type: "registration-balance",
              payment_status: status,
              amount: response?.data?.amount,
            };
          }
          console.log({ paymentData });
          const payment = await Payment.create(paymentData);
          return payment;
        }
        return exits.invalid({
          message: response,
        });
      } catch (error) {
        console.log(error);
        return exits.invalid({
          message: error,
        });
      }
    }
    return exits.success(body);
  },
};
