import axios from "axios";
import host from "../host";

import { listingType } from "../types/listing-type";

import { getHeaders } from "./get-request-headers";
import updateURL from "./update-url";
import { cityIdType } from "../types/city-types";

async function fetchListings(
  listingUrl: string,
  setIsLoading: (isLoading: boolean) => void,
  setNextPage: (url: string) => void,
  setListings: (listings: listingType[]) => void
) {
  setIsLoading(true);
  try {
    const response = await axios.get(listingUrl, {
      headers: getHeaders,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (response.data.meta.pagination.links.next) {
      const nextPageUrl = updateURL(response.data.meta.pagination.links.next);
      setNextPage(nextPageUrl);
    } else {
      setNextPage("");
    }

    setListings(response.data.data);
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}

export function constructUrl(city: cityIdType, text: string) {
  if (city === 0 && text === "") {
    const url = `${host}/api/game_listings`;
    return url;
  }
  if (city !== 0 && text === "") {
    const url = `${host}/api/game_listings?city_id=${city}`;
    return url;
  }
  if (city === 0 && text !== "") {
    const url = `${host}/api/game_listings?search=${text}`;
    return url;
  } else {
    const url = `${host}/api/game_listings?search=${text}&city_id=${city}`;
    return url;
  }
}

export async function fetchNextPage(
  nextPage: string,
  setIsLoading: (isLoading: boolean) => void,
  setNextPage: (url: string) => void,
  listings: listingType[],
  setListings: (listings: listingType[]) => void
) {
  setIsLoading(true);
  try {
    const response = await axios.get(nextPage, {
      headers: getHeaders,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (response.data.meta.pagination.links.next) {
      const nextPageUrl = updateURL(response.data.meta.pagination.links.next);
      setNextPage(nextPageUrl);
    }

    setListings(listings.concat(response.data.data));
  } catch (error) {
    return error;
  } finally {
    setIsLoading(false);
  }
}

export default fetchListings;
