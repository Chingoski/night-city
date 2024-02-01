import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { fetchNextPage } from "../../util/listings";
import fetchListings from "../../util/listings";
import host from "../../host";

import { userType } from "../../types/user-types";
import { listingType } from "../../types/listing-type";

import { Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import LoadMoreButton from "../UI/LoadMoreButton";
import OngoingListingsCard from "./OngoingListingsCard";
import DeleteListingModal from "./DeleteListingModal";
import UpdateListingModal from "./UpdateListingModal";

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
  }

  function removeListing(deletedListing: listingType | null) {
    setOngoingListings(
      ongoingListings.filter(
        (ongoingListing) => ongoingListing.id !== deletedListing?.id
      )
    );
  }

  function updateListingsHandler(updatedListing: listingType) {
    const updatedOngoingListings = ongoingListings.map((listing) =>
      listing.id === updatedListing.id ? updatedListing : listing
    );
    setOngoingListings(updatedOngoingListings);
  }

  useEffect(() => fetchMyListings(), []);

  const {
    isOpen: deleteListingIsOpen,
    onOpen: deleteListingOnOpen,
    onClose: deleteListingOnClose,
  } = useDisclosure();

  const {
    isOpen: updateListingIsOpen,
    onOpen: updateListingOnOpen,
    onClose: updateListingOnClose,
  } = useDisclosure();

  return (
    <>
      <DeleteListingModal
        isOpen={deleteListingIsOpen}
        onClose={deleteListingOnClose}
        removeListing={removeListing}
      />
      <UpdateListingModal
        isOpen={updateListingIsOpen}
        onClose={updateListingOnClose}
        updateListingsHandler={updateListingsHandler}
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
                deleteHandler={deleteListingOnOpen}
                updateHandler={updateListingOnOpen}
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
