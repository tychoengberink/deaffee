import { OrderService } from "@/services/order.service";

const state = {
    table: OrderService.getActiveTable(),
    finished: OrderService.getFinishedTalking(),
};

const getters = {
    activeTable: (state) => {
        return state.table;
    },
};

const actions = {
    saveActiveTable: ({commit}, tablenumber) => {
        commit('activeTable', tablenumber);
    },
};

const mutations = {
    activeTable(table){
        OrderService.saveActiveTable(table);
    },
}

export const order = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};