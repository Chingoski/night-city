import { Flex } from "@chakra-ui/react";
import TopMenu from "../TopMenu/TopMenu";
import ListingCard from "../ListingCard/ListingCard";

function Home() {
  return (
    <Flex flexDirection="column" w="100%">
      <TopMenu />
      <Flex>
        <ListingCard />
      </Flex>
    </Flex>
  );
}

export default Home;
