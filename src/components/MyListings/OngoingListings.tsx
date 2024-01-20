import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ongoingListingsContext } from "../../context/OngoingListingsContext";
import { fetchNextPage } from "../../util/listings";
import fetchListings from "../../util/listings";
import host from "../../host";
import { useLoaderData } from "react-router-dom";
import { userType } from "../../types/user-types";
import LoadMoreButton from "../UI/LoadMoreButton";
import ListingCard from "../ListingCard/ListingCard";

const OngoingListings = () => {
  const {
    ongoingListings,
    setOngoingListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  } = useContext(ongoingListingsContext);

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
  return (
    <Flex flexDirection="column" w="100%" h="100%">
      {!isLoading && ongoingListings.length !== 0 && (
        <SimpleGrid
          minChildWidth="300px"
          spacing="15px"
          p="15px"
          sx={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
        >
          {ongoingListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              page="my-listings"
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
  );
};
export default OngoingListings;
