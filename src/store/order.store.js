import { OrderService } from "@/services/order.service";

const state = {
    table: OrderService.getActiveTable(),
    finished: OrderService.getFinishedTalking(),
};

const getters = {
    activeTable: (state) => {
        return state.table;
    },
    finishedTalking: (state) => {
        return state.finshed; 
    }
};

const actions = {
    saveActiveTable: ({commit}, tablenumber) => {
        commit('activeTable', tablenumber);
    },

    setFinished: ({commit}, finished) => {
        commit('finishedTalking', finished);
    }
};

const mutations = {
    activeTable(table){
        OrderService.saveActiveTable(table);
    },

    finishedTalking(finished){
        OrderService.saveFinishedTalking(finished);
    }
}

export const order = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};