import { useStyleConfig, Flex } from "@chakra-ui/react";

import { navigationContext } from "../context/NavigationContext";
import { useContext } from "react";
import MyProfile from "../components/MyProfile/MyProfile";

import { getAuthToken } from "../util/auth";
import axios from "axios";
import host from "../host";
import { json } from "react-router-dom";

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

export async function loader() {
  const token = getAuthToken();
  const response = await axios.get(`${host}/api/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (response.status !== 200) {
    throw json({ message: response.statusText }, { status: response.status });
  }

  return response.data.data;
}
