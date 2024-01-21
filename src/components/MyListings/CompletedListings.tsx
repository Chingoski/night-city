import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { completedListingsContext } from "../../context/CompletedListingsContext";
import { fetchNextPage } from "../../util/listings";
import fetchListings from "../../util/listings";
import host from "../../host";
import { useLoaderData } from "react-router-dom";
import { userType } from "../../types/user-types";
import LoadMoreButton from "../UI/LoadMoreButton";
import ListingCard from "../ListingCard/ListingCard";

const CompletedListings = () => {
  const {
    completedListings,
    setCompletedListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  } = useContext(completedListingsContext);

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
            <ListingCard
              key={listing.id}
              listing={listing}
              page="my-listings"
            />
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
