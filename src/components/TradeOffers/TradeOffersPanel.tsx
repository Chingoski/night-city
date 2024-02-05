import { useEffect, useState } from "react";

import { tradeType } from "../../types/trade-type";

import { constructURL, fetchTrades } from "../../util/get-trades";

import { Flex } from "@chakra-ui/react";
import SearchInput from "../TopMenu/SearchInput";
import StatusMenuSelect from "./StatusMenuSelect";

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
      {trades.map((trade) => (
        <Flex key={trade.id}>{trade.id}</Flex>
      ))}
    </Flex>
  );
};

export default TradeOffersPanel;
