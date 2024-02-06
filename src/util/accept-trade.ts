import { getAuthToken } from "./auth";
import axios from "axios";
import host from "../host";

export async function acceptTrade(
  tradeID: number,
  setDidAccept: (didAccept: boolean) => void
) {
  const token = getAuthToken();

  try {
    const response = await axios.put(
      `${host}/api/trades/accept/${tradeID}`,
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

    setDidAccept(true);
  } catch (error) {
    return error;
  }
}
