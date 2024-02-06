import { getAuthToken } from "./auth";
import axios from "axios";
import host from "../host";

export async function confirmTrade(
  tradeID: number,
  setDidConfirm: (didConfirm: boolean) => void
) {
  const token = getAuthToken();

  try {
    const response = await axios.put(
      `${host}/api/trades/confirm/${tradeID}`,
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

    setDidConfirm(true);
  } catch (error) {
    return error;
  }
}
