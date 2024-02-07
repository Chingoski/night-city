import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  CardBody,
  Icon,
  CardFooter,
  Badge,
} from "@chakra-ui/react";
import { tradeType } from "../../types/trade-type";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

import TradeOfferItems from "./TradeOfferItems";
import TradedListing from "./TradedListing";
import AcceptTradeButton from "./TradeOffersActions/AcceptTradeButton";
import UpdateTradeButton from "./TradeOffersActions/UpdateTradeButton";
import CancelTradeButton from "./TradeOffersActions/CancelTradeButton";
import ConfirmTradeButton from "./TradeOffersActions/ConfirmTradeButton";

const TradeCard: React.FC<{
  trade: tradeType;
  type: string;
  activeStatus: number;
  acceptOnOpen: () => void;
  cancelOnOpen: () => void;
  updateOnOpen: () => void;
  confirmOnOpen: () => void;
}> = ({
  trade,
  type,
  activeStatus,
  acceptOnOpen,
  cancelOnOpen,
  updateOnOpen,
  confirmOnOpen,
}) => {
  return (
    <Card maxW="md" justify="center">
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar
            w="25px"
            h="25px"
            name={
              type === "received"
                ? trade.trader?.data.full_name
                : trade.game_listing?.data.owner.full_name
            }
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
          />
          <Box>
            <Heading fontSize="0.9rem">
              {type === "received"
                ? trade.trader?.data.full_name
                : trade.game_listing?.data.owner.full_name}
            </Heading>
            <Text fontSize="0.8rem">
              {type === "received"
                ? trade.trader?.data.city.name
                : trade.game_listing?.data.owner.city.name}
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody
        pt="0"
        gap="10px"
        w="100%"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <>
          {type === "received" ? (
            <>
              {activeStatus === 1 && (
                <Badge
                  bg={trade.trader_confirmed ? "teal.400" : "gray.100"}
                  color={trade.trader_confirmed ? "white" : "gray.500"}
                  textTransform="uppercase"
                  p="2px 4px"
                  opacity="0.8"
                  w="100%"
                  textAlign="right"
                >
                  {trade.trader_confirmed
                    ? "Confirmed by trader"
                    : "Awaiting confirmation"}
                </Badge>
              )}
              <TradeOfferItems trade={trade} type={type} />
            </>
          ) : (
            <>
              {activeStatus === 1 && (
                <Badge
                  bg={trade.owner_confirmed ? "teal.400" : "gray.100"}
                  color={trade.owner_confirmed ? "white" : "gray.500"}
                  textTransform="uppercase"
                  p="2px 4px"
                  opacity="0.8"
                  w="100%"
                  textAlign="right"
                >
                  {trade.owner_confirmed
                    ? "Confirmed by owner"
                    : "Awaiting confirmation"}
                </Badge>
              )}
              <TradedListing trade={trade} type={type} />
            </>
          )}
          <Icon
            as={FaArrowRightArrowLeft}
            transform="rotate(90deg)"
            color="gray.600"
          />
          {type === "received" ? (
            <TradedListing trade={trade} type={type} />
          ) : (
            <TradeOfferItems trade={trade} type={type} />
          )}
        </>
      </CardBody>
      <CardFooter justifyContent="space-evenly">
        {activeStatus === 0 && type === "received" && (
          <AcceptTradeButton onOpen={acceptOnOpen} trade={trade} />
        )}
        {activeStatus === 0 && type === "sent" && (
          <UpdateTradeButton onOpen={updateOnOpen} trade={trade} />
        )}
        {activeStatus === 1 && (
          <ConfirmTradeButton
            trade={trade}
            onOpen={confirmOnOpen}
            type={type}
          />
        )}
        {(activeStatus === 0 || activeStatus === 1) && (
          <CancelTradeButton trade={trade} onOpen={cancelOnOpen} />
        )}
      </CardFooter>
    </Card>
  );
};

export default TradeCard;
