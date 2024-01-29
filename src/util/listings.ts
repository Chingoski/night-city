import axios from "axios";
import host from "../host";

import { listingType } from "../types/listing-type";

import updateURL from "./update-url";
import { getAuthToken } from "./auth";

async function fetchListings(
  listingUrl: URL | null,
  setIsLoading: (isLoading: boolean) => void,
  setNextPage: (url: URL | null) => void,
  setListings: (listings: listingType[]) => void
) {
  setIsLoading(true);
  const token = getAuthToken();
  try {
    const response = await axios.get(`${listingUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (response.data.meta.pagination.links.next) {
      const nextPageUrl = new URL(
        updateURL(response.data.meta.pagination.links.next)
      );
      setNextPage(nextPageUrl);
    } else {
      setNextPage(null);
    }

    setListings(response.data.data);
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}

export function constructUrl(
  city: number,
  text: string,
  platform: number,
  tradePreference: string | null,
  order: string | null
) {
  const url = new URL(`${host}/api/game_listings`);

  if (text !== "") {
    url.searchParams.append("search", text);
  }

  if (city !== 0) {
    url.searchParams.append("city_id", `${city}`);
  }
  if (platform !== 0) {
    url.searchParams.append("platform_id", `${platform}`);
  }
  if (tradePreference !== null) {
    url.searchParams.append("trade_preference", tradePreference);
  }
  if (order !== null && order !== "") {
    url.searchParams.append("order_by", order);
  }

  return url;
}

export async function fetchNextPage(
  nextPage: URL | null,
  setIsLoading: (isLoading: boolean) => void,
  setNextPage: (url: URL | null) => void,
  listings: listingType[],
  setListings: (listings: listingType[]) => void
) {
  const token = getAuthToken();
  setIsLoading(true);
  try {
    const response = await axios.get(`${nextPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (response.data.meta.pagination.links.next) {
      const nextPageUrl = new URL(
        updateURL(response.data.meta.pagination.links.next)
      );
      setNextPage(nextPageUrl);
    } else {
      setNextPage(null);
    }

    setListings([...listings, ...response.data.data]);
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}

export default fetchListings;
