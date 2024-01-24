import axios from "axios";
export default class ServiceManager {
  static async get(modelUrl, id = null) {
    const fullUrl =
      process.env.REACT_APP_API_URL + modelUrl + (id ? `/${id}` : "/");
    return await axios
      .get(fullUrl)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err) => {
        return { status: err.status, data: err.data };
      });
  }
  static async post(modelUrl, data = null) {
    const fullUrl = process.env.REACT_APP_API_URL + modelUrl;
    return await axios
      .post(fullUrl, data)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err) => {
        return { status: err.response.status, data: err.response.data };
      });
  }
  static async put(modelUrl, id, data) {
    const url = process.env.REACT_APP_API_URL + modelUrl + `/${id}`;
    return axios
      .put(url, data)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err) => {
        return { status: err.response.status, data: err.response.data };
      });
  }
  static async delete(modelUrl, id) {
    const url = process.env.REACT_APP_API_URL + modelUrl + `/${id}`;
    return axios
      .delete(url)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err) => {
        return { status: err.response.status, data: err.response.data };
      });
  }
}
