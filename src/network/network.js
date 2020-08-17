

import axios from "axios";

import getStore from "../redux/store";

// const endUrl = require("../config/ApiConfig.json");

/**
 * Create an Axios Client with defaults
 */
export const GET = "GET";
export const POST = "POST";
export const DELETE = "DELETE";
export const PATCH = "PATCH";
export const PUT = "PUT";

/**
 * Create an Axios Client for pointing own server
 */
const appClient = axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1/",
  headers: {
    "user-key": "40d73ed4b232a36807b975c4b72c3e5f"
  }
});
/**
 * Create an Axios Client for general usage
 */
const generalClient = axios.create({
  headers: {}
});

/**Intercept appClient */
appClient.interceptors.request.use(function(config) {
  config.headers["Content-language"] = "en";

  return config;
});

/**Intercept generalClient */
generalClient.interceptors.request.use(function(config) {
  return config;
});

const appRequest = function(options) {
  const onSuccess = function(response) {
    console.log("Request Successful!", response);
    return response.data;
  };

  const onError = function(error) {
    console.log(error, "error");
    console.log("Request Failed:", error.config);
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
      if (401 === error.response.status) {
        //something went wrong
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  return appClient(options)
    .then(onSuccess)
    .catch(onError);
};

const generalRequest = function(options) {
  const onSuccess = function(response) {
    console.log("Request Successful!", response);
    return response.data;
  };

  const onError = function(error) {
    console.log("Request Failed:", error.config);
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
      if (401 === error.response.status) {
        //something went wrong
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  return generalClient(options)
    .then(onSuccess)
    .catch(onError);
};

export { appRequest, generalRequest };
