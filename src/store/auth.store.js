import {AuthService} from "@/services/auth.service";
import {TokenService} from "@/services/token.service";
import {UserService} from "@/services/user.service";

const state = {
    userName: null,
    isNotFirstTime: null,
    authenticating: false,
    accessToken: TokenService.getToken(),
    refreshTokenPromise: null,
};

const getters = {
    authenticating: (state) => {
        return state.authenticating;
    },

    isNotFirstTime: (state) => {
        return state.isNotFirstTime;
    },

    userName: (state) => {
        return state.userName;
    },
};

const actions = {
    async signIn({getters, commit}, password) {
        commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(password, getters.userName)
                .then((res) => {
                    commit("signInSuccess", res);
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
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
                (response) => {
                    context.commit("refreshTokenPromise", null);
                    context.commit("loginSuccess", response);
                },
                (error) => {
                    context.commit("refreshTokenPromise", error);
                }
            );
        }

        return state.refreshTokenPromise;
    },

    async signup(context, {username, password}) {
        await AuthService.signup(username, password).then(() => {
            context.commit("processSuccess");
        });
    },

    setAuthenticatingStatus(context, status) {
        context.commit("setAuthenticatingStatus", status);
    },

    setSignInError(context, {errorCode, errorMessage, errorObject}) {
        context.commit("signInError", {errorCode, errorMessage, errorObject});
    },

    turnOffFirstTime: ({commit}) => {
        commit("turnOffFirstTime");
    },

    setUserName: ({commit}, name) => {
        commit("saveUserName", name);
    },
};

const mutations = {
    initialiseStore(state) {
        //So state gets retrieved when app is reopend.
        if (AuthService.getFirstTimeLogin()) {
            state.isNotFirstTime = AuthService.getFirstTimeLogin();
        }

        if (TokenService.getToken()) {
            state.accessToken = TokenService.getToken();
        }

        if (UserService.getUserName()) {
            state.userName = UserService.getUserName();
        }
    },

    turnOffFirstTime(state) {
        state.isNotFirstTime = true;
        AuthService.turnOffFirstTime();
    },

    signInRequest(state) {
        state.authenticating = true;
    },

    signInSuccess(state, accessToken) {
        state.accessToken = accessToken;
        state.authenticating = false;
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
    },

    saveUserName(state, name) {
        state.userName = name;
        UserService.saveUserName(name);
    },
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
