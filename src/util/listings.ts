import axios from "axios";
import host from "../host";

import { listingType } from "../types/listing-type";

import { getHeaders } from "./get-request-headers";
import updateURL from "./update-url";

async function fetchListings(
  listingUrl: URL | null,
  setIsLoading: (isLoading: boolean) => void,
  setNextPage: (url: URL | null) => void,
  setListings: (listings: listingType[]) => void
) {
  setIsLoading(true);
  try {
    const response = await axios.get(`${listingUrl}`, {
      headers: getHeaders,
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
  tradePreference: string | undefined,
  order: string | undefined
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
  if (tradePreference !== undefined) {
    url.searchParams.append("trade_preference", tradePreference);
  }
  if (order !== undefined && order !== "") {
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
  setIsLoading(true);
  try {
    const response = await axios.get(`${nextPage}`, {
      headers: getHeaders,
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

    setListings(listings.concat(response.data.data));
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}

export default fetchListings;
