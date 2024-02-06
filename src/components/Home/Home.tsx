import { useContext, useState, useEffect } from "react";

import { fetchNextPage, constructUrl } from "../../util/listings";
import fetchListings from "../../util/listings";

import { navigationContext } from "../../context/NavigationContext";
import { filteringContext } from "../../context/FilterContext";
import { listingType } from "../../types/listing-type";

import { Flex, SimpleGrid, useStyleConfig, Text } from "@chakra-ui/react";
import TopMenu from "../TopMenu/TopMenu";
import ListingCard from "../ListingCard/ListingCard";
import LoadMoreButton from "../UI/LoadMoreButton";

function Home() {
  const [allListings, setAllListings] = useState<listingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<URL | null>(null);
  const { isCollapsed } = useContext(navigationContext);
  const { cityId, searchInputValue, platformId, tradePreference, order } =
    useContext(filteringContext);
  const styles = useStyleConfig("Home");

  useEffect(() => {
    const listingUrl = constructUrl(
      cityId,
      searchInputValue,
      platformId,
      tradePreference,
      order
    );

    fetchListings(listingUrl, setIsLoading, setNextPage, setAllListings);
  }, [cityId, searchInputValue, platformId, tradePreference, order]);

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
        <>
          {searchInputValue !== "" && (
            <Text p="10px 15px 0 15px" fontSize="0.9rem" color="gray.500" m="0">
              Showing results for: "{searchInputValue}"
            </Text>
          )}
          <SimpleGrid
            mt="10px"
            minChildWidth="300px"
            spacing="15px"
            p="15px 0 15px 15px"
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {allListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </SimpleGrid>
        </>
      )}

      {isLoading && allListings.length !== 0 && (
        <>
          {searchInputValue !== "" && (
            <Text p="10px 15px 0 15px" fontSize="0.9rem" color="gray.500" m="0">
              Showing results for: "{searchInputValue}"
            </Text>
          )}
          <SimpleGrid
            mt="10px"
            minChildWidth="300px"
            spacing="15px"
            p="15px"
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
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

      {nextPage !== null && !isLoading && allListings.length !== 0 && (
        <LoadMoreButton loadMoreHandler={loadMoreHandler} />
      )}
    </Flex>
  );
}

export default Home;
