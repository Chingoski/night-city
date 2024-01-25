import { Input, IconButton } from "@chakra-ui/react";
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
  return (
    <>
      <Input
        placeholder="Search listings"
        w="30%"
        minW="150px"
        bg="white"
        ref={searchInput}
        name="search"
      />
      <IconButton
        aria-label="Click to search!"
        icon={<FaMagnifyingGlass />}
        onClick={searchHandler}
        bg="white"
        color="gray.700"
      />
    </>
  );
};

export default SearchInput;
