//Used from https://www.djamware.com/post/5fc19e3e77862f22905c7f03/ionic-5-tutorial-oauth2-login-example-vue

import { ApiService } from "./api.service";
import { TokenService } from "./token.service";
import qs from "qs";

var ISNOTFIRSTTIME = "first_time";

class AuthenticationError extends Error {
  constructor(errorCode, message, errorObject) {
    super(message);
    this.name = this.constructor.name;
    if (message != null) {
      this.message = message;
    }
    this.errorObject = errorObject;
    this.errorCode = errorCode;
  }
}

const AuthService = {
  signIn: async function(signInData) {
    const requestData = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: "/oauth/token",
      data: qs.stringify({
        grant_type: "password",
        scope: "*",
        username: signInData.username,
        password: signInData.password,
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
      }),
    };

    try {
      const response = await ApiService.customRequest(requestData);
      console.log(response);
      TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

      ApiService.mount401Interceptor();

      return response.data.access_token;
    } catch (error) {
      this.catchError(error);
    }
  },

  signup: async function(username, password, name) {
    const signupData = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "api/user",
      data: {
        username: username,
        password: password,
        name: name,
        role_id: 1,
      },
    };

    try {
      return await ApiService.customRequest(signupData);
    } catch (error) {
      this.catchError(error);
    }
  },

  signOut() {
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    ApiService.removeHeader();
    ApiService.unmount401Interceptor();
  },

  catchError: function(error) {
    let status;
    let description;

    if (error.response === undefined) {
      status = error.message;
      description = error.message;
    } else {
      status = error.response.status;
      description = error.response.data.error_description;
    }

    throw new AuthenticationError(status, description, error);
  },

  getFirstTimeLogin() {
    return localStorage.getItem(ISNOTFIRSTTIME);
  },

  turnOffFirstTime() {
    localStorage.setItem(ISNOTFIRSTTIME, true);
  },
};

export { AuthService, AuthenticationError };
