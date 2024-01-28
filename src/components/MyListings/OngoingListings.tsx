import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { fetchNextPage } from "../../util/listings";
import fetchListings from "../../util/listings";
import host from "../../host";

import { userType } from "../../types/user-types";
<<<<<<< Updated upstream
=======
import { listingType } from "../../types/listing-type";

import { Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
>>>>>>> Stashed changes
import { listingType } from "../../types/listing-type";

import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import LoadMoreButton from "../UI/LoadMoreButton";
import OngoingListingsCard from "./OngoingListingsCard";
import DeleteListingModal from "./DeleteListingModal";

const OngoingListings = () => {
  const [ongoingListings, setOngoingListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  function loadMoreHandler() {
    fetchNextPage(
      nextPage,
      setIsLoading,
      setNextPage,
      ongoingListings,
      setOngoingListings
    );
  }

  const user = useLoaderData() as userType;
  const url = new URL(
    `${host}/api/game_listings?owner_id=${user.id}&ongoing=1`
  );

  function fetchMyListings() {
    fetchListings(url, setIsLoading, setNextPage, setOngoingListings);
    console.log(ongoingListings);
  }

  useEffect(() => fetchMyListings(), []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DeleteListingModal
        isOpen={isOpen}
        onClose={onClose}
        removeListing={removeListing}
      />
      <Flex flexDirection="column" w="100%" h="100%">
        {!isLoading && ongoingListings.length !== 0 && (
          <SimpleGrid
            minChildWidth="300px"
            spacing="15px"
            p="15px"
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {ongoingListings.map((listing) => (
              <OngoingListingsCard
                key={listing.id}
                listing={listing}
                deleteHandler={onOpen}
              />
            ))}
          </SimpleGrid>
        )}
        {!isLoading && ongoingListings.length === 0 && (
          <Text w="100%" margin="auto" textAlign="center">
            No listings found.
          </Text>
        )}

        {isLoading && (
          <Text w="100%" margin="auto" textAlign="center">
            Loading listings...
          </Text>
        )}

        {nextPage && !isLoading && ongoingListings.length !== 0 && (
          <LoadMoreButton loadMoreHandler={loadMoreHandler} />
        )}
      </Flex>
    </>
  );
};
export default OngoingListings;
