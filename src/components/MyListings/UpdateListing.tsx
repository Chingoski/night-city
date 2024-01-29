import { useState, useContext, useEffect } from "react";
import { listingType } from "../../types/listing-type";
import { navigationContext } from "../../context/NavigationContext";
import { fetchListing } from "../../util/create-trade";

import { useStyleConfig, Flex, Heading, Text, Image } from "@chakra-ui/react";

import controller from "../../assets/controller.png";

const UpdateListing: React.FC<{ listingID: string | undefined }> = ({
  listingID,
}) => {
  const styles = useStyleConfig("Home");
  const { isCollapsed } = useContext(navigationContext);

  const [listing, setListing] = useState<listingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  async function fetchCurrentListing() {
    await fetchListing(listingID as string, setIsLoading, setListing);
  }

  useEffect(() => {
    fetchCurrentListing();
  }, []);

  return (
    <Flex
      flexDir="column"
      marginBottom="15px"
      alignItems="center"
      justifyContent="center"
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
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        w="100%"
        maxW="700px"
      >
        <Heading as="h1">Update Listing</Heading>
        <Text fontSize="1.1rem">Edit your listing information</Text>
        <Image
          mt="20px"
          src={listing?.game.thumbnail}
          fallbackSrc={controller}
          w="100%"
        />
        <Text
          noOfLines={1}
          textAlign="center"
          fontWeight="600"
          w="100%"
          marginTop="5px"
          textTransform="uppercase"
        >
          {listing?.game.name} ({listing?.platform.slug})
        </Text>
      </Flex>
    </Flex>
  );
};
export default UpdateListing;
