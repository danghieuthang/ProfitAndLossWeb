import axios from "axios";
const TOKEN = JSON.parse(localStorage.getItem("user"));
export default axios.create({
  baseUrl: "https://localhost:44364/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: "Bearer " + TOKEN,
  },
});
