import axios from "axios";
import host from "../host";
import { getAuthToken } from "./auth";
import { userType } from "../types/user-types";

export async function getUser(
  userID: number | undefined,
  setUser: (user: userType) => void
) {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${host}/api/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    setUser(response.data.data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
