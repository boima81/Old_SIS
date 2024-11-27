/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // // '*': [''],
  "*": false,

  // Bypass the `is-super-admin` policy for:
  "admin/*": ["is-super-admin"],
  "admin/admin/auth/*": true,

  "api/*": ["isAuthorized"],
  "api/v1/user/auth/login": true,
  "api/v1/user/create": true,
  "api/v1/agency/get": true,
  "api/v1/webhook/create": true,
  "api/v1/invoice/send-invoice": true,
  // "api/v1/user/otp/*": true,
  "api/v1/send-email/mail": true,
  "api/v1/user/forgot-password/get-email": true,
  "api/v1/settings/application/single": true,
  "common/*": true,
  "front/*": true,

  // "graphql/*": true,
};
