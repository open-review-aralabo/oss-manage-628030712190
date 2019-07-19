class AuthService {
  get isAuthenticated() {
    return this.token ? true : false;
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  get token() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  setUserName(userName) {
    localStorage.setItem("userName", userName);
  }

  get userName() {
    return localStorage.getItem("userName");
  }
}

export default new AuthService();
