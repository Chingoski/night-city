import { Flex, Button, SimpleGrid, useStyleConfig } from "@chakra-ui/react";

import { navigationContext } from "../../context/NavigationContext";
import { allListingsContext } from "../../context/AllListingsContext";
import { useContext, useEffect } from "react";

import axios from "axios";
import { getAuthToken } from "../../util/auth";
import updateURL from "../../util/request";

import TopMenu from "../TopMenu/TopMenu";
import ListingCard from "../ListingCard/ListingCard";

function Home() {
  const { allListings, setAllListings, isLoading, setIsLoading, url, setUrl } =
    useContext(allListingsContext);

  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

  const fetchListings = async () => {
    setIsLoading(true);
    const token = getAuthToken();

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      if (response.data.meta.pagination.links.next) {
        const nextPage = updateURL(response.data.meta.pagination.links.next);
        setUrl(nextPage);
      } else {
        setUrl("");
      }

      const fetchedListings = response.data.data;
      const displayedListings = allListings.concat(fetchedListings);
      setAllListings(displayedListings);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  //adjust width
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

      <SimpleGrid minChildWidth="300px" spacing="15px" p="15px">
        {allListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>

      {url !== "" && (
        <Button
          bg="gray.200"
          _hover={{ bg: "gray.300" }}
          w="200px"
          margin="auto"
          onClick={fetchListings}
        >
          Load More
        </Button>
      )}
    </Flex>
  );
}

export default Home;
