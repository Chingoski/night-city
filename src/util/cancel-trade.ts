import { getAuthToken } from "./auth";
import axios from "axios";
import host from "../host";

export async function cancelTrade(
  tradeID: number,
  setDidCancel: (didCancel: boolean) => void
) {
  const token = getAuthToken();

  try {
    const response = await axios.put(
      `${host}/api/trades/cancel/${tradeID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    setDidCancel(true);
  } catch (error) {
    return error;
  }
}
