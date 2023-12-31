import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

class authService {
  register(phone, username, email, password, birthday) {
    return axios.post(API_URL + "/register", { phone, username, email, password, birthday })

  }

  login(email, password) {
    return axios.post(API_URL + "/login", { email, password })
  }

  logout() {
    localStorage.removeItem("user")
  }

  getCurUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  sendVerificationcode(email) {
    return axios.post(API_URL + "/sendverificationcode", {
      email
    })
  }

  sendnewpassword(email) {
    return axios.post(API_URL + "/sendnewpassword", { email })
  }

}



export default new authService()
