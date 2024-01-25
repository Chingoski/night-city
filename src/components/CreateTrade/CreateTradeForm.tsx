import { Flex, Heading, Text } from "@chakra-ui/react";

import { listingType } from "../../types/listing-type";
import GamesPicker from "./TradeInputs";

const CreateTradeForm: React.FC<{ listing: listingType }> = ({ listing }) => {
  return (
    <Flex flexDir="column" alignItems="flex-start" w="50%" maxW="600px">
      <Heading as="h1">Create Trade Offer</Heading>
      <Text fontSize="1.1rem">
        Review the listing and submit your trade offer
      </Text>
      <GamesPicker listing={listing} />
    </Flex>
  );
};

export default CreateTradeForm;
