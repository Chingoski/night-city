import { Text, Flex } from "@chakra-ui/react";
import { logOut } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

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
    <Flex
      onClick={clickHandler}
      w="100%"
      p="10px"
      marginLeft="10px"
      textTransform="capitalize"
      _hover={{ textDecoration: "none", color: "teal.300", cursor: "pointer" }}
      alignItems="center"
      flexDirection="row"
      display="flex"
      gap="5px"
    >
      <FaArrowRightFromBracket />
      <Text display={isCollapsed ? "none" : "block"}>{title}</Text>
    </Flex>
  );
};

export default LogOutLink;
