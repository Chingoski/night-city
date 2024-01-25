import axios from "axios";
import host from "../host";
import { listingType } from "../types/listing-type";
import { getAuthToken } from "./auth";
import { gameType } from "../types/game-types";

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

export async function fetchGames(
  value: string,
  setGameResults: (gameResults: gameType[]) => void,
  pickedGames: gameType[]
) {
  const token = getAuthToken();
  if (value !== "") {
    try {
      const response = await axios.get(`${host}/api/games?search=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const responseGames: gameType[] = response.data.data;

      setGameResults(
        responseGames.filter(
          (responseGame) =>
            !pickedGames.some(
              (pickedGame) =>
                pickedGame.id === responseGame.id &&
                pickedGame.platform.id === responseGame.platform.id
            )
        )
      );
    } catch (error) {
      return error;
    }
  }
  if (value === "") {
    setGameResults([]);
  }
}

export async function placeTradeOffer(
  pickedGames: gameType[],
  cash: number,
  userID: number,
  listingID: number,
  setPickedGames: (pickedGame: gameType[]) => void,
  setSearchValue: (searchValue: string) => void,
  setOfferedCash: (offeredCash: number) => void,
  setFormErrorMessage: (formErrorMessage: string) => void,
  setDidSubmit: (didSubmit: boolean) => void
) {
  const token = getAuthToken();
  const offeredGames = pickedGames.map((game) => {
    return {
      id: game.id,
      platform: {
        id: game.platform.id,
      },
    };
  });
  try {
    const response = await axios.post(
      `${host}/api/trades`,
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

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    setPickedGames([]);
    setOfferedCash(0);
    setSearchValue("");
    setDidSubmit(true);
  } catch (error) {
    setFormErrorMessage("Trade offer could not be placed!");
  }
}
