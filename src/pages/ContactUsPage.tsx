import { Flex, useStyleConfig, Text } from "@chakra-ui/react";

import { navigationContext } from "../context/NavigationContext";
import { useContext } from "react";

function ContactUsPage() {

  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

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
      <Text> Test</Text>
    </Flex>
  );
}

export default ContactUsPage;
