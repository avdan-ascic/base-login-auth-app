import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  withCredentials: true,
  credentials: "include",
};

export const login = async (user) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/users/login`,
      user,
      { headers }
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/users/logout`, {
      headers,
    });
    return response.data;
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

export const authenticate = async () => {
  if (typeof window == "undefined") return false;

  return axios
    .get(`${baseUrl.server}/api/users/authenticate`, { headers })
    .then((response) => response.data)
    .catch((err) => {
      return err;
    });
};
