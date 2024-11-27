import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toastr } from "react-redux-toastr";
import jwtServiceConfig, { BASEURL } from "./jwtServiceConfig";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signUp, data)
        .then((response) => {
          if (response.data?.data?.id) {
            toastr.success("Success", "User created successfully");
            this.setSession(null);
            resolve(response.data.data);
            // this.emit("onLogin", response.data.data);
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  resetPasswordUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.forgotPassword, data)
        .then((response) => {
          if (response.data?.id) {
            toastr.success(
              "Success",
              "Mail send successfully to your mail please check"
            );
            this.setSession(null);
            resolve(response.data.id);
            // this.emit("onLogin", response.data.data);
          } else {
            reject(response.data?.id);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  resetChangePasswordUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.resetPassword, data, {
          headers: {
            Authorization: `Bearer ${data?.token}`,
            "Access-Control-Allow-Headers": "authorization",
          },
        })
        .then((response) => {
          if (response.data?.message) {
            toastr.success("Success", response.data?.message);
            this.setSession(null);
            resolve(response.data.message);
            // this.emit("onLogin", response.data.data);
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  uploadUserAvatar = (file) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-plusplus

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post(`${BASEURL}file-upload`, formData)
          .then((responseFile) => {
            if (responseFile.data.data?.[0]) {
              resolve(responseFile.data.data?.[0]);
            } else {
              reject(responseFile?.data);
            }
          })
          .catch((error) => {
            reject(error.response.data);
          });
      } else {
        resolve(null);
      }
      // const data = await response.data;
    });
  };

  updateUser = (data) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-plusplus
      axios
        .put(jwtServiceConfig.updateUser, data)
        .then((response) => {
          if (response.data) {
            toastr.success("Success", "User update successfully");
            resolve(response.data.data);
            // this.emit("onLogin", response.data.data);
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  changePassword = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(jwtServiceConfig.changePassword, data)
        .then((response) => {
          if (response.data) {
            toastr.success("Success", "User password successfully changed");
            resolve(response.data.data);
            // this.emit("onLogin", response.data.data);
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      this.setSession(null);
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve({
              ...response.data.user,
              presidentMessage: response.data.presidentMessage,
            });

            this.emit("onLogin", {
              ...response.data.user,
              presidentMessage: response.data.presidentMessage,
            });

            setTimeout(() => {
              this.signInWithToken();
              // window.location.reload();
            }, [1000]);
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken)
        .then((response) => {
          if (response.data?.user?.id) {
            // this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("sms_jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      axios.defaults.headers.common["Access-Control-Allow-Headers"] =
        "authorization";
    } else {
      localStorage.removeItem("sms_jwt_access_token");
      delete axios.defaults.headers.common.authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
    setTimeout(() => {
      window.location.reload();
    }, 1100);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("sms_jwt_access_token");
  };
}

const instance = new JwtService();

export default instance;
