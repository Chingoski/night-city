import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navigation from "../../components/Navigation/Navigation";

function RootLayoutPage() {
  return (
    <Flex
      flexDirection="row"
      w="100%"
      h="100dvh"
      bg="gray.100"
      fontFamily="var(--primary-font)"
      fontSize="1.2rem"
      color="gray.700"
    >
      <Navigation />
      <Outlet />
    </Flex>
  );
}

export default RootLayoutPage;
