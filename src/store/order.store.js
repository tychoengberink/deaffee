import { OrderService } from "@/services/order.service";

const state = {
  order: null,
  table: null,
};

const getters = {
  activeOrder: (state) => {
    return state.order;
  },

  activeTable: (state) => {
    return state.table;
  },
};

const actions = {
  saveActiveOrder: ({ commit }, orderNumber) => {
    console.log("ACTION ORDER NOW: " + orderNumber);
    commit("activeOrder", orderNumber);
  },

  saveActiveTable: ({ commit }, tablenumber) => {
    console.log("ACTION TABLE NOW: " + tablenumber);
    commit("activeTable", tablenumber);
  },
};

const mutations = {
  initialiseStore(state) {
    //So state gets saved when app is closed.
    if (OrderService.getActiveOrder()) {
      state.order = OrderService.getActiveOrder();
    }
    if (OrderService.getActiveTable()) {
      state.table = OrderService.getActiveTable();
    }
  },
  activeOrder(state, order) {
    console.log("MUTATION ORER NOW: " + order);
    state.order = order;
    OrderService.saveActiveOrder(order);
  },

  activeTable(state, table) {
    console.log("MUTATION TABLE NOW: " + table);
    state.table = table;
    OrderService.saveActiveTable(table);
  },
};

export const order = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
