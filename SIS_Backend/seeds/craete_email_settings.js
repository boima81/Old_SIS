/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("mail_setting").truncate();
  await knex("mail_setting").insert([
    {
      id: 1,
      title: "Application Approval",
      subject: "Application Approval",
      html: "You application is approved successfully <%student_name%><%student_id%><%program%><%semester%>",
      key: "application_approval",
      header: "Application Approval",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 2,
      title: "Application Feedback",
      subject: "Application Feedback",
      html: "You feedback given by admin <%student_name%><%student_id%><%program%><%semester%>",
      key: "application_feedback",
      header: "Application Feedback",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 3,
      title: "Application Deny",
      subject: "Application Deny",
      html: "You application deny by admin <%student_name%><%student_id%><%program%><%semester%>",
      key: "application_deny",
      header: "Application Deny",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 4,
      title: "Registration",
      subject: "New Registration",
      html: "To send new user registration email <%student_name%>",
      key: "registration",
      header: "Registration",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 5,
      title: "Registration Completed",
      subject: "Registration Completed",
      html: "Your registration done <%student_name%><%student_id%><%program%><%semester%>",
      key: "registration_complete",
      header: "Registration Completed",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 6,
      title: "Invoice",
      subject: "Invoice",
      html: "Here admin send the Invoice <%student_name%> <%student_id%> <%program%> <%semester%>",
      key: "invoice",
      header: "Invoice",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 7,
      title: "Billing email",
      subject: "Billing email",
      html: "This is billing email by admin <%student_name%><%student_id%><%program%><%semester%>",
      key: "billing_email",
      header: "Billing email",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 8,
      title: "Reset Password",
      subject: "Reset Password",
      html: "You password is reset successfully <%student_name%>",
      key: "password_reset",
      header: "Reset Password",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 9,
      title: "User Registration",
      subject: "User Registration",
      html: "You user signup successfully <%student_name%>",
      key: "new_registered_user",
      header: "User Registration",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 10,
      title: "Application Fees Submitted",
      subject: "Application Fees Submitted",
      html: "Student application submitted <%student_name%>",
      key: "application_fee_submitted",
      header: "Application Fees Submitted",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 11,
      title: "Application Fees Approved",
      subject: "Application Fees Approved",
      html: "Student application fees approved <%student_name%>",
      key: "application_fee_approved",
      header: "Application Fees Approved",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 12,
      title: "Application Submitted",
      subject: "Application Submitted",
      html: "Application submitted <%student_name%>",
      key: "application_submitted",
      header: "Application Submitted",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 13,
      title: "Application Approved",
      subject: "Application Approved",
      html: "Student application approved <%student_name%>",
      key: "application_approved",
      header: "Application Approved",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 14,
      title: "Registration Fees Approved",
      subject: "Registration Fees Approved",
      html: "Student registration fees approved <%student_name%>",
      key: "registration_fee_approved",
      header: "Registration fees Approved",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 15,
      title: "Registration Submitted",
      subject: "Registration Submitted",
      html: "Registration submitted <%student_name%>",
      key: "registration_submitted",
      header: "Registration Submitted",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
    {
      id: 16,
      title: "Registration Fees Submitted",
      subject: "Registration Fees Submitted",
      html: "Student Registration fees Submitted <%student_name%>",
      key: "registration_fee_submitted",
      header: "Registration fees submitted",
      footer: "Proudly powered by BOIMA-SIS",
      created_by: "1",
      updated_by: "1",
    },
  ]);
};
