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
import { useEffect, useState } from "react";
import { tradeType } from "../../types/trade-type";
import { getTrade } from "../../util/get-trades";
import { userType } from "../../types/user-types";
import { getUser } from "../../util/get-user";

const CompletedListingsCard: React.FC<{
  listing: listingType;
}> = ({ listing }) => {
  // const [completedTrade, setCompletedTrade] = useState<tradeType | null>(null);
  // const [traderUser, setTraderUser] = useState<userType | null>(null);

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
        {/* <Text>
          Traded with {traderUser?.first_name} {""} {traderUser?.last_name} for{" "}
        </Text> */}
      </CardFooter>
    </Card>
  );
};

export default CompletedListingsCard;
