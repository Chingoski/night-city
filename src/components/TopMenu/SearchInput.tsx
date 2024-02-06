import { Input, Icon, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { useRef } from "react";

const SearchInput: React.FC<{
  searchInputHandler: (searchInput: string) => void;
  placeholder: string;
}> = ({ searchInputHandler, placeholder }) => {
  const searchInput = useRef<HTMLInputElement | null>(null);

  function searchHandler() {
    if (searchInput.current) {
      searchInputHandler(searchInput.current.value);
    }
  }

  function onEnterKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchHandler();
    }
  }
  return (
    <InputGroup w="30%" minW="150px">
      <InputLeftElement>
        <Icon
          as={FaMagnifyingGlass}
          onClick={searchHandler}
          bg="white"
          color="gray.700"
        />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        bg="white"
        ref={searchInput}
        name="search"
        onKeyDown={onEnterKeyPress}
        focusBorderColor="teal.300"
      />
    </InputGroup>
  );
};

export default SearchInput;
