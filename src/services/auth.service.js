//Used from https://www.djamware.com/post/5fc19e3e77862f22905c7f03/ionic-5-tutorial-oauth2-login-example-vue

import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import qs from "qs";

var ISNOTFIRSTTIME = "first_time";

const AuthService = {
    signIn: async function (password, username) {
        const requestData = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: "/oauth/token",
            data: qs.stringify({
                grant_type: "password",
                scope: "*",
                username: username,
                password: password,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET,
            }),
        };
        const response = await ApiService.customRequest(requestData);
        TokenService.saveToken(response.data.access_token);
        TokenService.saveRefreshToken(response.data.refresh_token);
        ApiService.setHeader();

        ApiService.mount401Interceptor();

        return response.data.access_token;
    },

    signup: async function (username, password) {
        const signupData = {
            method: "post",
            headers: {"Content-Type": "application/json"},
            url: "api/user",
            data: {
                username: username,
                password: password,
                name: "Kees",
                role_id: 1,
            },
        };

        return await ApiService.customRequest(signupData);
    },

    signOut() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        ApiService.unmount401Interceptor();
    },

    getFirstTimeLogin() {
        return localStorage.getItem(ISNOTFIRSTTIME);
    },

    turnOffFirstTime() {
        localStorage.setItem(ISNOTFIRSTTIME, true);
    },
};

export {AuthService};
