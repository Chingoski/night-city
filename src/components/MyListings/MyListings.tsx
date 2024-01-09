import { Flex, SimpleGrid, useStyleConfig, Text } from "@chakra-ui/react";

import { useContext, useEffect } from "react";
import { navigationContext } from "../../context/NavigationContext";
import { myListingsContext } from "../../context/MyListingsContext";

import { useLoaderData } from "react-router-dom";
import { userType } from "../../types/user-types";

import host from "../../host";
import fetchListings, { fetchNextPage } from "../../util/listings";

import ListingCard from "../ListingCard/ListingCard";
import LoadMoreButton from "../UI/LoadMoreButton";

function MyListings() {
  const styles = useStyleConfig("Home");
  const { isCollapsed } = useContext(navigationContext);

  const {
    myListings,
    setMyListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  } = useContext(myListingsContext);

  const user = useLoaderData() as userType;
  const url = `${host}/api/game_listings?owner_id=${user.id}`;

  function fetchMyListings() {
    fetchListings(url, setIsLoading, setNextPage, setMyListings);
  }

  useEffect(() => fetchMyListings(), []);

  function loadMoreHandler() {
    fetchNextPage(
      nextPage,
      setIsLoading,
      setNextPage,
      myListings,
      setMyListings
    );
  }

  return (
    <Flex
      flexDirection="column"
      marginBottom="15px"
      sx={{
        ...styles,
        width: isCollapsed
          ? "var(--collapsed-outlet-width)"
          : "var(--open-outlet-width)",
        marginLeft: isCollapsed
          ? "var(--collapsed-nav-width)"
          : "var(--open-nav-width)",
      }}
    >
      {!isLoading && myListings.length !== 0 && (
        <SimpleGrid minChildWidth="300px" spacing="15px" p="15px">
          {myListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </SimpleGrid>
      )}
      {!isLoading && myListings.length === 0 && (
        <Text w="100%" margin="auto" textAlign="center">
          No listings found.
        </Text>
      )}

      {isLoading && (
        <Text w="100%" margin="auto" textAlign="center">
          Loading listings...
        </Text>
      )}

      {nextPage !== "" && !isLoading && myListings.length !== 0 && (
        <LoadMoreButton loadMoreHandler={loadMoreHandler} />
      )}
    </Flex>
  );
}

export default MyListings;
