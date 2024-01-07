import { Link } from "@chakra-ui/react";

const NavigationLink: React.FC<{
  path: string;
  title: string;
  isCollapsed: boolean;
}> = ({ path, title, isCollapsed }) => {
  return (
    <Link
      href={path}
      w="100%"
      p="10px"
      marginLeft="10px"
      textTransform="capitalize"
      display={isCollapsed ? "none" : "block"}
      _hover={{ textDecoration: "none", color: "cyan.400" }}
    >
      {title}
    </Link>
  );
};

export default NavigationLink;
