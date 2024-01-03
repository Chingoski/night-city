import { useLoaderData } from "react-router-dom";

import { cityType } from "../../types/city-types";

import { Flex } from "@chakra-ui/react";
import { Input, Select } from "@chakra-ui/react";

function TopMenu() {
  const cities = useLoaderData() as cityType[];

  return (
    <Flex flexDirection="row" w="100%" p="10px 20px" gap="10px">
      <Input placeholder="Search listings" w="30%" minW="150px" bg="white" />
      <Select placeholder="Filter by location" w="15%" minW="180px" bg="white">
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

export default TopMenu;
