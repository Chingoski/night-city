import axios from "axios";
import host from "../host";
import { getAuthToken } from "./auth";
import { gameType } from "../types/game-types";
import { tradePreferences } from "./options";

export async function createListing(
  userID: number,
  pickedGames: gameType[],
  description: string,
  tradePreference: string | null,
  setFormErrorMessage: (formErrorMessage: string) => void,
  setPickedGames: (pickedGame: gameType[]) => void,
  setListingDescription: (description: string) => void,
  setSelectedTradePreference: (tradePreference: string) => void,
  setDidSubmit: (didSubmit: boolean) => void,
  setSearchValue: (searchValue: string) => void
) {
  const token = getAuthToken();

  try {
    const response = await axios.post(
      `${host}/api/game_listings`,
      {
        owner_id: userID,
        game_id: pickedGames[0].id,
        platform_id: pickedGames[0].platform.id,
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

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    setPickedGames([]);
    setListingDescription("");
    setSelectedTradePreference(tradePreferences[0].name as string);
    setFormErrorMessage("");
    setDidSubmit(true);
    setSearchValue("");
  } catch (error) {
    setFormErrorMessage(`Couldn't create listing!`);
  }
}
