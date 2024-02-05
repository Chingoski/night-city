import { Flex, Text, Tooltip, Icon } from "@chakra-ui/react";

import { tradeType } from "../../types/trade-type";

import { FaCoins } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";

const TradeOfferItems: React.FC<{ trade: tradeType; type: string }> = ({
  trade,
  type,
}) => {
  return (
    <Flex
      flexDir="column"
      w="100%"
      justifyContent="flex-start"
      backgroundColor="gray.100"
      p="5px"
    >
      <Text
        fontSize="0.8rem"
        textTransform="uppercase"
        fontWeight="500"
        color="gray.600"
        borderBottom="1px"
        borderColor="gray.300"
      >
        {type === "received"
          ? `${trade.trader?.data.first_name}'s offer:`
          : "Your offer:"}
      </Text>
      {trade.offered_games.length > 0 &&
        trade.offered_games.map((game) => (
          <Flex
            key={`${game.id} ${game.platform.id}`}
            w="100%"
            justifyContent="flex-start"
            alignItems="center"
            gap="10px"
            borderRadius="5px"
          >
            <Icon
              as={FaGamepad}
              color="gray.500"
              boxSize="40px"
              p="10px 0 10px 0"
            />
            <Flex flexDir="column">
              <Tooltip
                label={game.name}
                placement="top"
                bg="gray.600"
                fontSize="0.8rem"
              >
                <Text
                  fontSize="0.8rem"
                  fontWeight="500"
                  color="gray.800"
                  noOfLines={1}
                >
                  {game.name}
                </Text>
              </Tooltip>
              <Text fontSize="0.6rem" color="gray.800">
                {game.platform.slug}
              </Text>
            </Flex>
          </Flex>
        ))}
      {trade.offered_amount !== "0.00" && (
        <Flex
          w="100%"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          borderRadius="5px"
        >
          <Icon
            as={FaCoins}
            color="gray.500"
            boxSize="40px"
            p="10px 0 10px 0"
          />
          <Text fontSize="0.8rem" fontWeight="500" color="gray.800">
            ${trade.offered_amount}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default TradeOfferItems;
