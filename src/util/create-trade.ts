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
  setGameResults: (gameResults: gameType[]) => void
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

      setGameResults(response.data.data);
    } catch (error) {
      return error;
    }
  }
  if (value === "") {
    setGameResults([]);
  }
}

export async function placeTradeOffer(
  games: gameType[],
  cash: number,
  userID: number,
  listingID: number
) {
  const token = getAuthToken();
  const offeredGames = games.map((game) => {
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

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return error;
  }
}
