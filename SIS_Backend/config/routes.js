/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

var adminRoutes = {
  // 'GET /': { action: 'common/view-homepage-or-redirect'},
  "GET ": { action: "common/view-homepage-or-redirect" },
  "GET /login": {
    view: "admin/login",
    locals: { layout: "admin/layouts/layout" },
  },

  // Not Secured API
  "POST /login": {
    action: "admin/admin/auth/login",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /logout": {
    action: "admin/admin/auth/logout",
    locals: { layout: "admin/layouts/layout" },
  },

  // Secured Views and APIs
  "GET /dashboard": {
    action: "admin/dashboard/view-index",
    locals: { layout: "admin/layouts/master" },
  },

  // admin
  "GET /admins": {
    action: "admin/admin/view-index",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /create": {
    action: "admin/admin/view-create",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /edit/:adminId": {
    action: "admin/admin/view-edit",
    locals: { layout: "admin/layouts/master" },
  },

  "GET /index": { action: "admin/admin/index" }, //getting list of admin with datatable
  "POST /create": { action: "admin/admin/create" },
  "POST /update/:adminId": {
    action: "admin/admin/update",
    locals: { layout: "admin/layouts/master" },
  },
  "DELETE /:id": { action: "admin/admin/delete" },

  // user
  "GET /users": {
    action: "admin/user/view-index",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /user/create": {
    action: "admin/user/view-create",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /user/edit/:userId": {
    action: "admin/user/view-edit",
    locals: { layout: "admin/layouts/master" },
  },

  "GET /user/index": { action: "admin/user/index" }, //getting list of admin with datatable
  "POST /user/create": { action: "admin/user/create" },
  "POST /user/update/:userId": { action: "admin/user/update" },
  "DELETE /user/:id": { action: "admin/user/delete" },

  // =================================== ROLE ===========================================================

  "GET /role": {
    action: "admin/role/view-index",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /role/create": {
    action: "admin/role/view-create",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /role/edit/:id": {
    action: "admin/role/view-edit",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /role/datatable": { action: "admin/role/datatable" },
  "POST /role/create": { action: "admin/role/create" },
  "DELETE /role/:id": { action: "admin/role/delete" },
  "POST /role/update/:id": { action: "admin/role/update" },
  "POST /role/namecheck": { action: "admin/role/namecheck" },

  // =================================== PERMISSIONS ========================================================

  "GET /permission": {
    action: "admin/permission/view-index",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /permission/create": {
    action: "admin/permission/view-create",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /permission/edit/:id": {
    action: "admin/permission/view-edit",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /permission/index": { action: "admin/permission/index" },
  "POST /permission/create": { action: "admin/permission/create" },
  "POST /permission/update/:id": { action: "admin/permission/update" },
  "GET /permission/datatable": { action: "admin/permission/datatable" },

  // =================================== ROLE PERMISSIONS ========================================================

  "GET /role-permission": {
    action: "admin/rolepermission/view-index",
    locals: { layout: "admin/layouts/master" },
  },
  "GET /role-permission/datatable": {
    action: "admin/rolepermission/datatable",
  },
  "GET /role-permission/edit/:id": {
    action: "admin/rolepermission/view-edit",
    locals: { layout: "admin/layouts/master" },
  },
  "POST /role-permission/update/:id": { action: "admin/rolepermission/update" },
};

var apiV1 = {
  //  API V1
  "POST /user/login": { action: "api/v1/user/auth/login" },
  "GET /userme": { action: "api/v1/user/auth/me" },
  // "POST /user/social-login": { action: "api/v1/user/auth/social-login" },
  "GET /user": { action: "api/v1/user/users" },
  "GET /user/:userId": { action: "api/v1/user/get" },
  "POST /user/create": { action: "api/v1/user/create" },
  "PUT /user": { action: "api/v1/user/update" },
  "POST /user/update/:userId": { action: "api/v1/user/update-admin" },
  "PUT /change-password": { action: "api/v1/user/change-password" },
  "DELETE /user/:userId": { action: "api/v1/user/delete" },
  "POST /user/refresh-token": { action: "api/v1/user/refresh-token" },
  "GET /students": { action: "api/v1/user/admin/student" },
  "GET /students-registration-list/:studentId": {
    action: "api/v1/user/admin/students-registration-list",
  },
  "GET /student/:id": { action: "api/v1/user/admin/get" },
  "PUT /student/:id": { action: "api/v1/user/admin/update" },
  "PUT /student-create": { action: "api/v1/user/admin/create" },
  "DELETE /student-delete": { action: "api/v1/user/admin/delete" },

  // "POST /user/address": { action: "api/v1/user/address/address" },
  // "POST /user/update-address": { action: "api/v1/user/address/update-address" },

  // //auction
  // "POST /user/auction-object": { action: "api/v1/user/auction/auction-object" },

  // //verifyOTP
  // "POST /user/send-otp-email": { action: "api/v1/user/otp/send-otp-email" },
  // "POST /user/send-otp-phone": { action: "api/v1/user/otp/send-otp-phone" },
  // "POST /user/verify-otp-email": { action: "api/v1/user/otp/verify-otp-email" },
  // "POST /user/verify-otp-phone": { action: "api/v1/user/otp/verify-otp-phone" },
  "GET /application/:id": { action: "api/v1/application/get" },
  "POST /application": { action: "api/v1/application/create" },

  "GET /applications": { action: "api/v1/application/admin/get" },
  "DELETE /applications/delete": { action: "api/v1/application/admin/delete" },

  "POST /update-application-status": {
    action: "api/v1/application/admin/manages-status",
  },

  "POST /registration": { action: "api/v1/registration/create" },
  "GET /registration/:id": { action: "api/v1/registration/get" },
  "GET /registrations": { action: "api/v1/registration/admin/get" },
  "DELETE /registrations/delete": {
    action: "api/v1/registration/admin/delete",
  },

  "POST /update-registration-status": {
    action: "api/v1/registration/admin/manages-status",
  },

  "GET /course": { action: "api/v1/course/get" },
  "GET /courses": { action: "api/v1/course/admin/get" },
  "GET /courses/:id": { action: "api/v1/course/admin/single" },

  "POST /create-update-course": { action: "api/v1/course/admin/create" },
  "DELETE /courses": { action: "api/v1/course/admin/delete" },

  "GET /course/:id": { action: "api/v1/course/single" },

  "GET /semester": { action: "api/v1/semester/get" },
  "GET /semester/:id": { action: "api/v1/semester/single" },

  "POST /email-send": { action: "api/v1/send-email/mail" },
  "GET /semesters": { action: "api/v1/semester/admin/get" },
  "GET /semesters/:id": { action: "api/v1/semester/admin/single" },
  "POST /create-update-semester": { action: "api/v1/semester/admin/create" },
  "DELETE /semesters": { action: "api/v1/semester/admin/delete" },
  // "POST /email-send": { action: "api/v1/send-email/mail" },

  "GET /instructor": { action: "api/v1/instructor/get" },
  "GET /instructor/:id": { action: "api/v1/instructor/single" },

  "GET /instructors": { action: "api/v1/instructor/admin/get" },
  "GET /instructors/:id": { action: "api/v1/instructor/admin/single" },
  "POST /create-update-instructor": {
    action: "api/v1/instructor/admin/create",
  },
  "DELETE /instructors": { action: "api/v1/instructor/admin/delete" },

  "GET /section": { action: "api/v1/section/get" },
  "GET /section/:id": { action: "api/v1/section/single" },

  "GET /sections": { action: "api/v1/section/admin/get" },
  "GET /sections/:id": { action: "api/v1/section/admin/single" },
  "POST /create-update-section": {
    action: "api/v1/section/admin/create",
  },
  "DELETE /sections": { action: "api/v1/section/admin/delete" },

  "POST /paymentHistory-fileUpload": {
    action: "api/v1/payment/file-upload",
  },
  "GET /paymentHistory/list/:registrationId": {
    action: "api/v1/payment/history",
  },

  "GET /paymentTerm": { action: "api/v1/paymentTerms/get" },
  "GET /paymentTerms/:id": { action: "api/v1/paymentTerms/single" },

  "GET /paymentTerms": { action: "api/v1/paymentTerms/admin/get" },
  "GET /paymentTerms/:id": { action: "api/v1/paymentTerms/admin/single" },
  "POST /create-update-paymentTerm": {
    action: "api/v1/paymentTerms/admin/create",
  },
  "DELETE /paymentTerms": { action: "api/v1/paymentTerms/admin/delete" },

  "GET /program": { action: "api/v1/program/get" },
  "GET /program/:id": { action: "api/v1/program/single" },
  "GET /programs": { action: "api/v1/program/admin/get" },
  "POST /create-update-program": { action: "api/v1/program/admin/create" },
  "DELETE /programs": { action: "api/v1/program/admin/delete" },

  "GET /payment": { action: "api/v1/applicationPayment/get" },
  "GET /payment/:id": { action: "api/v1/applicationPayment/single" },
  "GET /payments": { action: "api/v1/applicationPayment/admin/get" },
  "POST /create-update-payment": {
    action: "api/v1/applicationPayment/admin/create",
  },
  "POST /update-payment-status": {
    action: "api/v1/applicationPayment/admin/manages-status",
  },

  "GET /registration-payment": { action: "api/v1/registrationPayment/get" },
  "GET /registration-payment/:id": {
    action: "api/v1/registrationPayment/single",
  },
  "GET /registration-payments": {
    action: "api/v1/registrationPayment/admin/get",
  },
  "POST /registration-create-update-payment": {
    action: "api/v1/registrationPayment/admin/create",
  },
  "POST /registration-update-payment-status": {
    action: "api/v1/registrationPayment/admin/manages-status",
  },
  "GET /registration-payments-receipt": {
    action: "api/v1/registrationPayment/receipts",
  },
  // "DELETE /payments": { action: "api/v1/applicationPayment/admin/delete" },

  "GET /registration-fees/:id": { action: "api/v1/registrationFees/single" },
  "GET /registration-fees": { action: "api/v1/registrationFees/admin/get" },
  "POST /create-update-registration-fees": {
    action: "api/v1/registrationFees/admin/create",
  },
  "POST /create-balance-fees": {
    action: "api/v1/balanceFee/create",
  },
  "GET /user-balance-fee/:userId?": {
    action: "api/v1/balanceFee/get",
  },
  "GET /balance-fees": {
    action: "api/v1/balanceFee/admin/get",
  },
  "POST /update-balance-fees-status": {
    action: "api/v1/balanceFee/admin/manages-status",
  },

  "DELETE /delete-registration-fees": {
    action: "api/v1/registrationFees/admin/delete",
  },

  "GET /first-courses-fees": { action: "api/v1/coursesFees/admin/single" },
  "GET /courses-fees": { action: "api/v1/coursesFees/admin/get" },
  "POST /create-update-courses-fees": {
    action: "api/v1/coursesFees/admin/create",
  },

  "GET /programs/:id": { action: "api/v1/program/admin/single" },

  "POST /file-upload": { action: "api/v1/application/uploadfile" },
  "POST /user-avatar-file-upload": { action: "api/v1/user/uploadfile" },
  "GET /application-file-remove/:id": {
    action: "api/v1/application/deletefile",
  },

  "GET /file/:id": { action: "api/v1/application/getfile" },

  //Email settings
  "GET /email-settings": { action: "api/v1/emailSetting/get" },
  "GET /email-settings/:id": { action: "api/v1/emailSetting/single" },
  "POST /email-settings/create": { action: "api/v1/emailSetting/create" },
  "DELETE /email-settings/delete/:id": { action: "api/v1/emailSetting/delete" },

  //========================Forgot Password========================
  "POST /forgot-password/get-email": {
    action: "api/v1/user/forgot-password/get-email",
  },
  "POST /forgot-password/set-new-password": {
    action: "api/v1/user/forgot-password/set-new-password",
  },
  "POST /application_setting": { action: "api/v1/settings/application/create" },
  "GET /application_setting": { action: "api/v1/settings/application/single" },
  "POST /bank_information_setting": {
    action: "api/v1/settings/bankInformation/create",
  },
  "GET /bank_information_setting": {
    action: "api/v1/settings/bankInformation/single",
  },
  "POST /invoice-pay": { action: "api/v1/invoice/create" },
  "POST /invoice-pay-update": { action: "api/v1/invoice/update" },
  "POST /flutterwave": { action: "api/v1/webhook/create" },
  "POST /send-invoice": { action: "api/v1/invoice/send-invoice" },
  "GET /notifications": { action: "api/v1/notification/get" },
  "POST /notifications-update": { action: "api/v1/notification/update-status" },
  "GET /reports/students": { action: "api/v1/reports/students" },

  //Agency
  "POST /agency/create": { action: "api/v1/agency/create" },
  "GET /agency": { action: "api/v1/agency/get" },
  "GET /agency/:id": { action: "api/v1/agency/single" },
  "DELETE /agency/:id": { action: "api/v1/agency/delete" },
  "POST /grade-create": { action: "api/v1/grade/create" },
  "GET /grade-byuser/:semester": { action: "api/v1/grade/get-by-user" },
  "GET /grade-course": { action: "api/v1/grade/get" },
  "GET /transcript": { action: "api/v1/transcript/transcript" },
  "GET /transcript/list": { action: "api/v1/transcript/get" },
  "GET /transcript/student-list": { action: "api/v1/transcript/get-student" },
  "GET /course-curriculum": { action: "api/v1/transcript/course-curriculum" },
};

var otherRoutes = {
  // Not Secure Views
  "/": { view: "pages/homepage" },
  "/invoice": { view: "pages/invoice" },
  "/pdf": { view: "pages/pdf" },
  "/grade": { view: "pages/grade" },

  // test route
  "GET /email/confirm": {
    action: "common/confirm-email",
    locals: { layout: "admin/layouts/layout" },
  },
  "GET /test-job": { action: "common/test-job" },
  "POST /test-mail": { action: "common/test-mail" },
  "GET /data-seed": { action: "common/data-seed" },
  "POST /test": { action: "common/test" },

  // "POST /graphql": { action: "graphql/graphql" },
};

function genRoutes(objRoutes) {
  // console.log(objRoutes);
  var prefix = Object.keys(objRoutes);
  let newRoutes = {};
  let routes = {};
  // console.log(prefix);

  for (let i = 0; i < prefix.length; i++) {
    var paths = Object.keys(objRoutes[prefix[i]]);
    // console.log('paths =>', paths);
    paths.forEach(function (path) {
      var pathParts = path.split(" "),
        uri = pathParts.pop(),
        prefixedURI = "",
        newPath = "";

      prefixedURI = (prefix[i] ? "/" : "") + prefix[i] + uri;
      pathParts.push(prefixedURI);
      newPath = pathParts.join(" ");
      // construct the new routes
      newRoutes[newPath] = objRoutes[prefix[i]][path];
    });
  }
  routes = newRoutes;
  // console.log('routes => ', routes);
  return routes;
}

// generate route with prefix keys
var routes = genRoutes({
  "": otherRoutes,
  admin: adminRoutes,
  "api/v1": apiV1,
});

// assigning generated route
module.exports.routes = routes;
