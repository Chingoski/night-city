import { useStyleConfig, Flex } from "@chakra-ui/react";

import { navigationContext } from "../context/NavigationContext";
import { useContext } from "react";
import MyProfile from "../components/MyProfile/MyProfile";

function MyProfilePage() {
  const { isCollapsed } = useContext(navigationContext);
  const styles = useStyleConfig("Home");

  return (
    <Flex
      flexDirection="column"
      marginBottom="15px"
      justifyContent="center"
      alignItems="center"
      width="100%"
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
      <MyProfile />
    </Flex>
  );
}

export default MyProfilePage;
