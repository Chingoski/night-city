import { useContext } from "react";
import { navigationContext } from "../../context/NavigationContext";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import NavigationLink from "./NavLink";
import LogOutLink from "./LogOutLink";

function Navigation() {
  const { isCollapsed, setIsCollapsed } = useContext(navigationContext);

  function collapseHandler() {
    if (isCollapsed) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }

  return (
    <Flex
      w={isCollapsed ? "var(--collapsed-nav-width)" : "var(--open-nav-width)"}
      h="100dvh"
      flexDirection="column"
      bg="white"
      justifyContent="space-between"
      position="fixed"
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
          <Box marginLeft="10px" display={isCollapsed ? "none" : "block"}>
            Logo
          </Box>
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
        <LogOutLink title="log out" isCollapsed={isCollapsed} />
      </Box>
    </Flex>
  );
}

export default Navigation;
