import { Flex, SimpleGrid, useStyleConfig, Text } from "@chakra-ui/react";

import fetchListings, {
  constructUrl,
  fetchNextPage,
} from "../../util/listings";

import { navigationContext } from "../../context/NavigationContext";
import { filteringContext } from "../../context/FilterContext";
import { allListingsContext } from "../../context/AllListingsContext";
import { useContext, useEffect } from "react";

import TopMenu from "../TopMenu/TopMenu";
import ListingCard from "../ListingCard/ListingCard";
import LoadMoreButton from "../UI/LoadMoreButton";

function Home() {
  const {
    allListings,
    setAllListings,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
  } = useContext(allListingsContext);

  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

  const { inputCityId, searchInputValue } = useContext(filteringContext);

  function fetchAllListings() {
    const listingUrl = constructUrl(inputCityId, searchInputValue);
    fetchListings(listingUrl, setIsLoading, setNextPage, setAllListings);
  }

  useEffect(() => fetchAllListings(), []);

  function loadMoreHandler() {
    fetchNextPage(
      nextPage,
      setIsLoading,
      setNextPage,
      allListings,
      setAllListings
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
      <TopMenu />

      {!isLoading && allListings.length !== 0 && (
        <SimpleGrid minChildWidth="300px" spacing="15px" p="15px">
          {allListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </SimpleGrid>
      )}

      {isLoading && allListings.length !== 0 && (
        <>
          <SimpleGrid minChildWidth="300px" spacing="15px" p="15px">
            {allListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </SimpleGrid>
          <Text w="100%" margin="auto" paddingTop="25px" textAlign="center">
            Loading...
          </Text>
        </>
      )}

      {!isLoading && allListings.length === 0 && (
        <Text w="100%" margin="auto" textAlign="center">
          No listings found.
        </Text>
      )}

      {isLoading && allListings.length === 0 && (
        <Text w="100%" margin="auto" textAlign="center">
          Loading...
        </Text>
      )}

      {nextPage !== "" && !isLoading && allListings.length !== 0 && (
        <LoadMoreButton loadMoreHandler={loadMoreHandler} />
      )}
    </Flex>
  );
}

export default Home;
