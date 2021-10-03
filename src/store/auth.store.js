import {AuthenticationError, AuthService} from "@/services/auth.service";
import { TokenService } from "@/services/token.service";

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: "",
    refreshTokenPromise: null
};

const getters = {
    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode;
    },

    authenticationError: (state) => {
        return state.authenticationError;
    },

    authenticating: (state) => {
        return state.authenticating;
    }
};

const actions = {
    async signIn(context, signInData) {
        context.commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(signInData).then(res => {
                context.commit("signInSuccess", res);
                resolve(res);
            }).catch(err => {
                if (err instanceof AuthenticationError) {
                    context.commit("signInError", {
                        errorCode: err.errorCode,
                        errorMessage: err.message
                    });
                    reject(err.message);
                }
            });
        });
    },

    signOut(context) {
        context.commit("signOutRequest");
        return new Promise((resolve) => {
            AuthService.signOut();
            resolve();
        });
    },

    refreshToken(context, state) {
        if (!state.refreshTokenPromise) {
            const p = AuthService.refreshToken();
            context.commit("refreshTokenPromise", p);

            p.then(
                response => {
                    context.commit("refreshTokenPromise", null);
                    context.commit("loginSuccess", response);
                },
                error => {
                    context.commit("refreshTokenPromise", error);
                }
            );
        }

        return state.refreshTokenPromise;
    },

    async signup(context, {email, password, name}) {
        try {
            await AuthService.signup(email, password, name);
            context.commit("processSuccess");
            return true;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                context.commit("signInError", {
                    errorCode: e.errorCode,
                    errorMessage: e.message
                });
            }
            return false;
        }
    },

    setAuthenticatingStatus(context, status) {
        context.commit("setAuthenticatingStatus", status);
    },
};

const mutations = {
    signInRequest(state) {
        state.authenticating = true;
        state.authenticationError = "";
        state.authenticationErrorCode = 0;
    },

    signInSuccess(state, accessToken) {
        state.accessToken = accessToken;
        state.authenticating = false;
    },

    signInError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
    },

    signOutRequest(state) {
        state.authenticating = false;
    },

    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise;
    },

    processSuccess(state) {
        state.authenticating = false;
    },

    setAuthenticatingStatus(state, status) {
        state.authenticating = status;
    }
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};