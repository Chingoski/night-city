import { listingType } from "../../types/listing-type";

import controller from "../../assets/game-controller-outline.svg";

import { Flex, Image, Text, Box } from "@chakra-ui/react";
import TradeTip from "../UI/TradeTip";

const Listing: React.FC<{ listing: listingType }> = ({ listing }) => {
  return (
    <Flex flexDir="column" alignItems="center" w="50%" p="0">
      <Flex flexDir="column" gap="10px">
        <Image
          src={listing.game.thumbnail}
          fallbackSrc={controller}
          maxW="600px"
        />
        <Text
          noOfLines={1}
          textAlign="center"
          fontWeight="600"
          w="100%"
          marginTop="5px"
          textTransform="uppercase"
        >
          {listing.game.name}
        </Text>

        <Box
          fontSize="1rem"
          backgroundColor="gray.200"
          p="10px"
          borderRadius="5px"
        >
          <TradeTip
            title="description"
            tip={listing.description}
            align="left"
          />

          <Box color="gray.500" fontSize="0.8rem">
            Listed by
            <Text display="inline">
              {" "}
              {listing.owner.first_name + " " + listing.owner.last_name}
            </Text>{" "}
            from <Text display="inline">{listing.owner.city.name}</Text>
          </Box>
        </Box>
        <Flex p="10px" justifyContent="space-between">
          <TradeTip title="platform" tip={listing.platform.slug} />
          <TradeTip title="rating" tip={listing.game.rating} />
          <TradeTip title="release date" tip={listing.game.release_date} />
          <TradeTip
            title="genre"
            tip={listing.game.genres[0].name}
            align="left"
          />
          <TradeTip title="trade preference" tip={listing.trade_preference} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Listing;
