const USER_KEY = "user";

const UserService = {
  getUserName() {
    var user = localStorage.getItem(USER_KEY);
    return user.name;
  },
  getUserId() {
    var user = localStorage.getItem(USER_KEY);
    return user.id;
  },

  saveUser(user) {
    localStorage.setItem(USER_KEY, user);
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
};

export { UserService };
