import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { fetchNextPage } from "../../util/listings";
import fetchListings from "../../util/listings";
import host from "../../host";

import { listingType } from "../../types/listing-type";
import { userType } from "../../types/user-types";

import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import LoadMoreButton from "../UI/LoadMoreButton";
import CompletedListingsCard from "./CompletedListingsCard";

const CompletedListings = () => {
  const [completedListings, setCompletedListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);

  function loadMoreHandler() {
    fetchNextPage(
      nextPage,
      setIsLoading,
      setNextPage,
      completedListings,
      setCompletedListings
    );
  }

  const user = useLoaderData() as userType;
  const url = new URL(
    `${host}/api/game_listings?owner_id=${user.id}&finished=1`
  );

  function fetchMyListings() {
    fetchListings(url, setIsLoading, setNextPage, setCompletedListings);
  }

  useEffect(() => fetchMyListings(), []);

  return (
    <Flex flexDirection="column" w="100%">
      {!isLoading && completedListings.length !== 0 && (
        <SimpleGrid
          minChildWidth="300px"
          spacing="15px"
          p="15px"
          sx={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
        >
          {completedListings.map((listing) => (
            <CompletedListingsCard key={listing.id} listing={listing} />
          ))}
        </SimpleGrid>
      )}
      {!isLoading && completedListings.length === 0 && (
        <Text w="100%" margin="auto" textAlign="center">
          No listings found.
        </Text>
      )}

      {isLoading && (
        <Text w="100%" margin="auto" textAlign="center">
          Loading listings...
        </Text>
      )}

      {nextPage && !isLoading && completedListings.length !== 0 && (
        <LoadMoreButton loadMoreHandler={loadMoreHandler} />
      )}
    </Flex>
  );
};
export default CompletedListings;
