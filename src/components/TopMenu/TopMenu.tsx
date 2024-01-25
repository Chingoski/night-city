import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { filteringContext } from "../../context/FilterContext";

import { cityType } from "../../types/city-types";
import { option } from "../../types/option-types";
import { platforms, tradePreferences, sortBy } from "../../util/options";

import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import SelectMenu from "./SelectMenu";

import { FaSortAmountDown, FaGamepad, FaCity } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";

function TopMenu() {
  const cities = useLoaderData() as cityType[];

  const {
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
