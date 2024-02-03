import { getAuthToken } from "./auth";
import axios from "axios";
import host from "../host";
import { listingType } from "../types/listing-type";

export async function updateListing(
  listing: listingType | null,
  description: string,
  tradePreference: string | null,
  setFormErrorMessage: (formErrorMessage: string) => void,
  setDidSubmit: (didSubmit: boolean) => void
) {
  const token = getAuthToken();
  const listingID = listing?.id;

  try {
    const response = await axios.put(
      `${host}/api/game_listings/${listingID}`,
      {
        description: description,
        trade_preference: tradePreference,
      },
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
    setDidSubmit(true);
  } catch (error) {
    setFormErrorMessage("There was a problem updating your listing.");
  }
}
