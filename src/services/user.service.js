const USERNAME_KEY = "userName";

const UserService = {
    getUserName() {
        return localStorage.getItem(USERNAME_KEY);
    },

    saveUserName(name) {
        localStorage.setItem(USERNAME_KEY, name);
    },

    removeUser() {
        localStorage.removeItem(USERNAME_KEY);
    },
};

export {UserService};
