import { Text } from "@chakra-ui/react";
import { logOut } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const LogOutLink: React.FC<{
  title: string;
  isCollapsed: boolean;
}> = ({ title, isCollapsed }) => {
  const navigate = useNavigate();
  async function clickHandler() {
    await logOut();
    navigate("/auth");
  }

  return (
    <Text
      onClick={clickHandler}
      w="100%"
      p="10px"
      marginLeft="10px"
      textTransform="capitalize"
      display={isCollapsed ? "none" : "block"}
      _hover={{ textDecoration: "none", color: "cyan.400" }}
    >
      {title}
    </Text>
  );
};

export default LogOutLink;
