import axios from "axios";

const API_URL = "http://localhost:8080/api/list"


class listService {
  createList(user, deliveryAddress, pickupTime) {
    return axios.post(API_URL + "/create", {
      user,
      deliveryAddress,
      pickupTime
    })

  }

  addproduct(userID, newItem) {
    return axios.put(API_URL + "/addproduct", {
      userID,
      newItem
    })
  }

}




export default new listService()
