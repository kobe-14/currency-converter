const { default: Axios } = require("axios");

const BASE_URL = "https://api.exchangeratesapi.io";

/**
 * @description Functional Constructor for API
 */
const api = function () {
  this.base_url = BASE_URL;
  this.axios = Axios.create({
    baseURL: this.base_url,
  });

  this.axios.defaults.headers.post["Content-Type"] = "application/json";
};

api.prototype.get = function (url, params = {}) {
  return this.axios({
    method: "get",
    url,
    params,
  });
};

const API = new api();

export { API };
