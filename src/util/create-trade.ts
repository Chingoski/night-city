import axios from "axios";
import host from "../host";
import { listingType } from "../types/listing-type";
import { getAuthToken } from "./auth";

export async function fetchListing(
  id: string,
  setIsLoading: (isLoading: boolean) => void,
  setListing: (listing: listingType | null) => void
) {
  const token = getAuthToken();
  setIsLoading(true);
  try {
    const response = await axios.get(`${host}/api/game_listings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    setListing(response.data.data);
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}
