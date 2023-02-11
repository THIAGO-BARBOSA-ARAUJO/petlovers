import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;

// produção: http://localhost/api
// desenvolvimento: http://localhost:5000