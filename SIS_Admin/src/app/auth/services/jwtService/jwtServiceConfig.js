export const BASEURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1500/api/v1/";
const jwtServiceConfig = {
  // signIn: `api/auth/sign-in`,
  signIn: `${BASEURL}user/login`,
  // signUp: "api/auth/sign-up",
  signUp: `${BASEURL}user/create`,
  updateUser: `${BASEURL}user`,
  accessToken: `${BASEURL}userme`,
  changePassword: `${BASEURL}change-password`,
  forgotPassword: `${BASEURL}forgot-password/get-email`,
  resetPassword: `${BASEURL}forgot-password/set-new-password`

  // accessToken: "api/auth/access-token",
};

export default jwtServiceConfig;
