import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json, text/plain, */*",
  },
});

export const api = {
  getRooms() {
    return instance.get("/");
  },
  entryRoom(values) {
    return instance.post("/", { values });
  },
};
