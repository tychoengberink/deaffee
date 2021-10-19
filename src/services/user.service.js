const USERNAME_KEY = "userName";
const USERID_KEY = "userId";

const UserService = {
  getUserName() {
    return localStorage.getItem(USERNAME_KEY);
  },
  getUserId() {
    return localStorage.getItem(USERID_KEY);
  },

  saveUserName(name) {
    localStorage.setItem(USERNAME_KEY, name);
  },

  saveUserId(id) {
    localStorage.setItem(USERID_KEY, id);
  },

  removeUser() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(USERNAME_KEY);
  },
};

export { UserService };
