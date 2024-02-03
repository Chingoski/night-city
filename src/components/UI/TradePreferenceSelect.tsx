import {
  Flex,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
} from "@chakra-ui/react";

import { tradePreferences } from "../../util/options";
import { FaChevronDown } from "react-icons/fa";

const TradePreferenceSelect: React.FC<{
  selectedTradePreference: string;
  selectHandler: (value: string) => void;
}> = ({ selectedTradePreference, selectHandler }) => {
  return (
    <Flex w="100%" flexDir="column">
      <Text fontSize="1rem" fontWeight="600" w="100%" mb="10px">
        Trade preference for this listing:
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FaChevronDown />}
          textAlign="left"
          backgroundColor="white"
          color="gray.600"
          fontWeight="400"
        >
          {selectedTradePreference}
        </MenuButton>
        <MenuList w="100%">
          {tradePreferences.map((tradePreference) => (
            <MenuItem
              fontSize="1rem"
              key={tradePreference.id}
              onClick={() => selectHandler(`${tradePreference.name}`)}
            >
              {tradePreference.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default TradePreferenceSelect;
