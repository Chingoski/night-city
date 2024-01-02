import { useAppDispatch, useAppSelector } from "../../store/store";
import { toggleNavigation } from "../../store/navigation-slice";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import NavigationLink from "./NavLink";

function Navigation() {
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state) => state.navigation.isCollapsed);
  function collapseHandler() {
    dispatch(toggleNavigation());
  }

  return (
    <Flex
      maxW="250px"
      w={isCollapsed ? "auto" : "200px"}
      h="100dvh"
      flexDirection="column"
      bg="white"
      justifyContent="space-between"
    >
      <Flex flexDirection="column">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          p="10px"
          marginBottom="25px"
        >
          <Box display={isCollapsed ? "none" : "block"}>Logo</Box>
          <IconButton
            aria-label="Manipulate navigation menu"
            color="cyan.900"
            bg="none"
            w="auto"
            onClick={collapseHandler}
            icon={
              isCollapsed ? (
                <ArrowRightIcon w="10px" />
              ) : (
                <ArrowLeftIcon w="10px" />
              )
            }
            _hover={{ bg: "none", color: "cyan.400" }}
          />
        </Flex>

        <NavigationLink
          path="/"
          title="all listings"
          isCollapsed={isCollapsed}
        />
        <NavigationLink
          path="/trade-offers"
          title="trade offers"
          isCollapsed={isCollapsed}
        />
        <NavigationLink
          path="/my-listings"
          title="my listings"
          isCollapsed={isCollapsed}
        />
        <NavigationLink
          path="/my-profile"
          title="my profile"
          isCollapsed={isCollapsed}
        />
        <NavigationLink path="/help" title="help" isCollapsed={isCollapsed} />
        <NavigationLink
          path="/contact-us"
          title="contact us"
          isCollapsed={isCollapsed}
        />
      </Flex>
      <Box>
        <NavigationLink
          path="log-out"
          title="log out"
          isCollapsed={isCollapsed}
        />
      </Box>
    </Flex>
  );
}

export default Navigation;
