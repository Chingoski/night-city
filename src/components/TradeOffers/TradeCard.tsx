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
} from "@chakra-ui/react";
import TradeOfferItems from "./TradeOfferItems";
import TradedListing from "./TradedListing";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

import { tradeType } from "../../types/trade-type";

const TradeCard: React.FC<{ trade: tradeType; type: string }> = ({
  trade,
  type,
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
            <TradeOfferItems trade={trade} type={type} />
          ) : (
            <TradedListing trade={trade} type={type} />
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
    </Card>
  );
};

export default TradeCard;
