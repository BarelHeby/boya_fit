import axios from "axios";
export default class ServiceManager {
  get(modelUrl, id = null) {
    const fullUrl =
      process.env.REACT_APP_API_URL + modelUrl + (id ? `/${id}` : "/");
    return axios.get(fullUrl);
  }
  post(modelUrl, data = null) {
    const fullUrl = process.env.REACT_APP_API_URL + modelUrl + "/";
    return axios.post(fullUrl, data);
  }
  put(modelUrl, id, data) {
    const url = process.env.REACT_APP_API_URL + modelUrl + `/${id}`;
    return axios.put(url, data);
  }
  delete(modelUrl, id) {
    const url = process.env.REACT_APP_API_URL + modelUrl + `/${id}`;
    return axios.delete(url);
  }
}
