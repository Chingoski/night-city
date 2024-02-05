import { getAuthToken } from "./auth";
import host from "../host";
import axios from "axios";
import updateURL from "./update-url";
import { tradeType } from "../types/trade-type";

export function constructURL(
  searchVal: string,
  statusID: number,
  type: string,
  userID: number
) {
  const url = new URL(`${host}/api/trades`);
  if (type === "received") {
    url.searchParams.append("owner_id", `${userID}`);
    url.searchParams.append("status", `${statusID}`);
    if (searchVal !== "") {
      url.searchParams.append("search", searchVal);
    }
  }
  if (type === "sent") {
    url.searchParams.append("trader_user_id", `${userID}`);
    url.searchParams.append("status", `${statusID}`);
    if (searchVal !== "") {
      url.searchParams.append("search", searchVal);
    }
  }
  return url;
}

export async function fetchTrades(
  tradesURL: URL | null,
  setTrades: (trades: tradeType[]) => void,
  setNextPage: (nextPage: URL | null) => void,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);
  const token = getAuthToken();
  try {
    const response = await axios.get(`${tradesURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    setTrades(response.data.data);

    if (response.data.meta.pagination.links.next) {
      const nextPageUrl = new URL(
        updateURL(response.data.meta.pagination.links.next)
      );
      setNextPage(nextPageUrl);
    } else {
      setNextPage(null);
    }
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}
