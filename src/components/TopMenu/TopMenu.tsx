import { useLoaderData } from "react-router-dom";

import { ChangeEvent, useContext, useState } from "react";
import { filteringContext } from "../../context/FilterContext";

import { cityType } from "../../types/city-types";

import { Flex, Input, Select, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function TopMenu() {
  const cities = useLoaderData() as cityType[];

  const { setInputCityId, setSearchInputValue } = useContext(filteringContext);
  const [searchInput, setSearchInput] = useState("");

  function selectHandler(event: ChangeEvent<HTMLSelectElement>) {
    setInputCityId(+event.target.value);
  }

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function searchHandler() {
    setSearchInputValue(searchInput);
  }

  return (
    <Flex flexDirection="row" w="100%" p="10px 20px" gap="10px">
      <Input
        placeholder="Search listings"
        w="30%"
        minW="150px"
        bg="white"
        onChange={inputChangeHandler}
      />
      <IconButton
        aria-label="Click to search!"
        icon={<SearchIcon />}
        onClick={searchHandler}
        bg="white"
      />

      <Select
        onChange={selectHandler}
        variant="filled"
        placeholder="Filter by location"
        w="15%"
        minW="180px"
        bg="white"
      >
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

export default TopMenu;
