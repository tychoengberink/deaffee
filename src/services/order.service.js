const ACTIVE_TABLE = 'activeTable';
const FINISHED_TALKING = 'finishedTalking';

const OrderService = {
    getActiveTable() {
        return localStorage.getItem(ACTIVE_TABLE);
    },

    saveActiveTable(activeTable) {
        localStorage.setItem(ACTIVE_TABLE, activeTable);
    },

    removeActiveTable() {
        localStorage.removeItem(ACTIVE_TABLE);
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

}

export { OrderService };