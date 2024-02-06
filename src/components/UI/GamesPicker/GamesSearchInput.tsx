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
  inputChangeHandler: (value: string) => void;
  searchValue: string;
}> = ({ inputChangeHandler, searchValue }) => {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    inputChangeHandler(event.target.value);
  }
  return (
    <Flex w="100%" flexDir="column">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaGamepad} color="gray.600" />
        </InputLeftElement>
        <Input
          type="text"
          onChange={onChange}
          placeholder="Search games"
          focusBorderColor="teal.300"
          value={searchValue}
          backgroundColor="white"
        />
      </InputGroup>
    </Flex>
  );
};

export default GamesSearchInput;
