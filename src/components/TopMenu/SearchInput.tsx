import { Input, Icon, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { useContext, useRef } from "react";

import { filteringContext } from "../../context/FilterContext";

const SearchInput = () => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { setSearchInputValue } = useContext(filteringContext);

  function searchHandler() {
    if (searchInput.current) {
      setSearchInputValue(searchInput.current.value);
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
        placeholder="Search listings"
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
