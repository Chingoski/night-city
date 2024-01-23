import { useContext, useEffect } from "react";
import { navigationContext } from "../../context/NavigationContext";
import { createTradeContext } from "../../context/CreateListingContext";
import { fetchListing } from "../../util/create-trade";

import { Flex, useStyleConfig, Text } from "@chakra-ui/react";

import CreateTradeForm from "./CreateTradeForm";
import ListingInfo from "./ListingInfo";

const CreateTrade: React.FC<{ listingID: string }> = ({ listingID }) => {
  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

  const { listing, setListing, isLoading, setIsLoading } =
    useContext(createTradeContext);

  async function fetchCurrentListing() {
    await fetchListing(listingID, setIsLoading, setListing);
  }

  useEffect(() => {
    fetchCurrentListing();
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom="15px"
      overflow="none"
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
      {isLoading && (
        <Text margin="auto" w="100%" textAlign="center">
          Loading listing...
        </Text>
      )}
      {!isLoading && listing && (
        <Flex
          w="90%"
          flexDir="row"
          justifyContent="center"
          alignItems="flex-start"
          gap="25px"
        >
          <ListingInfo listing={listing} />
          <CreateTradeForm listing={listing} />
        </Flex>
      )}
    </Flex>
  );
};

export default CreateTrade;
