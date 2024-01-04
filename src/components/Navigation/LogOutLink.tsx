import { Link } from "@chakra-ui/react";
import { logOut } from "../../util/auth";

const LogOutLink: React.FC<{
  title: string;
  isCollapsed: boolean;
}> = ({ title, isCollapsed }) => {
  function clickHandler() {
    logOut();
  }

  return (
    <Link
      href="/auth"
      onClick={clickHandler}
      w="100%"
      p="10px"
      textTransform="capitalize"
      display={isCollapsed ? "none" : "block"}
      _hover={{ textDecoration: "none", color: "cyan.400" }}
    >
      {title}
    </Link>
  );
};

export default LogOutLink;
