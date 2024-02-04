import { useContext } from "react";
import { navigationContext } from "../../context/NavigationContext";

import { Image, Box, Flex, IconButton } from "@chakra-ui/react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import logo from "../../assets/Logo.svg";

import NavigationLink from "./NavLink";
import LogOutLink from "./LogOutLink";

import { FaHome, FaUser, FaEnvelope, FaListAlt } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";

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
          h="100px"
          p="10px"
          marginBottom="25px"
        >
          {/* <Box marginLeft="10px" flexDirection="row"  maxWidth="80%"> */}
          <Image
            src={logo}
            alt="GameSwapHub"
            width="85%"
            display={isCollapsed ? "none" : "block"}
          />
          {/* </Box> */}
          <IconButton
            aria-label="Manipulate navigation menu"
            color="gray.700"
            bg="none"
            w="auto"
            onClick={collapseHandler}
            icon={
              isCollapsed ? <FaArrowAltCircleRight /> : <FaArrowAltCircleLeft />
            }
            _hover={{ bg: "none", color: "teal.300" }}
          />
        </Flex>

        <NavigationLink
          path="/"
          title="all listings"
          isCollapsed={isCollapsed}
          icon={<FaHome />}
        />
        <NavigationLink
          path="/my-listings"
          title="my listings"
          isCollapsed={isCollapsed}
          icon={<FaListAlt />}
        />
        <NavigationLink
          path="/trade-offers"
          title="trade offers"
          isCollapsed={isCollapsed}
          icon={<FaHandshakeSimple />}
        />
        <NavigationLink
          path="/my-profile"
          title="my profile"
          isCollapsed={isCollapsed}
          icon={<FaUser />}
        />
        <NavigationLink
          path="/contact-us"
          title="contact us"
          isCollapsed={isCollapsed}
          icon={<FaEnvelope />}
        />
      </Flex>
      <Box>
        <LogOutLink title="log out" isCollapsed={isCollapsed} />
      </Box>
    </Flex>
  );
}

export default Navigation;
