import axios from "axios";

const API_URL = "http://localhost:8080/api/item";


class ItemService {
  getItemsbyTitle(title) {
    return axios.get(API_URL + "/findbytitle/" + title);
  }

  getItembyID(id) {
    return axios.get(API_URL + "/findbyid/" + id)
  }
}



export default new ItemService();
