import axios from "axios";
import { getAuthToken } from "./auth";
import host from "../host";
import { gameType } from "../types/game-types";

export async function getGames(
  value: string,
  setResponse: (response: gameType[]) => void,
  setIsSearching: (isSearching: boolean) => void
) {
  const token = getAuthToken();
  setIsSearching(true);
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

    setResponse(response.data.data);
  } catch (error) {
    return error;
  } finally {
    setIsSearching(false);
  }
}
