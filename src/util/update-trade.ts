import { gameType } from "../types/game-types";
import { getAuthToken } from "./auth";
import host from "../host";
import axios from "axios";

export async function updateTradeOffer(
  pickedGames: gameType[],
  cash: number,
  userID: number,
  listingID: number,
  tradeID: number,
  setFormErrorMessage: (formErrorMessage: string) => void,
  setDidUpdate: (didUpdate: boolean) => void
) {
  const token = getAuthToken();
  const offeredGames = pickedGames.map((game) => {
    return {
      game_id: game.id,
      platform_id: game.platform.id,
    };
  });
  console.log(offeredGames);
  try {
    const response = await axios.put(
      `${host}/api/trades/${tradeID}`,
      {
        game_listing_id: listingID,
        games: offeredGames,
        offered_amount: cash,
        trader_user_id: userID,
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

    setDidUpdate(true);
  } catch (error) {
    setFormErrorMessage("Trade offer could not be placed!");
  }
}
