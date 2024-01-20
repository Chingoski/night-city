import { useLoaderData } from "react-router-dom";

import { cityType } from "../../types/city-types";

import { Flex } from "@chakra-ui/react";

import { FaSortAmountDown, FaGamepad, FaCity } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";


import { useContext, useEffect } from "react";
import { filteringContext } from "../../context/FilterContext";
import fetchListings, { constructUrl } from "../../util/listings";
import { allListingsContext } from "../../context/AllListingsContext";

import SearchInput from "./SearchInput";
import SelectMenu from "./SelectMenu";
import { option } from "../../types/option-types";
import { platforms, tradePreferences, sortBy } from "../../util/options";

function TopMenu() {
  const cities = useLoaderData() as cityType[];

  const {
    searchInputValue,
    cityId,
    setCityId,
    platformId,
    setPlatformId,
    tradePreference,
    setTradePreference,
    order,
    setOrder,
  } = useContext(filteringContext);
  const { setIsLoading, setNextPage, setAllListings } =
    useContext(allListingsContext);

  function citySelectHandler(value: number) {
    setCityId(value);
  }

  function platformSelectHandler(value: number) {
    setPlatformId(value);
  }

  function tradePreferenceSelectHandler(value: number) {
    if (value === 0) {
      setTradePreference(undefined);
    } else {
      const tradePreferenceVal = tradePreferences.find(
        (preference) => preference.id === value
      ) as option;
      setTradePreference(tradePreferenceVal.name);
    }
  }

  function orderSelectHandler(value: number) {
    if (value === 0) {
      setOrder("");
    } else {
      const sortVal = sortBy.find((sortVal) => sortVal.id === value) as option;
      setOrder(sortVal.name);
    }
  }

  useEffect(() => {
    const listingUrl = constructUrl(
      cityId,
      searchInputValue,
      platformId,
      tradePreference,
      order
    );
    fetchListings(listingUrl, setIsLoading, setNextPage, setAllListings);
  }, [cityId, searchInputValue, platformId, tradePreference, order]);

  return (
    <Flex
      flexDirection="row"
      w="100%"
      p="10px 20px"
      gap="10px"
      alignItems="center"
    >
      <SearchInput />
      <SelectMenu
        name="City"
        options={cities}
        icon={<FaCity />}
        onChange={citySelectHandler}
        isActive={cityId !== 0}
        activeId={cityId}
        sortingMenu={false}
      />
      <SelectMenu
        name="Platform"
        options={platforms}
        icon={<FaGamepad />}
        onChange={platformSelectHandler}
        isActive={platformId !== 0}
        activeId={platformId}
        sortingMenu={false}
      />
      <SelectMenu
        name="Trade Preference"
        options={tradePreferences}
        icon={<FaCoins />}
        onChange={tradePreferenceSelectHandler}
        isActive={tradePreference !== undefined}
        activeId={
          tradePreferences.find(
            (preference) => preference.name === tradePreference
          )?.id
        }
        sortingMenu={false}
      />
      <SelectMenu
        name="Sort by"
        options={sortBy}
        icon={<FaSortAmountDown />}
        onChange={orderSelectHandler}
        isActive={order !== ""}
        activeId={sortBy.find((sortVal) => sortVal.name === order)?.id}
        sortingMenu={true}
      />
    </Flex>
  );
}

export default TopMenu;
