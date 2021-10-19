import { AuthenticationError, AuthService } from "@/services/auth.service";
import { TokenService } from "@/services/token.service";
import { UserService } from "../services/user.service";

const state = {
  userName: null,
  userId: null,
  isNotFirstTime: null,
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: "",
  refreshTokenPromise: null,
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
  },

  isNotFirstTime: (state) => {
    return state.isNotFirstTime;
  },

  userName: (state) => {
    return state.userName;
  },

  userId: (state) => {
    return state.userId;
  },
};

const actions = {
  async signIn(context, signInData) {
    context.commit("signInRequest");
    return new Promise((resolve, reject) => {
      AuthService.signIn(signInData)
        .then((res) => {
          context.commit("signInSuccess", res);
          resolve(res);
        })
        .catch((err) => {
          if (err instanceof AuthenticationError) {
            context.commit("signInError", {
              errorCode: err.errorCode,
              errorMessage: err.message,
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

  async signup(context, { email, password, name }) {
    try {
      await AuthService.signup(email, password, name);
      context.commit("processSuccess");
      return true;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        context.commit("signInError", {
          errorCode: e.errorCode,
          errorMessage: e.message,
        });
      }
      return false;
    }
  },

  setAuthenticatingStatus(context, status) {
    context.commit("setAuthenticatingStatus", status);
  },

  turnOffFirstTime: ({ commit }) => {
    commit("turnOffFirstTime");
  },

  setUserName: ({ commit }, name) => {
    commit("saveUserName", name);
  },

  setUserId: ({ commit }, id) => {
    commit("saveUserId", id);
  },
};

const mutations = {
  initialiseStore(state) {
    //So state gets saved when app is closed.
    if (AuthService.getFirstTimeLogin()) {
      state.isNotFirstTime = AuthService.getFirstTimeLogin();
    }

    if (UserService.getUserName()) {
      state.userName = UserService.getUserName();
    }

    if (UserService.getUserId()) {
      state.userId = UserService.getUserId();
    }
  },

  turnOffFirstTime(state) {
    state.isNotFirstTime = true;
    AuthService.turnOffFirstTime();
  },

  signInRequest(state) {
    state.authenticating = true;
    state.authenticationError = "";
    state.authenticationErrorCode = 0;
  },

  signInSuccess(state, accessToken) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },

  signInError(state, { errorCode, errorMessage }) {
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
  },

  saveUserName(state, name) {
    state.userName = name;
    UserService.saveUserName(name);
  },

  saveUserId(state, id) {
    state.userId = id;
    UserService.saveUserId(id);
  },
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
