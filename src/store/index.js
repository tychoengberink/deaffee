import { createStore } from 'vuex';
import { auth } from "./auth.store";
import { order } from "./order.store";

export const store = createStore({
    beforeCreate() { this.$store.commit('initialiseStore');},
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        order
    },
})