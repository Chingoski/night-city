import { useEffect, useState } from "react";

import { tradeType } from "../../types/trade-type";

import { constructURL, fetchTrades } from "../../util/get-trades";

import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
import TradeCard from "./TradeCard";
import SearchInput from "../TopMenu/SearchInput";
import StatusMenuSelect from "./StatusMenuSelect";
import LoadMoreButton from "../UI/LoadMoreButton";

const TradeOffersPanel: React.FC<{ type: string; userID: number }> = ({
  type,
  userID,
}) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [activeStatus, setActiveStatus] = useState(0);
  const [trades, setTrades] = useState<tradeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  function searchInputHandler(value: string) {
    setSearchInputValue(value);
  }

  function statusSelectHandler(value: number) {
    setSearchInputValue("");
    setActiveStatus(value);
  }

  function loadMoreHandler() {}

  useEffect(() => {
    const tradesURL = constructURL(
      searchInputValue,
      activeStatus,
      type,
      userID
    );
    fetchTrades(tradesURL, setTrades, setNextPage, setIsLoading);
  }, [searchInputValue, activeStatus]);

  return (
    <Flex w="100%" flexDirection="column">
      <Flex
        flexDir="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="15px"
      >
        <SearchInput
          placeholder="Search trades"
          searchInputHandler={searchInputHandler}
        />
        <StatusMenuSelect
          selectedStatus={activeStatus}
          selectStatusHandler={statusSelectHandler}
        />
      </Flex>

      {!isLoading && trades.length !== 0 && (
        <>
          {searchInputValue !== "" && (
            <Text p="10px 15px 0 15px" fontSize="0.9rem" color="gray.500" m="0">
              Showing results for: "{searchInputValue}"
            </Text>
          )}
          <SimpleGrid
            mt="10px"
            minChildWidth="300px"
            spacing="15px"
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} type={type} />
            ))}
          </SimpleGrid>
        </>
      )}

      {isLoading && trades.length !== 0 && (
        <>
          {searchInputValue !== "" && (
            <Text p="10px 15px 0 15px" fontSize="0.9rem" color="gray.500" m="0">
              Showing results for: "{searchInputValue}"
            </Text>
          )}
          <SimpleGrid
            mt="10px"
            minChildWidth="300px"
            spacing="15px"
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} type={type} />
            ))}
          </SimpleGrid>
          <Text w="100%" margin="auto" paddingTop="25px" textAlign="center">
            Loading...
          </Text>
        </>
      )}

      {!isLoading && trades.length === 0 && (
        <Text w="100%" margin="auto" textAlign="center">
          No listings found.
        </Text>
      )}

      {isLoading && trades.length === 0 && (
        <Text w="100%" margin="auto" textAlign="center">
          Loading...
        </Text>
      )}

      {nextPage !== null && !isLoading && trades.length !== 0 && (
        <LoadMoreButton loadMoreHandler={loadMoreHandler} />
      )}
    </Flex>
  );
};

export default TradeOffersPanel;
