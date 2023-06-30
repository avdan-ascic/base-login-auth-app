import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const create = async (user) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/users/register`,
      user,
      {
        headers,
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data.errors ? err.response.data : err;
  }
};
