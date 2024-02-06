import { Text } from "@chakra-ui/react";

const SearchResultsMessage: React.FC<{ searchInputValue: string }> = ({
  searchInputValue,
}) => {
  return (
    <Text p="10px 15px 0 15px" fontSize="0.9rem" color="gray.500" m="0">
      Showing results for: "{searchInputValue}"
    </Text>
  );
};

export default SearchResultsMessage;
