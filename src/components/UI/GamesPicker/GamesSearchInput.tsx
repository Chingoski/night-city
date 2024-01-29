import {
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

import { FaGamepad } from "react-icons/fa";

const GamesSearchInput: React.FC<{
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}> = ({ inputChangeHandler, searchValue }) => {
  return (
    <Flex w="100%" flexDir="column">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaGamepad} color="gray.600" />
        </InputLeftElement>
        <Input
          type="text"
          onChange={inputChangeHandler}
          placeholder="Search games"
          focusBorderColor="teal.300"
          value={searchValue}
          name="games"
          backgroundColor="white"
        />
      </InputGroup>
    </Flex>
  );
};

export default GamesSearchInput;
