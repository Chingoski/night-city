import { useEffect, useState } from "react";

import { tradeType } from "../../types/trade-type";

import { constructURL, fetchTrades } from "../../util/get-trades";

import { Flex, useDisclosure } from "@chakra-ui/react";
import TradeCard from "./TradeCard";
import SearchInput from "../TopMenu/SearchInput";
import StatusMenuSelect from "./StatusMenuSelect";
import LoadMoreButton from "../UI/LoadMoreButton";
import GridWrapper from "../UI/GridWrapper";
import SearchResultsMessage from "../UI/SearchResultsMessage";
import LoadingMessage from "../UI/LoadingMessage";
import NoResultsMessage from "../UI/NoResultsMessage";
import AcceptTradeModal from "./TradeOffersActions/AcceptTradeModal";
import CancelTradeModal from "./TradeOffersActions/CancelTradeModal";
import UpdateTradeModal from "./TradeOffersActions/UpdateTradeModal";
import ConfirmTradeModal from "./TradeOffersActions/ConfirmTradeModal";

const TradeOffersPanel: React.FC<{ type: string; userID: number }> = ({
  type,
  userID,
}) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [activeStatus, setActiveStatus] = useState(0);
  const [trades, setTrades] = useState<tradeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  function searchInputHandler(value: string) {
    setSearchInputValue(value);
  }

  function statusSelectHandler(value: number) {
    setSearchInputValue("");
    setActiveStatus(value);
  }

  function loadMoreHandler() {
    // setIsLoadingMore(true);
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

  const {
    isOpen: acceptIsOpen,
    onOpen: acceptOnOpen,
    onClose: acceptOnClose,
  } = useDisclosure();

  const {
    isOpen: cancelIsOpen,
    onOpen: cancelOnOpen,
    onClose: cancelOnClose,
  } = useDisclosure();

  const {
    isOpen: updateIsOpen,
    onOpen: updateOnOpen,
    onClose: updateOnClose,
  } = useDisclosure();

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnClose,
  } = useDisclosure();

  function removeTrade(toRemoveTrade: tradeType) {
    const updatedTrades = trades.filter(
      (trade) => trade.id !== toRemoveTrade.id
    );
    setTrades(updatedTrades);
  }

  function updateTradesArrayHandler(updatedTrade: tradeType) {
    const updatedTradesArray: tradeType[] = trades.map((trade) =>
      trade.id === updatedTrade.id ? updatedTrade : trade
    );
    setTrades(updatedTradesArray);
  }

  return (
    <>
      <AcceptTradeModal
        onClose={acceptOnClose}
        isOpen={acceptIsOpen}
        type={type}
        removeTrade={removeTrade}
      />
      <CancelTradeModal
        onClose={cancelOnClose}
        isOpen={cancelIsOpen}
        removeTrade={removeTrade}
      />
      <UpdateTradeModal
        onClose={updateOnClose}
        isOpen={updateIsOpen}
        updateTrades={updateTradesArrayHandler}
      />
      <ConfirmTradeModal
        onClose={confirmOnClose}
        type={type}
        isOpen={confirmIsOpen}
        updateTrades={updateTradesArrayHandler}
      />
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
              <SearchResultsMessage searchInputValue={searchInputValue} />
            )}
            <GridWrapper>
              {trades.map((trade) => (
                <TradeCard
                  key={trade.id}
                  trade={trade}
                  type={type}
                  activeStatus={activeStatus}
                  acceptOnOpen={acceptOnOpen}
                  cancelOnOpen={cancelOnOpen}
                  updateOnOpen={updateOnOpen}
                  confirmOnOpen={confirmOnOpen}
                />
              ))}
            </GridWrapper>
          </>
        )}

        {isLoadingMore && trades.length !== 0 && (
          <>
            {searchInputValue !== "" && (
              <SearchResultsMessage searchInputValue={searchInputValue} />
            )}
            <GridWrapper>
              {trades.map((trade) => (
                <TradeCard
                  key={trade.id}
                  trade={trade}
                  type={type}
                  activeStatus={activeStatus}
                  acceptOnOpen={acceptOnOpen}
                  cancelOnOpen={cancelOnOpen}
                  updateOnOpen={updateOnOpen}
                  confirmOnOpen={confirmOnOpen}
                />
              ))}
            </GridWrapper>
            <LoadingMessage />
          </>
        )}

        {!isLoading && trades.length === 0 && (
          <NoResultsMessage resultType="trades" />
        )}

        {isLoading && trades.length === 0 && <LoadingMessage />}

        {nextPage !== null && !isLoading && trades.length !== 0 && (
          <LoadMoreButton loadMoreHandler={loadMoreHandler} />
        )}
      </Flex>
    </>
  );
};

export default TradeOffersPanel;
