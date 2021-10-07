// import { OrderService } from "@/services/order.service";

const state = {
    table: null,
};

const getters = {
    activeTable: (state) => {
        return state.table;
    },
};

const actions = {
    setActiveOrder: ({commit}, tablenumber) => {
        commit('activeTable', tablenumber);
    }
};

const mutations = {
    activeTable(state, table){
        state.table = table;
    }
}

export const order = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};