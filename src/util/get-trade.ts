import { getAuthToken } from "./auth";
import host from "../host";
import axios from "axios";
import { tradeType } from "../types/trade-type";

export async function getTrade(
  listingID: number,
  setCompletedTrade: (completedTrade: tradeType) => void
) {
  const token = getAuthToken();
  try {
    const response = await axios.delete(
      `${host}/api/trades?game_listing_id=${listingID}`,
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
    setCompletedTrade(response.data.data);
  } catch (error) {}
}
