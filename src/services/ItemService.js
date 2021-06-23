import axios from "axios";

class ItemService {
  constructor() {}

  //Localhost pour utilisation du proxy de dev
  host = window.location.protocol + "//" + window.location.host;

  getByUrlName(urlName) {
    return axios.get(this.host + "/v1/items/" + urlName + "/statistics?include=item");
  }

  getAll() {
    return axios.get(this.host + "/v1/items");
  }
}

const itemService = new ItemService();
export default itemService;
