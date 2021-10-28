import {createStore} from 'vuex';
import {auth} from "./auth.store";
import {order} from "./order.store";

export const store = createStore({
    getters: {},
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        order
    },
})