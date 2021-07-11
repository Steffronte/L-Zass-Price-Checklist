import axios from "axios";

class ItemService {
  constructor() {}

  getAll() {
    return axios.get("https://warframe-market-scrapper.herokuapp.com/");
  }
}

const itemService = new ItemService();
export default itemService;
