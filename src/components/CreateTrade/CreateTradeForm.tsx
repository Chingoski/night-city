import { Flex, Heading, Text } from "@chakra-ui/react";

import { listingType } from "../../types/listing-type";

const CreateTradeForm: React.FC<{ listing: listingType }> = ({ listing }) => {
  return (
    <Flex flexDir="column" alignItems="flex-start" w="50%">
      <Heading as="h1">Create Trade Offer</Heading>
      <Text fontSize="1.1rem">
        Review the listing and submit your trade offer
      </Text>
    </Flex>
  );
};

export default CreateTradeForm;
