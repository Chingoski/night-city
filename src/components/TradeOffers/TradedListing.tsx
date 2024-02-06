import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { tradeType } from "../../types/trade-type";

import controller from "../../assets/controller.png";

const TradedListing: React.FC<{ trade: tradeType; type: string }> = ({
  trade,
  type,
}) => {
  return (
    <Flex w="100%" justifyContent="flex-start" alignItems="center" gap="10px">
      <Image
        w="auto"
        h="60px"
        src={trade.game_listing?.data.game.thumbnail}
        fallbackSrc={controller}
      />
      <Flex flexDir="column" gap="3px">
        <Text fontSize="0.8rem" textTransform="uppercase">
          {type === "received"
            ? "Your listing:"
            : `${trade.game_listing?.data.owner.first_name}'s listing:`}
        </Text>
        <Tooltip
          label={trade.game_listing?.data.game.name}
          placement="top"
          bg="gray.600"
          fontSize="0.8rem"
        >
          <Text
            fontSize="0.9rem"
            fontWeight="600"
            color="gray.800"
            textTransform="uppercase"
            noOfLines={1}
          >
            {trade.game_listing?.data.game.name}
          </Text>
        </Tooltip>
        <Text fontSize="0.8rem" color="gray.800" noOfLines={1}>
          {" "}
          {trade.game_listing?.data.platform.slug}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TradedListing;
