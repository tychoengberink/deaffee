const ACTIVE_ORDER = "activeOrder";
const ACTIVE_TABLE = "activeTable";
const FINISHED_TALKING = "finishedTalking";

const OrderService = {
    getActiveOrder() {
        return localStorage.getItem(ACTIVE_ORDER);
    },

    saveActiveOrder(activeOrder) {
        localStorage.setItem(ACTIVE_ORDER, activeOrder);
    },

    removeActiveOrder() {
        localStorage.removeItem(ACTIVE_ORDER);
    },

    getFinishedTalking() {
        return localStorage.getItem(FINISHED_TALKING);
    },

    saveFinishedTalking(finshedTalking) {
        localStorage.setItem(FINISHED_TALKING, finshedTalking);
    },

    removeFinishedTalking() {
        localStorage.removeItem(FINISHED_TALKING);
    },

    getActiveTable() {
        return localStorage.getItem(ACTIVE_TABLE);
    },

    saveActiveTable(activeTable) {
        localStorage.setItem(ACTIVE_TABLE, activeTable);
    },

    removeActiveTable() {
        localStorage.removeItem(ACTIVE_TABLE);
    },

};

export {OrderService};

