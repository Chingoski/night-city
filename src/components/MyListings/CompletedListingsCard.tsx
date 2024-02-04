import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
  Text,
  Wrap,
  WrapItem,
  Badge,
  CardHeader,
} from "@chakra-ui/react";

import { listingType } from "../../types/listing-type";
import controller from "../../assets/controller.png";
import { userType } from "../../types/user-types";
import { tradeType } from "../../types/trade-type";
import { gameType } from "../../types/game-types";

const CompletedListingsCard: React.FC<{
  listing: listingType;
}> = ({ listing }) => {
  function generateTradeText() {
    const finsihedTrade = listing.finished_trade?.data as tradeType;
    const traderUser = finsihedTrade.trader?.data as userType;
    const offeredGames: gameType[] | [] = finsihedTrade.offered_games ?? [];

    const amount = parseFloat(finsihedTrade.offered_amount);
    let gamesText = "";
    let amountText = "";
    let finalText = "";

    offeredGames.forEach((game) => {
      gamesText += `${game.name} (${game.platform.slug}), `;
    });

    if (amount > 0) {
      amountText = `$${amount}`;
    }
    if (gamesText.length != 0) {
      gamesText = gamesText.substring(0, gamesText.length - 2);
    }

    if (gamesText.length != 0 && amountText.length != 0) {
      finalText = `${gamesText} and ${amountText}`;
    }
    if (gamesText.length != 0 && amountText.length == 0) {
      finalText = gamesText;
    }
    if (gamesText.length == 0 && amountText.length != 0) {
      finalText = amountText;
    }

    return `Traded with ${traderUser.full_name} for ${finalText}.`;
  }

  return (
    <Card maxW="md" justify="center">
      <CardHeader m="0">
        <Tooltip label={listing.game.name} placement="top" bg="gray.600">
          <Text
            p="0 5px"
            noOfLines={1}
            textAlign="center"
            fontWeight="600"
            w="100%"
            marginTop="5px"
            textTransform="uppercase"
          >
            {listing.game.name}
          </Text>
        </Tooltip>
        <Wrap spacing="10px" justify="center" marginTop="10px" padding="0 5px">
          <WrapItem>
            <Badge bg="teal.300">{listing.trade_preference}</Badge>
          </WrapItem>
          <WrapItem>
            <Badge bg="purple.400">{listing.platform.slug}</Badge>
          </WrapItem>
        </Wrap>
      </CardHeader>
      <CardBody p="0" w="100%">
        <Image
          src={listing.game.thumbnail}
          fallbackSrc={controller}
          alt={listing.game.name}
          width="100%"
          height="300px"
          objectFit="cover"
        />

        <Tooltip label={listing.description}>
          <Text
            noOfLines={2}
            textAlign="center"
            fontSize="1rem"
            p="10px 5px 0 5px"
          >
            {listing.description}
          </Text>
        </Tooltip>
      </CardBody>
      <CardFooter>
        <Text textAlign="center" fontSize="1rem" color="gray.700">
          {generateTradeText()}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default CompletedListingsCard;
