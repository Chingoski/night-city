import axios from "axios";
import host from "../host";
import { listingType } from "../types/listing-type";
import { getAuthToken } from "./auth";

export async function deleteMyListing(listing: listingType) {
  const token = getAuthToken();
  const listingID: number = listing.id;
  try {
    const response = await axios.delete(
      `${host}/api/game_listings/${listingID}`,
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

    console.log("delete");
  } catch (error) {
    return error;
  }
}
