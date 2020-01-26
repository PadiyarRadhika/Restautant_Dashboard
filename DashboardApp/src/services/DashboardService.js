import * as axios from "../network/network";

const config = require("../config/Apiconfig.json");

export default class DashboardService {
  static getRestaurantData() {
    return axios.appRequest({
      method: axios.GET,
      url: config.restaurant.search
    });
  }
}
