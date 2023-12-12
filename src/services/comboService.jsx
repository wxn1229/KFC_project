import axios from "axios";

const API_URL = "http://localhost:8080/api/combo";


class comboService {
  getcombobyTitle(title) {
    return axios.get(API_URL + "/findbytitle/" + title);
  }
  getcombobyID(id) {
    return axios.get(API_URL + "/findbyid/" + id)
  }


}



export default new comboService();
