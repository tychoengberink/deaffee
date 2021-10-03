import { HomeService, ResponseError } from "@/services/home.service";

const state = {
    responseData: "",
    responseErrorCode: 0,
    responseError: "",
};

const getters = {
    responseErrorCode: (state) => {
        return state.responseErrorCode;
    },
    responseError: (state) => {
        return state.responseError;
    }
};

const actions = {
    async loadSecretArea(context) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.secretArea();
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    }
};

const mutations = {
    dataRequest(state) {
        state.responseError = "";
        state.responseErrorCode = 0;
    },
    dataSuccess(state, payload) {
        state.responseData = payload;
    },
    dataError(state, {errorCode, errorMessage}) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    }
}

export const home = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};