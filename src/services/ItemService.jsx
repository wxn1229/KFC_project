import axios from "axios";

const API_URL = "http://localhost:8080/api/item";


class ItemService {
  getItemsbyTitle(title) {
    return axios.get(API_URL + "/findbytitle/" + title);
  }

  getItembyID(id) {
    return axios.get(API_URL + "/findbyid/" + id)
  }

  getItembyGroup(group) {
    return axios.get(API_URL + "/findbygroup/" + group)
  }
}



export default new ItemService();
