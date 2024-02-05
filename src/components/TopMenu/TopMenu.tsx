import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { filteringContext } from "../../context/FilterContext";

import { cityType } from "../../types/city-types";
import { option } from "../../types/option-types";
import { platforms, tradePreferences, sortBy } from "../../util/options";

import { Flex, IconButton } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import SelectMenu from "./SelectMenu";

import { FaSortAmountDown, FaGamepad, FaCity } from "react-icons/fa";
import { FaCoins, FaArrowRotateLeft } from "react-icons/fa6";
import AddButton from "../UI/AddButton";

function TopMenu() {
  const cities = useLoaderData() as cityType[];
  const navigate = useNavigate();

  const {
    setSearchInputValue,
    cityId,
    setCityId,
    platformId,
    setPlatformId,
    tradePreference,
    setTradePreference,
    order,
    setOrder,
  } = useContext(filteringContext);

  function citySelectHandler(value: number) {
    setCityId(value);
  }

  function platformSelectHandler(value: number) {
    setPlatformId(value);
  }

  function tradePreferenceSelectHandler(value: number) {
    if (value === 0) {
      setTradePreference(null);
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

  function searchInputHandler(value: string) {
    setSearchInputValue(value);
  }

  function clearFilters() {
    setCityId(0);
    setSearchInputValue("");
    setPlatformId(0);
    setTradePreference(null);
    setOrder("");
  }

  function navigateNewListing() {
    navigate("/new-listing");
  }

  return (
    <Flex
      flexDirection="row"
      w="100%"
      p="10px 15px 0 15px"
      gap="10px"
      alignItems="center"
    >
      <SearchInput
        searchInputHandler={searchInputHandler}
        placeholder="Search listings"
      />
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
        isActive={tradePreference !== null}
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
      <IconButton
        onClick={clearFilters}
        icon={<FaArrowRotateLeft />}
        aria-label="clear filters"
        backgroundColor={"white"}
        color="gray.600"
        fontSize="1.5rem"
      />
      <AddButton title="Add Listing" onClick={navigateNewListing} />
    </Flex>
  );
}

export default TopMenu;
