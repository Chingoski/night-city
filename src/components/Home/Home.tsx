import { Flex } from "@chakra-ui/react";
import TopMenu from "../TopMenu/TopMenu";

function Home() {
  return (
    <Flex flexDirection="column" w="100%">
      <TopMenu />
      <Flex>list of all listings</Flex>
    </Flex>
  );
}

export default Home;
